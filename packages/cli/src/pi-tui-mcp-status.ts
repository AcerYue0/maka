/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
  Key,
  matchesKey,
  truncateToWidth,
  visibleWidth,
  type Component,
} from '@earendil-works/pi-tui';
import type { UiLocale } from '@maka/core/ui-locale';
import { generalizedErrorMessageForLocale } from '@maka/core/redaction';
import type { TuiMcpServerSnapshot, TuiMcpSurface } from './tui-mcp-control.js';
import { ansi } from './tui-ansi.js';

const CHROME_ROWS = 2;

export class McpStatusOverlay implements Component {
  private top = 0;
  private documentRows = 0;
  private bodyRows = 0;
  private readonly dispose: () => void;

  constructor(
    private readonly input: {
      readonly locale: UiLocale;
      readonly surface?: TuiMcpSurface;
      viewportRows(): number;
      onClose(): void;
      onChange(): void;
    },
  ) {
    this.dispose = input.surface?.subscribe(input.onChange) ?? (() => undefined);
  }

  invalidate(): void {}

  handleInput(data: string): void {
    if (matchesKey(data, Key.escape) || matchesKey(data, 'q')) {
      this.dispose();
      this.input.onClose();
      return;
    }
    if (matchesKey(data, Key.up)) this.scrollBy(-1);
    else if (matchesKey(data, Key.down)) this.scrollBy(1);
    else if (matchesKey(data, Key.pageUp)) this.scrollBy(-Math.max(1, this.bodyRows));
    else if (matchesKey(data, Key.pageDown)) this.scrollBy(Math.max(1, this.bodyRows));
    else if (matchesKey(data, Key.home)) this.scrollTo(0);
    else if (matchesKey(data, Key.end)) this.scrollTo(this.maxTop());
  }

  render(width: number): string[] {
    const safeWidth = Math.max(1, width);
    const viewportRows = Math.max(1, Math.floor(this.input.viewportRows()));
    const showFooter = viewportRows > 2;
    this.bodyRows = Math.max(0, viewportRows - (showFooter ? CHROME_ROWS : 1));
    const document = this.document();
    this.documentRows = document.length;
    this.top = clamp(this.top, 0, this.maxTop());
    const visible = document.slice(this.top, this.top + this.bodyRows);
    const start = visible.length === 0 ? 0 : this.top + 1;
    const end = visible.length === 0 ? 0 : this.top + visible.length;
    const title = localized(this.input.locale, 'MCP 服务器', 'MCP 伺服器', 'MCP SERVERS');
    const header = padLine(
      `${ansi.bold(title)} ${ansi.dim(`${start}-${end} / ${document.length}`)}`,
      safeWidth,
    );
    const body = [
      ...visible.map((line) => padLine(line, safeWidth)),
      ...Array.from({ length: Math.max(0, this.bodyRows - visible.length) }, () =>
        ' '.repeat(safeWidth),
      ),
    ];
    if (!showFooter) return [header, ...body];
    const footer = localized(
      this.input.locale,
      '↑/↓ 滚动 · PgUp/PgDn 翻页 · Home/End 跳转 · q/Esc 关闭',
      '↑/↓ 捲動 · PgUp/PgDn 翻頁 · Home/End 跳至 · q/Esc 關閉',
      '↑/↓ scroll · PgUp/PgDn page · Home/End jump · q/Esc close',
    );
    return [header, ...body, padLine(ansi.dim(footer), safeWidth)];
  }

  private document(): string[] {
    const snapshot = this.input.surface?.snapshot();
    if (!snapshot) {
      return [
        ansi.yellow(
          localized(
            this.input.locale,
            '当前 TUI 未连接本地 MCP 控制面。',
            '目前 TUI 未連線至本機 MCP 控制介面。',
            'This TUI is not connected to a local MCP control plane.',
          ),
        ),
        localized(
          this.input.locale,
          '远程 Runtime Host 的客户端 MCP 工具关联将在后续版本提供。',
          '遠端 Runtime Host 的用戶端 MCP 工具關聯將於後續版本提供。',
          'Client MCP tool association for remote Runtime Hosts is planned for a later release.',
        ),
      ];
    }
    const lines = [publicationLine(snapshot, this.input.locale)];
    if (snapshot.initialization === 'loading') {
      lines.push(
        localized(
          this.input.locale,
          '正在读取 mcp.json 并发现工具…',
          '正在讀取 mcp.json 並探索工具…',
          'Loading mcp.json and discovering tools…',
        ),
      );
      return lines;
    }
    if (snapshot.initialization === 'error') {
      lines.push(
        ansi.red(
          localized(
            this.input.locale,
            '无法读取或应用 MCP 配置；没有向 Runtime Host 发布工具。',
            '無法讀取或套用 MCP 設定；未向 Runtime Host 發佈任何工具。',
            'MCP configuration could not be loaded; no tools were published to the Runtime Host.',
          ),
        ),
      );
      return lines;
    }
    if (snapshot.servers.length === 0) {
      lines.push(
        localized(
          this.input.locale,
          '尚未配置 MCP 服务器。',
          '尚未設定 MCP 伺服器。',
          'No MCP servers are configured.',
        ),
      );
      return lines;
    }
    lines.push('');
    for (const server of snapshot.servers) lines.push(...serverLines(server, this.input.locale));
    return lines;
  }

  private scrollBy(delta: number): void {
    this.scrollTo(this.top + delta);
  }

  private scrollTo(next: number): void {
    this.top = clamp(next, 0, this.maxTop());
    this.input.onChange();
  }

  private maxTop(): number {
    return Math.max(0, this.documentRows - this.bodyRows);
  }
}

function publicationLine(
  snapshot: ReturnType<TuiMcpSurface['snapshot']>,
  locale: UiLocale,
): string {
  const publication = {
    waiting: localized(locale, '等待发布', '等待發佈', 'waiting to publish'),
    host_unavailable: localized(
      locale,
      'Runtime Host 重连中',
      'Runtime Host 重新連線中',
      'Runtime Host reconnecting',
    ),
    publishing: localized(locale, '正在发布', '正在發佈', 'publishing'),
    published: localized(locale, '已发布', '已發佈', 'published'),
    not_published: localized(locale, '未发布', '未發佈', 'not published'),
    error: localized(locale, '发布失败', '發佈失敗', 'publication failed'),
  }[snapshot.publication];
  const tools = locale === 'en' ? `${snapshot.toolCount} tools` : `${snapshot.toolCount} 個工具`;
  return `${ansi.bold(publication)} · ${tools}`;
}

function serverLines(server: TuiMcpServerSnapshot, locale: UiLocale): string[] {
  const protocol = server.negotiatedProtocol
    ? `${server.negotiatedProtocol.era} ${server.negotiatedProtocol.revision}`
    : undefined;
  const tools = locale === 'en' ? `${server.toolCount} tools` : `${server.toolCount} 個工具`;
  const details = [stateLabel(server.state, locale), server.transport, protocol, tools]
    .filter(Boolean)
    .join(' · ');
  return [
    `${statusMarker(server.state)} ${ansi.bold(server.serverId)}  ${details}`,
    ...(server.error
      ? [
          `  ${ansi.red(
            generalizedErrorMessageForLocale(
              new Error(server.error),
              localized(locale, 'MCP 服务器连接失败', 'MCP 伺服器連線失敗', server.error),
              locale,
            ),
          )}`,
        ]
      : []),
  ];
}

function statusMarker(state: TuiMcpServerSnapshot['state']): string {
  if (state === 'connected') return ansi.green('●');
  if (state === 'connecting') return ansi.yellow('●');
  if (state === 'error' || state === 'needs-auth') return ansi.red('●');
  return ansi.dim('○');
}

function stateLabel(state: TuiMcpServerSnapshot['state'], locale: UiLocale): string {
  if (locale === 'en') return state;
  const simplified = {
    disabled: '已停用',
    disconnected: '未连接',
    connecting: '连接中',
    connected: '已连接',
    'needs-auth': '需要登录',
    error: '错误',
  }[state];
  if (locale === 'zh-CN') return simplified;
  return {
    disabled: '已停用',
    disconnected: '未連線',
    connecting: '連線中',
    connected: '已連線',
    'needs-auth': '需要登入',
    error: '錯誤',
  }[state];
}

function localized(
  locale: UiLocale,
  simplified: string,
  traditional: string,
  english: string,
): string {
  if (locale === 'zh-CN') return simplified;
  return locale === 'zh-TW' ? traditional : english;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function padLine(text: string, width: number): string {
  const safeWidth = Math.max(1, width);
  const trimmed = visibleWidth(text) > safeWidth ? truncateToWidth(text, safeWidth, '') : text;
  return `${trimmed}${' '.repeat(Math.max(0, safeWidth - visibleWidth(trimmed)))}`;
}
