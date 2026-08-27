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

import type { UiCatalog, UiLocale } from '@maka/core/ui-locale';

type BackgroundTerminalStatus = 'running' | 'completed' | 'failed' | 'timed_out' | 'cancelled' | 'orphaned';
type WebCredentialCopyKey = 'env' | 'settings' | 'missing' | 'unknown';
type WebGuidanceKey = 'env' | 'settings' | 'rate_limited' | 'not_configured' | 'timed_out' | 'privacy_mode' | 'unknown';

export interface ToolActivityCopy {
  errorLabel: string;
  /** The two outcomes a tool row spells out next to its name. */
  status: {
    sandboxBlocked: string;
    interrupted: string;
  };
  output: {
    redacted: string;
    truncated: string;
  };
  copy: {
    idle: string;
    pending: string;
    copied: string;
    failed: string;
    actionAriaLabel: (action: string, identity: string) => string;
  };
  sandboxBlocked: {
    title: string;
    description: string;
    copyAriaLabel: (label: string) => string;
  };
  requiresBypass: {
    title: string;
    description: string;
    action: string;
    pending: string;
  };
  /**
   * Row labels for one Computer Use call, derived from its arguments (see
   * `computer-action-label.ts`). The tool's display name is a noun, so every
   * call rendered the same row; these are verb phrases that say what the call
   * did.
   *
   * Each entry uses exactly what the persisted projection carries — the action,
   * the app, the window id, the element id — and nothing more. There is no
   * entry that spells out a typed value, a key name or a coordinate, because
   * the privacy boundary keeps those out of anything a renderer can read, so
   * such an entry could only ever be exercised by a fixture.
   */
  computer: {
    fallback: string;
    listApps: string;
    launchApp: (app: string) => string;
    launchAppUnknown: string;
    observe: string;
    observeApp: (app: string) => string;
    observeWindow: (windowId: number) => string;
    observeMenu: (menu: string) => string;
    screenshot: string;
    screenshotApp: (app: string) => string;
    screenshotWindow: (windowId: number) => string;
    element: (elementId: string) => string;
    elementUnknown: string;
    clickElement: (element: string) => string;
    setValue: (element: string) => string;
    selectText: (element: string) => string;
    secondaryAction: (element: string) => string;
    scrollElement: (element: string) => string;
    elementSequence: (count: number) => string;
    elementSequenceUnknown: string;
    windowAction: string;
    windowMove: string;
    windowResize: string;
    windowMinimize: string;
    targetApp: (app: string) => string;
    targetWindow: (windowId: number) => string;
    runningAction: (action: string, target?: string) => string;
    runningSequence: (current: number, total: number, target?: string) => string;
    scroll: string;
    pressKey: string;
    type: string;
    holdKey: string;
    wait: string;
    zoom: string;
    cursorPosition: string;
    pointer: Record<
      'move' | 'left' | 'right' | 'middle' | 'double' | 'triple' | 'down' | 'up' | 'drag',
      string
    >;
  };
  loadTools: {
    displayName: string;
    genericAction: string;
    genericTitle: string;
    genericDescription: string;
    count: (count: number) => string;
    technicalDetails: string;
    groupId: string;
    toolIds: string;
    groups: Record<
      'browser' | 'computer_use' | 'mcp' | 'rive' | 'agent' | 'settings',
      {
        label: string;
        action: string;
        title: string;
        description: string;
      }
    >;
  };
  permissionDenied: string;
  result: {
    hiddenLines: (count: number) => string;
    ptyFailed: string;
    queued: string;
    notQueued: string;
    queuedPreview: (action: string, preview: string, bytes?: number) => string;
    byteCount: (action: string, bytes: number) => string;
    resizeNotApplied: (size: string) => string;
    resized: (size: string) => string;
    sizeUnchanged: (size: string) => string;
    ptyCompleted: string;
    terminalUnavailable: string;
    noTerminalFrame: string;
    noOutputYet: string;
    noOutput: string;
    exitCode: (code: number) => string;
    managedBySource: string;
    sourceUnavailable: string;
    running: string;
    success: string;
    failed: string;
    timedOut: string;
    cancelled: string;
    disconnected: string;
    terminalTruncated: string;
    terminalRedacted: string;
    streamHidden: (stream: 'stdout' | 'stderr', count: number) => string;
    streamsTruncated: (limit: number) => string;
    outputTruncated: string;
    outputRedacted: string;
    backgroundStatus: Record<BackgroundTerminalStatus, string>;
    backgroundUnknown: (status: string) => string;
    workflow: { action: string; status: string; error: string; nodes: string; diagnostics: string };
    workflowCompleted: string;
    workflowFailed: string;
    fileWritten: (bytes: number, path: string) => string;
    webNoResults: string;
    webResults: (count: number) => string;
    credentialSource: Record<WebCredentialCopyKey, string>;
    webFailure: string;
    webSearch: string;
    webGuidance: Record<WebGuidanceKey, string>;
  };
  agent: {
    subagentStatus: Record<
      'completed' | 'failed' | 'cancelled' | 'running' | 'waiting_for_user',
      string
    >;
    readOnly: string;
    duration: (value: string) => string;
    copyState: { pending: string; copied: string; failed: string; pendingAria: (label: string) => string; failedAria: (label: string) => string };
    copyButtons: Record<'summary' | 'continuation' | 'process' | 'evidence' | 'report' | 'candidate' | 'matches', { idle: string; copied: string }>;
    objectiveFallback: string;
    foundRead: (found: number, read: number) => string;
    skipped: (count: number, sensitive?: number) => string;
    budgetLimited: string;
    continuationSuggested: (reason: string) => string;
    followupActionsAriaLabel: string;
    continuationTitle: string;
    incompleteFallback: string;
    detail: { terminal: string; foundRead: string; scope: string; queries: string; ignored: string; stopping: string; boundary: string; next: string };
    files: (count: number) => string;
    section: Record<'process' | 'evidence' | 'report' | 'candidates' | 'matches' | 'notes', { ariaLabel: string; title: string }>;
    score: (score: number) => string;
    complete: string;
    cancelledPartial: string;
    incomplete: string;
    notSpecified: string;
    field: Record<'status' | 'terminal' | 'objective' | 'summary' | 'scope' | 'queries' | 'foundRead' | 'duration' | 'ignored' | 'stopping' | 'boundary' | 'events' | 'evidence' | 'candidates' | 'matches' | 'continuationReason' | 'previousStatus' | 'previousTerminal' | 'previousDuration' | 'previousBoundary' | 'previousSummary', string>;
    terminalStatus: Record<'completed' | 'completed_empty' | 'failed' | 'canceled' | 'canceled_partial' | 'unknown', string>;
    reason: Record<'invalid_objective' | 'invalid_root' | 'no_readable_roots' | 'aborted' | 'unknown', string>;
    limitReason: Record<'candidate_budget' | 'file_budget' | 'match_budget' | 'byte_budget', string>;
    continuationReason: Record<'partial' | 'failed' | 'budget' | 'empty' | 'missing', string>;
    continuationIntro: string;
    continuationCandidates: string;
    continuationMatches: string;
    continuationOutro: string;
    eventType: Record<'started' | 'scope_resolved' | 'scan' | 'read' | 'checkpoint' | 'completed' | 'failed' | 'aborted', string>;
    candidateReason: Record<'content match' | 'project manifest' | 'project documentation' | 'project entrypoint' | 'project test surface' | 'project source surface' | 'fallback', string>;
    pathMatch: (path: string) => string;
  };
}

const TOOL_ACTIVITY_COPY = {
  'zh-CN': {
    errorLabel: '错误',
    status: { sandboxBlocked: '可能被沙箱阻止', interrupted: '已中断' },
    output: { redacted: '[已脱敏]', truncated: '输出已截断' },
    copy: {
      idle: '复制',
      pending: '复制中…',
      copied: '已复制',
      failed: '复制失败',
      actionAriaLabel: (action, identity) => `${action}：${identity}`,
    },
    sandboxBlocked: { title: '操作可能被沙箱阻止', description: '沙箱可能阻止了该调用中的至少一项操作。失败前可能已经产生部分结果，请检查输出和工作区状态后再决定是否重试。', copyAriaLabel: (label) => `${label}沙箱诊断信息` },
    requiresBypass: {
      title: '需要“绕过”模式',
      description: '此操作会直接控制本机应用，无法在沙箱模式下执行。',
      action: '切换并重试',
      pending: '正在切换…',
    },
    computer: {
      fallback: '操作电脑',
      listApps: '列出打开的应用',
      launchApp: (app) => `打开「${app}」`,
      launchAppUnknown: '打开应用',
      observe: '观察当前窗口',
      observeApp: (app) => `观察「${app}」窗口`,
      observeWindow: (windowId) => `观察窗口 ${windowId}`,
      observeMenu: (menu) => `查看「${menu}」菜单`,
      screenshot: '截图当前窗口',
      screenshotApp: (app) => `截图「${app}」窗口`,
      screenshotWindow: (windowId) => `截图窗口 ${windowId}`,
      element: (elementId) => `元素 ${elementId}`,
      elementUnknown: '该元素',
      clickElement: (element) => `点击${element}`,
      // The element phrase ends every clause it appears in: it is "元素 e12",
      // and Chinese typography wants a space around the latin id, which a
      // trailing 「的值」/「执行」 would either eat or leave dangling.
      setValue: (element) => `设置值：${element}`,
      selectText: (element) => `选择文本：${element}`,
      secondaryAction: (element) => `次要操作：${element}`,
      scrollElement: (element) => `滚动${element}`,
      elementSequence: (count) => `连续操作 ${count} 个控件`,
      elementSequenceUnknown: '连续操作多个控件',
      windowAction: '操作窗口',
      windowMove: '移动窗口',
      windowResize: '调整窗口大小',
      windowMinimize: '最小化窗口',
      targetApp: (app) => `「${app}」窗口`,
      targetWindow: (windowId) => `窗口 ${windowId}`,
      runningAction: (action, target) => target ? `正在${action} · ${target}` : `正在${action}`,
      runningSequence: (current, total, target) =>
        target
          ? `正在操作${target} · 连续操作第 ${current}/${total} 步`
          : `正在连续操作第 ${current}/${total} 步`,
      scroll: '滚动',
      pressKey: '按下按键',
      type: '输入文本',
      holdKey: '按住按键',
      wait: '等待',
      zoom: '放大查看区域',
      cursorPosition: '读取指针位置',
      pointer: {
        move: '移动指针',
        left: '点击',
        right: '右键点击',
        middle: '中键点击',
        double: '双击',
        triple: '三击',
        down: '按下鼠标',
        up: '松开鼠标',
        drag: '拖动',
      },
    },
    loadTools: {
      displayName: '启用能力',
      genericAction: '启用工具能力',
      genericTitle: '工具能力已启用',
      genericDescription: '现在可以使用这组工具。',
      count: (n) => `${n} 项能力可用`,
      technicalDetails: '技术详情',
      groupId: '工具组',
      toolIds: '工具',
      groups: {
        browser: { label: 'Browser', action: '启用浏览器操作', title: '浏览器操作已启用', description: '可以打开页面、读取内容并与网页交互。' },
        computer_use: { label: 'Computer Use', action: '启用桌面操作', title: '桌面操作已启用', description: '可以查看和操作已授权的本地应用。' },
        mcp: { label: 'MCP', action: '连接 MCP', title: 'MCP 工具已连接', description: '可以调用当前客户端连接的 MCP 服务。' },
        rive: { label: 'Rive', action: '启用 Rive 工作流', title: 'Rive 工作流已启用', description: '可以运行可恢复的多智能体工作流。' },
        agent: { label: 'Agent', action: '启用子智能体', title: '子智能体协作已启用', description: '可以并行分派、跟踪和汇总子任务。' },
        settings: { label: '设置', action: '启用设置工具', title: '设置工具已启用', description: '可以读取或更新当前客户端设置。' },
      },
    },
    permissionDenied: '用户已拒绝权限请求',
    result: {
      hiddenLines: (n) => `… 已隐藏 ${n} 行`, ptyFailed: '后台终端交互失败', queued: '已输入', notQueued: '未输入', queuedPreview: (action, preview, bytes) => bytes === undefined ? `${action}：${preview}` : `${action}：${preview}… · 共 ${bytes} 字节`, byteCount: (action, bytes) => `${action} ${bytes} 字节`, resizeNotApplied: (size) => `未调整为 ${size}`, resized: (size) => `已调整为 ${size}`, sizeUnchanged: (size) => `尺寸已是 ${size}`, ptyCompleted: '后台终端交互已完成', terminalUnavailable: '终端输出不可用', noTerminalFrame: '（无可用终端画面）', noOutputYet: '（尚无输出）', noOutput: '（无输出）', exitCode: (code) => `退出码 ${code}`, managedBySource: '由源任务管理', sourceUnavailable: '源任务不可用', running: '运行中', success: '成功', failed: '失败', timedOut: '已超时', cancelled: '已取消', disconnected: '已断开', terminalTruncated: '终端输出已截断', terminalRedacted: '终端输出已脱敏', streamHidden: (stream, n) => `… ${stream} 已隐藏 ${n} 行`, streamsTruncated: (limit) => `输出已截断 · 每路仅展示前 ${limit} 行`, outputTruncated: '输出已截断', outputRedacted: '输出已脱敏',
      backgroundStatus: { running: '后台运行中', completed: '后台已完成', failed: '后台失败', timed_out: '后台超时', cancelled: '后台已取消', orphaned: '后台任务已断开' }, backgroundUnknown: (status) => `后台 · ${status}`,
      workflow: { action: '动作', status: '状态', error: '错误', nodes: '节点摘要', diagnostics: '诊断片段' }, webNoResults: '没有结果', webResults: (n) => `${n} 条结果`, credentialSource: { env: '环境变量', settings: '本机已保存 key', missing: '未配置', unknown: '来源未知' }, webFailure: '搜索失败', webSearch: '联网搜索', webGuidance: { env: '请检查 TAVILY_API_KEY / MAKA_TAVILY_API_KEY 后重启。', settings: '请在 设置 · 联网搜索 中更新 Tavily key。', rate_limited: 'Tavily 当前限流，请稍后重试或更换可用凭据。', not_configured: '请先完成联网搜索配置后再重试。', timed_out: '请求超时，请稍后重试。', privacy_mode: '隐私模式下不会发起联网搜索。', unknown: '请检查网络或稍后重试。' },
      workflowCompleted: 'Rive 工作流已完成',
      workflowFailed: 'Rive 工作流执行失败',
      fileWritten: (bytes, path) => `已向 ${path} 写入 ${bytes} 字节`,
    },
    agent: {
      subagentStatus: { completed: '已完成', failed: '失败', cancelled: '已取消', running: '运行中', waiting_for_user: '等待用户输入' }, readOnly: '只读', duration: (value) => `耗时 ${value}`,
      copyState: { pending: '复制中…', copied: '已复制', failed: '复制失败', pendingAria: (label) => `${label}中`, failedAria: (label) => `${label}失败` },
      copyButtons: { summary: { idle: '复制摘要', copied: '已复制探索摘要' }, continuation: { idle: '复制续研提示', copied: '已复制续研提示' }, process: { idle: '复制过程', copied: '已复制探索过程' }, evidence: { idle: '复制证据', copied: '已复制证据锚点' }, report: { idle: '复制报告', copied: '已复制研究报告' }, candidate: { idle: '复制候选', copied: '已复制候选文件' }, matches: { idle: '复制片段', copied: '已复制命中片段' } },
      objectiveFallback: '只读探索', foundRead: (found, read) => `发现/读 ${found} / ${read} 个文件`, skipped: (count, sensitive) => sensitive ? `跳过 ${count} 个（含敏感 ${sensitive} 个）` : `跳过 ${count} 个`, budgetLimited: '受预算限制', continuationSuggested: (reason) => `建议续研：${reason}`, followupActionsAriaLabel: '只读探索后续操作', continuationTitle: '复制一段可继续只读探索的提示', incompleteFallback: '只读探索未完成。', detail: { terminal: '终态', foundRead: '发现/读', scope: '范围', queries: '查询', ignored: '忽略', stopping: '停止', boundary: '边界', next: '后续' }, files: (n) => `${n} 个文件`,
      section: { process: { ariaLabel: '探索过程', title: '过程' }, evidence: { ariaLabel: '证据锚点', title: '证据锚点' }, report: { ariaLabel: '研究报告', title: '研究报告' }, candidates: { ariaLabel: '候选文件', title: '候选文件' }, matches: { ariaLabel: '命中片段', title: '命中片段' }, notes: { ariaLabel: '探索说明', title: '说明' } }, score: (score) => `分数 ${score}`, complete: '已完成', cancelledPartial: '已取消 · 保留部分结果', incomplete: '未完成', notSpecified: '未指定',
      field: { status: '状态', terminal: '终态', objective: '目标', summary: '摘要', scope: '范围', queries: '查询', foundRead: '发现/读取', duration: '耗时', ignored: '忽略', stopping: '停止条件', boundary: '预算边界', events: '事件', evidence: '证据', candidates: '候选', matches: '命中片段', continuationReason: '续研原因', previousStatus: '上一轮状态', previousTerminal: '上一轮终态', previousDuration: '上一轮耗时', previousBoundary: '上一轮预算边界', previousSummary: '上一轮摘要' },
      terminalStatus: { completed: '完成，有证据', completed_empty: '完成，无证据', failed: '失败', canceled: '已取消', canceled_partial: '已取消，有部分结果', unknown: '未知终态' }, reason: { invalid_objective: '目标无效', invalid_root: '范围无效', no_readable_roots: '没有可读取范围', aborted: '已取消', unknown: '未知诊断' }, limitReason: { candidate_budget: '候选文件预算已满', file_budget: '读取文件预算已满', match_budget: '命中预算已满', byte_budget: '读取字节预算已满' }, continuationReason: { partial: '已有部分结果，仍需补证据', failed: '上一轮未完成', budget: '达到预算边界', empty: '没有找到证据', missing: '仍缺证据' },
      continuationIntro: '继续这次只读探索，不要修改文件。', continuationCandidates: '优先补读候选：', continuationMatches: '已有命中片段：', continuationOutro: '请只读检查仍缺证据的部分，输出新的证据锚点、候选文件、结论和下一步 gate。', eventType: { started: '开始', scope_resolved: '范围', scan: '扫描', read: '读取', checkpoint: '进度', completed: '完成', failed: '失败', aborted: '取消' }, candidateReason: { 'content match': '内容命中', 'project manifest': '项目配置', 'project documentation': '项目文档', 'project entrypoint': '入口文件', 'project test surface': '测试线索', 'project source surface': '源码线索', fallback: '探索线索' }, pathMatch: (path) => `路径命中 ${path}`,
    },
  },
  'zh-TW': {
    errorLabel: '錯誤',
    status: { sandboxBlocked: '可能被沙箱阻止', interrupted: '已中斷' },
    output: { redacted: '[已脫敏]', truncated: '輸出已截斷' },
    copy: {
      idle: '複製',
      pending: '複製中…',
      copied: '已複製',
      failed: '複製失敗',
      actionAriaLabel: (action, identity) => `${action}：${identity}`,
    },
    sandboxBlocked: { title: '操作可能被沙箱阻止', description: '沙箱可能阻止了該呼叫中的至少一項操作。失敗前可能已經產生部分結果，請檢查輸出和工作區狀態後再決定是否重試。', copyAriaLabel: (label) => `${label}沙箱診斷資訊` },
    requiresBypass: {
      title: '需要“繞過”模式',
      description: '此操作會直接控制本機應用，無法在沙箱模式下執行。',
      action: '切換並重試',
      pending: '正在切換…',
    },
    computer: {
      fallback: '操作電腦',
      listApps: '列出開啟的應用',
      launchApp: (app) => `開啟「${app}」`,
      launchAppUnknown: '開啟應用',
      observe: '觀察目前視窗',
      observeApp: (app) => `觀察「${app}」視窗`,
      observeWindow: (windowId) => `觀察視窗 ${windowId}`,
      observeMenu: (menu) => `檢視「${menu}」選單`,
      screenshot: '截圖目前視窗',
      screenshotApp: (app) => `截圖「${app}」視窗`,
      screenshotWindow: (windowId) => `截圖視窗 ${windowId}`,
      element: (elementId) => `元素 ${elementId}`,
      elementUnknown: '該元素',
      clickElement: (element) => `點選${element}`,
      // The element phrase ends every clause it appears in: it is "元素 e12",
      // and Chinese typography wants a space around the latin id, which a
      // trailing 「的值」/「執行」 would either eat or leave dangling.
      setValue: (element) => `設定值：${element}`,
      selectText: (element) => `選擇文本：${element}`,
      secondaryAction: (element) => `次要操作：${element}`,
      scrollElement: (element) => `滾動${element}`,
      elementSequence: (count) => `連續操作 ${count} 個控制元件`,
      elementSequenceUnknown: '連續操作多個控制元件',
      windowAction: '操作視窗',
      windowMove: '移動視窗',
      windowResize: '調整視窗大小',
      windowMinimize: '最小化視窗',
      targetApp: (app) => `「${app}」視窗`,
      targetWindow: (windowId) => `視窗 ${windowId}`,
      runningAction: (action, target) => target ? `正在${action} · ${target}` : `正在${action}`,
      runningSequence: (current, total, target) =>
        target
          ? `正在操作${target} · 連續操作第 ${current}/${total} 步`
          : `正在連續操作第 ${current}/${total} 步`,
      scroll: '滾動',
      pressKey: '按下按鍵',
      type: '輸入文本',
      holdKey: '按住按鍵',
      wait: '等待',
      zoom: '放大檢視區域',
      cursorPosition: '讀取指標位置',
      pointer: {
        move: '移動指標',
        left: '點選',
        right: '右鍵點選',
        middle: '中鍵點選',
        double: '雙擊',
        triple: '三擊',
        down: '按下滑鼠',
        up: '鬆開滑鼠',
        drag: '拖動',
      },
    },
    loadTools: {
      displayName: '啟用能力',
      genericAction: '啟用工具能力',
      genericTitle: '工具能力已啟用',
      genericDescription: '現在可以使用這組工具。',
      count: (n) => `${n} 項能力可用`,
      technicalDetails: '技術詳情',
      groupId: '工具組',
      toolIds: '工具',
      groups: {
        browser: { label: 'Browser', action: '啟用瀏覽器操作', title: '瀏覽器操作已啟用', description: '可以開啟頁面、讀取內容並與網頁互動。' },
        computer_use: { label: 'Computer Use', action: '啟用桌面操作', title: '桌面操作已啟用', description: '可以檢視和操作已授權的本地應用。' },
        mcp: { label: 'MCP', action: '連線 MCP', title: 'MCP 工具已連線', description: '可以呼叫目前客戶端連線的 MCP 服務。' },
        rive: { label: 'Rive', action: '啟用 Rive 工作流', title: 'Rive 工作流已啟用', description: '可以執行可恢復的多智慧體工作流。' },
        agent: { label: 'Agent', action: '啟用子智慧體', title: '子智慧體協作已啟用', description: '可以並行分派、跟蹤和彙總子任務。' },
        settings: { label: '設定', action: '啟用設定工具', title: '設定工具已啟用', description: '可以讀取或更新目前客戶端設定。' },
      },
    },
    permissionDenied: '使用者已拒絕權限請求',
    result: {
      hiddenLines: (n) => `… 已隱藏 ${n} 行`, ptyFailed: '後臺終端互動失敗', queued: '已輸入', notQueued: '未輸入', queuedPreview: (action, preview, bytes) => bytes === undefined ? `${action}：${preview}` : `${action}：${preview}… · 共 ${bytes} 位元組`, byteCount: (action, bytes) => `${action} ${bytes} 位元組`, resizeNotApplied: (size) => `未調整為 ${size}`, resized: (size) => `已調整為 ${size}`, sizeUnchanged: (size) => `尺寸已是 ${size}`, ptyCompleted: '後臺終端互動已完成', terminalUnavailable: '終端輸出不可用', noTerminalFrame: '（無可用終端畫面）', noOutputYet: '（尚無輸出）', noOutput: '（無輸出）', exitCode: (code) => `退出碼 ${code}`, managedBySource: '由源任務管理', sourceUnavailable: '源任務不可用', running: '執行中', success: '成功', failed: '失敗', timedOut: '已超時', cancelled: '已取消', disconnected: '已斷開', terminalTruncated: '終端輸出已截斷', terminalRedacted: '終端輸出已脫敏', streamHidden: (stream, n) => `… ${stream} 已隱藏 ${n} 行`, streamsTruncated: (limit) => `輸出已截斷 · 每路僅展示前 ${limit} 行`, outputTruncated: '輸出已截斷', outputRedacted: '輸出已脫敏',
      backgroundStatus: { running: '後臺執行中', completed: '後臺已完成', failed: '後臺失敗', timed_out: '後臺超時', cancelled: '後臺已取消', orphaned: '後臺任務已斷開' }, backgroundUnknown: (status) => `後臺 · ${status}`,
      workflow: { action: '動作', status: '狀態', error: '錯誤', nodes: '節點摘要', diagnostics: '診斷片段' }, webNoResults: '沒有結果', webResults: (n) => `${n} 條結果`, credentialSource: { env: '環境變數', settings: '本機已儲存 key', missing: '未設定', unknown: '來源未知' }, webFailure: '搜尋失敗', webSearch: '聯網搜尋', webGuidance: { env: '請檢查 TAVILY_API_KEY / MAKA_TAVILY_API_KEY 後重啟。', settings: '請在 設定 · 聯網搜尋 中更新 Tavily key。', rate_limited: 'Tavily 目前限流，請稍後重試或更換可用憑據。', not_configured: '請先完成聯網搜尋設定後再重試。', timed_out: '請求超時，請稍後重試。', privacy_mode: '隱私模式下不會發起聯網搜尋。', unknown: '請檢查網路或稍後重試。' },
      workflowCompleted: 'Rive 工作流已完成',
      workflowFailed: 'Rive 工作流執行失敗',
      fileWritten: (bytes, path) => `已向 ${path} 寫入 ${bytes} 位元組`,
    },
    agent: {
      subagentStatus: { completed: '已完成', failed: '失敗', cancelled: '已取消', running: '執行中', waiting_for_user: '等待使用者輸入' }, readOnly: '只讀', duration: (value) => `耗時 ${value}`,
      copyState: { pending: '複製中…', copied: '已複製', failed: '複製失敗', pendingAria: (label) => `${label}中`, failedAria: (label) => `${label}失敗` },
      copyButtons: { summary: { idle: '複製摘要', copied: '已複製探索摘要' }, continuation: { idle: '複製續研提示', copied: '已複製續研提示' }, process: { idle: '複製過程', copied: '已複製探索過程' }, evidence: { idle: '複製證據', copied: '已複製證據錨點' }, report: { idle: '複製報告', copied: '已複製研究報告' }, candidate: { idle: '複製候選', copied: '已複製候選檔案' }, matches: { idle: '複製片段', copied: '已複製命中片段' } },
      objectiveFallback: '只讀探索', foundRead: (found, read) => `發現/讀 ${found} / ${read} 個檔案`, skipped: (count, sensitive) => sensitive ? `跳過 ${count} 個（含敏感 ${sensitive} 個）` : `跳過 ${count} 個`, budgetLimited: '受預算限制', continuationSuggested: (reason) => `建議續研：${reason}`, followupActionsAriaLabel: '只讀探索後續操作', continuationTitle: '複製一段可繼續只讀探索的提示', incompleteFallback: '只讀探索未完成。', detail: { terminal: '終態', foundRead: '發現/讀', scope: '範圍', queries: '查詢', ignored: '忽略', stopping: '停止', boundary: '邊界', next: '後續' }, files: (n) => `${n} 個檔案`,
      section: { process: { ariaLabel: '探索過程', title: '過程' }, evidence: { ariaLabel: '證據錨點', title: '證據錨點' }, report: { ariaLabel: '研究報告', title: '研究報告' }, candidates: { ariaLabel: '候選檔案', title: '候選檔案' }, matches: { ariaLabel: '命中片段', title: '命中片段' }, notes: { ariaLabel: '探索說明', title: '說明' } }, score: (score) => `分數 ${score}`, complete: '已完成', cancelledPartial: '已取消 · 保留部分結果', incomplete: '未完成', notSpecified: '未指定',
      field: { status: '狀態', terminal: '終態', objective: '目標', summary: '摘要', scope: '範圍', queries: '查詢', foundRead: '發現/讀取', duration: '耗時', ignored: '忽略', stopping: '停止條件', boundary: '預算邊界', events: '事件', evidence: '證據', candidates: '候選', matches: '命中片段', continuationReason: '續研原因', previousStatus: '上一輪狀態', previousTerminal: '上一輪終態', previousDuration: '上一輪耗時', previousBoundary: '上一輪預算邊界', previousSummary: '上一輪摘要' },
      terminalStatus: { completed: '完成，有證據', completed_empty: '完成，無證據', failed: '失敗', canceled: '已取消', canceled_partial: '已取消，有部分結果', unknown: '未知終態' }, reason: { invalid_objective: '目標無效', invalid_root: '範圍無效', no_readable_roots: '沒有可讀取範圍', aborted: '已取消', unknown: '未知診斷' }, limitReason: { candidate_budget: '候選檔案預算已滿', file_budget: '讀取檔案預算已滿', match_budget: '命中預算已滿', byte_budget: '讀取位元組預算已滿' }, continuationReason: { partial: '已有部分結果，仍需補證據', failed: '上一輪未完成', budget: '達到預算邊界', empty: '沒有找到證據', missing: '仍缺證據' },
      continuationIntro: '繼續這次只讀探索，不要修改檔案。', continuationCandidates: '優先補讀候選：', continuationMatches: '已有命中片段：', continuationOutro: '請只讀檢查仍缺證據的部分，輸出新的證據錨點、候選檔案、結論和下一步 gate。', eventType: { started: '開始', scope_resolved: '範圍', scan: '掃描', read: '讀取', checkpoint: '進度', completed: '完成', failed: '失敗', aborted: '取消' }, candidateReason: { 'content match': '內容命中', 'project manifest': '專案設定', 'project documentation': '專案文件', 'project entrypoint': '入口檔案', 'project test surface': '測試線索', 'project source surface': '原始碼線索', fallback: '探索線索' }, pathMatch: (path) => `路徑命中 ${path}`,
    },
  },
  en: {
    errorLabel: 'Error',
    status: { sandboxBlocked: 'Possibly blocked by sandbox', interrupted: 'Interrupted' },
    output: { redacted: '[Redacted]', truncated: 'Output truncated' },
    copy: {
      idle: 'Copy',
      pending: 'Copying…',
      copied: 'Copied',
      failed: 'Copy failed',
      actionAriaLabel: (action, identity) => `${action}: ${identity}`,
    },
    sandboxBlocked: { title: 'Operation may have been blocked by sandbox', description: 'The sandbox may have blocked at least one action in this call. Some effects may have occurred before it failed; check the output and workspace state before retrying.', copyAriaLabel: (label) => `${label} sandbox diagnostics` },
    requiresBypass: {
      title: 'Bypass mode required',
      description: 'This action controls a local app directly and cannot run inside the sandbox.',
      action: 'Switch and retry',
      pending: 'Switching…',
    },
    computer: {
      fallback: 'Use the computer',
      listApps: 'List open apps',
      launchApp: (app) => `Open “${app}”`,
      launchAppUnknown: 'Open an app',
      observe: 'Observe the current window',
      observeApp: (app) => `Observe the “${app}” window`,
      observeWindow: (windowId) => `Observe window ${windowId}`,
      observeMenu: (menu) => `Inspect the “${menu}” menu`,
      screenshot: 'Screenshot the current window',
      screenshotApp: (app) => `Screenshot the “${app}” window`,
      screenshotWindow: (windowId) => `Screenshot window ${windowId}`,
      element: (elementId) => `element ${elementId}`,
      elementUnknown: 'the element',
      clickElement: (element) => `Click ${element}`,
      setValue: (element) => `Set the value of ${element}`,
      selectText: (element) => `Select text in ${element}`,
      secondaryAction: (element) => `Run a secondary action on ${element}`,
      scrollElement: (element) => `Scroll ${element}`,
      elementSequence: (count) => `Operate ${count} controls`,
      elementSequenceUnknown: 'Operate multiple controls',
      windowAction: 'Operate the window',
      windowMove: 'Move the window',
      windowResize: 'Resize the window',
      windowMinimize: 'Minimize the window',
      targetApp: (app) => `“${app}” window`,
      targetWindow: (windowId) => `Window ${windowId}`,
      runningAction: (action, target) => target ? `${action} · ${target}` : action,
      runningSequence: (current, total, target) =>
        target
          ? `Operating ${target} · step ${current}/${total}`
          : `Operating controls · step ${current}/${total}`,
      scroll: 'Scroll',
      pressKey: 'Press a key',
      type: 'Type text',
      holdKey: 'Hold a key',
      wait: 'Wait',
      zoom: 'Zoom into a region',
      cursorPosition: 'Read the pointer position',
      pointer: {
        move: 'Move the pointer',
        left: 'Click',
        right: 'Right-click',
        middle: 'Middle-click',
        double: 'Double-click',
        triple: 'Triple-click',
        down: 'Press the mouse',
        up: 'Release the mouse',
        drag: 'Drag',
      },
    },
    loadTools: {
      displayName: 'Enable capabilities',
      genericAction: 'Enable tool capabilities',
      genericTitle: 'Tool capabilities enabled',
      genericDescription: 'This tool group is ready to use.',
      count: (n) => `${n} ${n === 1 ? 'capability' : 'capabilities'} available`,
      technicalDetails: 'Technical details',
      groupId: 'Group',
      toolIds: 'Tools',
      groups: {
        browser: { label: 'Browser', action: 'Enable browser actions', title: 'Browser actions enabled', description: 'Open pages, read content, and interact with websites.' },
        computer_use: { label: 'Computer Use', action: 'Enable desktop actions', title: 'Desktop actions enabled', description: 'View and operate authorized local applications.' },
        mcp: { label: 'MCP', action: 'Connect MCP', title: 'MCP tools connected', description: 'Use MCP services connected by the current client.' },
        rive: { label: 'Rive', action: 'Enable Rive workflows', title: 'Rive workflows enabled', description: 'Run durable multi-agent workflows.' },
        agent: { label: 'Agent', action: 'Enable subagents', title: 'Subagent collaboration enabled', description: 'Delegate, track, and summarize tasks in parallel.' },
        settings: { label: 'Settings', action: 'Enable settings tools', title: 'Settings tools enabled', description: 'Read or update settings owned by the current client.' },
      },
    },
    permissionDenied: 'User denied the permission request',
    result: {
      hiddenLines: (n) => `… ${n} ${n === 1 ? 'line' : 'lines'} hidden`, ptyFailed: 'Background terminal interaction failed', queued: 'Entered', notQueued: 'Not entered', queuedPreview: (action, preview, bytes) => bytes === undefined ? `${action}: ${preview}` : `${action}: ${preview}… · ${bytes} bytes total`, byteCount: (action, bytes) => `${action} ${bytes} bytes`, resizeNotApplied: (size) => `Not resized to ${size}`, resized: (size) => `Resized to ${size}`, sizeUnchanged: (size) => `Size already ${size}`, ptyCompleted: 'Background terminal interaction completed', terminalUnavailable: 'Terminal output unavailable', noTerminalFrame: '(No terminal frame available)', noOutputYet: '(No output yet)', noOutput: '(No output)', exitCode: (code) => `exit code ${code}`, managedBySource: 'Managed by the source task', sourceUnavailable: 'Source task unavailable', running: 'Running', success: 'Succeeded', failed: 'Failed', timedOut: 'Timed out', cancelled: 'Cancelled', disconnected: 'Disconnected', terminalTruncated: 'Terminal output truncated', terminalRedacted: 'Terminal output redacted', streamHidden: (stream, n) => `… ${n} ${stream} ${n === 1 ? 'line' : 'lines'} hidden`, streamsTruncated: (limit) => `Output truncated · showing the first ${limit} lines of each stream`, outputTruncated: 'Output truncated', outputRedacted: 'Output redacted',
      backgroundStatus: { running: 'Running in background', completed: 'Background task completed', failed: 'Background task failed', timed_out: 'Background task timed out', cancelled: 'Background task cancelled', orphaned: 'Background task disconnected' }, backgroundUnknown: (status) => `Background · ${status}`,
      workflow: { action: 'Action', status: 'Status', error: 'Error', nodes: 'Node summary', diagnostics: 'Diagnostic excerpts' }, webNoResults: 'No results', webResults: (n) => `${n} ${n === 1 ? 'result' : 'results'}`, credentialSource: { env: 'Environment variable', settings: 'Locally saved key', missing: 'Not configured', unknown: 'Unknown source' }, webFailure: 'Search failed', webSearch: 'Web search', webGuidance: { env: 'Check TAVILY_API_KEY / MAKA_TAVILY_API_KEY and restart.', settings: 'Update the Tavily key in Settings · Web search.', rate_limited: 'Tavily is rate-limiting requests. Try again later or use another credential.', not_configured: 'Configure web search before retrying.', timed_out: 'The request timed out. Try again later.', privacy_mode: 'Web search is disabled in privacy mode.', unknown: 'Check the network connection or try again later.' },
      workflowCompleted: 'Rive workflow completed',
      workflowFailed: 'Rive workflow failed',
      fileWritten: (bytes, path) => `Wrote ${bytes} bytes to ${path}`,
    },
    agent: {
      subagentStatus: { completed: 'Completed', failed: 'Failed', cancelled: 'Cancelled', running: 'Running', waiting_for_user: 'Waiting for user input' }, readOnly: 'Read only', duration: (value) => `Duration ${value}`,
      copyState: { pending: 'Copying…', copied: 'Copied', failed: 'Copy failed', pendingAria: (label) => `Copying ${label}`, failedAria: (label) => `Failed to copy ${label}` },
      copyButtons: { summary: { idle: 'Copy summary', copied: 'Exploration summary copied' }, continuation: { idle: 'Copy continuation prompt', copied: 'Continuation prompt copied' }, process: { idle: 'Copy process', copied: 'Exploration process copied' }, evidence: { idle: 'Copy evidence', copied: 'Evidence anchors copied' }, report: { idle: 'Copy report', copied: 'Research report copied' }, candidate: { idle: 'Copy candidates', copied: 'Candidate files copied' }, matches: { idle: 'Copy matches', copied: 'Matching excerpts copied' } },
      objectiveFallback: 'Read-only exploration', foundRead: (found, read) => `Discovered/read ${found} / ${read} files`, skipped: (count, sensitive) => sensitive ? `Skipped ${count} (${sensitive} sensitive)` : `Skipped ${count}`, budgetLimited: 'Budget limited', continuationSuggested: (reason) => `Continue: ${reason}`, followupActionsAriaLabel: 'Read-only exploration follow-up actions', continuationTitle: 'Copy a prompt that continues the read-only exploration', incompleteFallback: 'Read-only exploration did not complete.', detail: { terminal: 'Terminal state', foundRead: 'Discovered/read', scope: 'Scope', queries: 'Queries', ignored: 'Ignored', stopping: 'Stopped by', boundary: 'Limits', next: 'Next' }, files: (n) => `${n} ${n === 1 ? 'file' : 'files'}`,
      section: { process: { ariaLabel: 'Exploration process', title: 'Process' }, evidence: { ariaLabel: 'Evidence anchors', title: 'Evidence anchors' }, report: { ariaLabel: 'Research report', title: 'Research report' }, candidates: { ariaLabel: 'Candidate files', title: 'Candidate files' }, matches: { ariaLabel: 'Matching excerpts', title: 'Matching excerpts' }, notes: { ariaLabel: 'Exploration notes', title: 'Notes' } }, score: (score) => `Score ${score}`, complete: 'Completed', cancelledPartial: 'Cancelled · Partial results retained', incomplete: 'Incomplete', notSpecified: 'Not specified',
      field: { status: 'Status', terminal: 'Terminal state', objective: 'Objective', summary: 'Summary', scope: 'Scope', queries: 'Queries', foundRead: 'Discovered/read', duration: 'Duration', ignored: 'Ignored', stopping: 'Stopping condition', boundary: 'Budget limits', events: 'Events', evidence: 'Evidence', candidates: 'Candidates', matches: 'Matching excerpts', continuationReason: 'Continuation reason', previousStatus: 'Previous status', previousTerminal: 'Previous terminal state', previousDuration: 'Previous duration', previousBoundary: 'Previous budget limits', previousSummary: 'Previous summary' },
      terminalStatus: { completed: 'Completed with evidence', completed_empty: 'Completed without evidence', failed: 'Failed', canceled: 'Cancelled', canceled_partial: 'Cancelled with partial results', unknown: 'Unknown terminal state' }, reason: { invalid_objective: 'Invalid objective', invalid_root: 'Invalid scope', no_readable_roots: 'No readable scope', aborted: 'Cancelled', unknown: 'Unknown diagnostic' }, limitReason: { candidate_budget: 'Candidate-file budget reached', file_budget: 'File-read budget reached', match_budget: 'Match budget reached', byte_budget: 'Byte-read budget reached' }, continuationReason: { partial: 'Partial results need more evidence', failed: 'The previous run did not complete', budget: 'A budget limit was reached', empty: 'No evidence was found', missing: 'More evidence is needed' },
      continuationIntro: 'Continue this read-only exploration without changing files.', continuationCandidates: 'Prioritize these candidates:', continuationMatches: 'Existing matching excerpts:', continuationOutro: 'Inspect only the areas that still lack evidence, then return new evidence anchors, candidate files, conclusions, and the next gate.', eventType: { started: 'Started', scope_resolved: 'Scope', scan: 'Scan', read: 'Read', checkpoint: 'Progress', completed: 'Completed', failed: 'Failed', aborted: 'Cancelled' }, candidateReason: { 'content match': 'Content match', 'project manifest': 'Project manifest', 'project documentation': 'Project documentation', 'project entrypoint': 'Entry point', 'project test surface': 'Test signal', 'project source surface': 'Source signal', fallback: 'Exploration signal' }, pathMatch: (path) => `Path match ${path}`,
    },
  },
} satisfies UiCatalog<ToolActivityCopy>;

export function getToolActivityCopy(locale: UiLocale): ToolActivityCopy {
  return TOOL_ACTIVITY_COPY[locale];
}
