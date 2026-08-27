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

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { test, expect } from './fixtures';

test('captures General Settings in Simplified and Traditional Chinese', async ({
  window: page,
}, testInfo) => {
  const outputDirectory = path.join(testInfo.outputDir, 'zh-tw-locale');
  await mkdir(outputDirectory, { recursive: true });

  await page.getByRole('button', { name: '设置', exact: true }).click();
  await expect(page.getByRole('main', { name: '设置内容' })).toBeVisible();
  await page.getByRole('button', { name: '通用', exact: true }).click();
  await expect(page.getByText('界面语言', { exact: true }).first()).toBeVisible();
  await page.screenshot({ path: path.join(outputDirectory, 'settings-zh-CN.png'), fullPage: true });
  await page.keyboard.press('Escape');

  await page.evaluate(async () => {
    await window.maka.settings.update({ personalization: { uiLocale: 'zh-TW' } });
  });
  await page.reload();
  await page.waitForSelector('.maka-composer-editor');
  await page.getByRole('button', { name: '設定', exact: true }).click();
  await expect(page.getByRole('main', { name: '設定內容' })).toBeVisible();
  await page.getByRole('button', { name: '通用', exact: true }).click();
  await expect(page.getByText('介面語言', { exact: true }).first()).toBeVisible();
  await page.screenshot({ path: path.join(outputDirectory, 'settings-zh-TW.png'), fullPage: true });
});
