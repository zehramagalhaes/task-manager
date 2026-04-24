/**
 * Vitest Setup File
 * Runs before test suite to configure testing environment
 */

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { beforeAll } from 'vitest';

let testBed: typeof getTestBed;

/**
 * Initialize test environment
 */
beforeAll(() => {
  testBed = getTestBed();
  testBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
});
