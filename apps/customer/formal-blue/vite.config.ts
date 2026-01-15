/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => {
    const isAnalyze = process.env.ANALYZE === 'true';

    return {
        root: __dirname,
        cacheDir: '../../../node_modules/.vite/apps/customer/formal-blue',
        server: {
            port: 4200,
            host: 'localhost'
        },
        preview: {
            port: 4200,
            host: 'localhost'
        },
        resolve: {
            alias: {
                '@onboarding-course/customer-themes-blue': resolve(
                    __dirname,
                    '../../../libs/customer/themes/blue/src/index.ts'
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
                '@onboarding-course/customer-common-utils': resolve(
                    __dirname,
                    '../../../libs/customer/common/utils/src/index.ts'
                )
            }
        },
        plugins: [
            react(),
            isAnalyze &&
                visualizer({
                    open: true,
                    filename: 'dist/apps/customer/formal-blue/stats.html',
                    gzipSize: true,
                    brotliSize: true
                })
        ],
        build: {
            outDir: './dist',
            emptyOutDir: false,
            reportCompressedSize: true,
            chunkSizeWarningLimit: 600,
            commonjsOptions: {
                transformMixedEsModules: true
            },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (
                                id.includes('react') ||
                                id.includes('react-dom') ||
                                id.includes('react-router-dom')
                            ) {
                                return 'react-vendor';
                            }
                            if (
                                id.includes('@mui') ||
                                id.includes('@emotion')
                            ) {
                                return 'mui-vendor';
                            }
                            if (
                                id.includes('@tanstack') ||
                                id.includes('react-intl') ||
                                id.includes('react-hook-form') ||
                                id.includes('zod')
                            ) {
                                return 'utils-vendor';
                            }
                        }
                    }
                }
            }
        },
        test: {
            name: '@onboarding-course/formal-blue',
            watch: false,
            globals: true,
            environment: 'jsdom',
            include: [
                '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
            ],
            reporters: ['default'],
            coverage: {
                reportsDirectory: './test-output/vitest/coverage',
                provider: 'v8' as const
            }
        }
    };
});
