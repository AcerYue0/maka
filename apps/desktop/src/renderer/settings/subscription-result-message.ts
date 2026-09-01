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

import { generalizedErrorMessageForLocale, redactSecrets } from '@maka/core/redaction';
import type { UiLocale } from '@maka/core/ui-locale';

export function subscriptionResultMessage(
  message: string | undefined,
  fallback: string,
  locale: UiLocale = 'zh-CN',
): string {
  const raw = redactSecrets(message ?? '').trim();
  if (!raw) return fallback;
  if (/already in progress|superseded by a new attempt/i.test(raw)) {
    if (locale === 'zh-CN') return '上一轮浏览器登录仍在进行或已切换，请再点一次登录，或稍后再试。';
    if (locale === 'zh-TW') return '上一輪瀏覽器登入仍在進行或已切換，請再按一次登入，或稍後再試。';
    return 'A previous browser login is still running or was superseded. Try logging in again shortly.';
  }
  if (/did not present OAuth|no matching OAuth presentation/i.test(raw)) {
    if (locale === 'zh-CN') return '无法打开系统浏览器完成登录，请检查是否拦截了弹窗后重试。';
    if (locale === 'zh-TW') return '無法開啟系統瀏覽器完成登入，請檢查是否封鎖了彈出式視窗後再試。';
    return 'Could not open the system browser for login. Check popup blockers and try again.';
  }
  const classified = generalizedErrorMessageForLocale(new Error(raw), '', locale);
  if (classified) return classified;
  return locale === 'zh-CN' || !/[\u4e00-\u9fff]/.test(raw) ? raw : fallback;
}
