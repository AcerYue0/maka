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

import { describe, test } from 'node:test';
import { expect } from './test-helpers.js';
import {
  isUiLocale,
  isUiLocalePreference,
  resolveSystemUiLocale,
  resolveUiLocale,
  uiLocaleToIntlLocale,
} from '../ui-locale.js';

describe('UI locale', () => {
  test('accepts only the supported resolved locales and preferences', () => {
    expect(['zh-CN', 'zh-TW', 'en'].every(isUiLocale)).toBe(true);
    expect(isUiLocale('zh')).toBe(false);
    expect(['auto', 'zh-CN', 'zh-TW', 'en'].every(isUiLocalePreference)).toBe(true);
  });

  for (const [languages, expected] of [
    [['zh-CN'], 'zh-CN'],
    [['zh-SG'], 'zh-CN'],
    [['zh-Hans'], 'zh-CN'],
    [['zh-TW'], 'zh-TW'],
    [['zh-Hant-TW'], 'zh-TW'],
    [['zh-HK'], 'zh-TW'],
    [['zh_MO'], 'zh-TW'],
    [['zh_TW.UTF-8'], 'zh-TW'],
    [['fr-FR', 'en-US'], 'en'],
    [[], 'en'],
  ] as const) {
    test(`resolves system languages ${languages.join(',')} to ${expected}`, () => {
      expect(resolveSystemUiLocale(languages)).toBe(expected);
    });
  }

  test('resolves explicit preferences and overrides before the system locale', () => {
    expect(resolveUiLocale('auto', 'zh-TW')).toBe('zh-TW');
    expect(resolveUiLocale('zh-CN', 'zh-TW')).toBe('zh-CN');
    expect(resolveUiLocale('zh-CN', 'zh-CN', 'en')).toBe('en');
  });

  for (const locale of ['zh-CN', 'zh-TW', 'en'] as const) {
    test(`uses ${locale} for Intl formatting`, () => {
      expect(uiLocaleToIntlLocale(locale)).toBe(locale);
    });
  }
});
