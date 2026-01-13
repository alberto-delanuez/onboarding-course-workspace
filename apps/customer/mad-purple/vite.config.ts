/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/customer/mad-purple',
  server: {
    port: 4201,
    host: 'localhost',
  },
  preview: {
    port: 4201,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@onboarding-course/customer-themes-purple': resolve(
        __dirname,
        '../../../libs/customer/themes/purple/src/index.ts'
      ),
      '@onboarding-course/customer-themes-base': resolve(
        __dirname,
        '../../../libs/customer/themes/base/src/index.ts'
      ),
      '@onboarding-course/customer-auth-ui': resolve(
        __dirname,
        '../../../libs/customer/auth/ui/src/index.ts'
      ),
      '@onboarding-course/customer-auth-domain': resolve(
        __dirname,
        '../../../libs/customer/auth/domain/src/index.ts'
      ),
      '@onboarding-course/customer-auth-infrastructure': resolve(
        __dirname,
        '../../../libs/customer/auth/infrastructure/src/index.ts'
      ),
      '@onboarding-course/customer-auth-application': resolve(
        __dirname,
        '../../../libs/customer/auth/application/src/index.ts'
      ),
      '@onboarding-course/customer-common-ui': resolve(
        __dirname,
        '../../../libs/customer/common/ui/src/index.ts'
      ),
      '@onboarding-course/customer-profile-ui': resolve(
        __dirname,
        '../../../libs/customer/profile/ui/src/index.ts'
      ),
      '@onboarding-course/customer-profile-domain': resolve(
        __dirname,
        '../../../libs/customer/profile/domain/src/index.ts'
      ),
      '@onboarding-course/customer-profile-infrastructure': resolve(
        __dirname,
        '../../../libs/customer/profile/infrastructure/src/index.ts'
      ),
      '@onboarding-course/customer-profile-application': resolve(
        __dirname,
        '../../../libs/customer/profile/application/src/index.ts'
      ),
      '@onboarding-course/customer-common-di': resolve(
        __dirname,
        '../../../libs/customer/common/di/src/index.ts'
      ),
    },
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: '@onboarding-course/mad-purple',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
