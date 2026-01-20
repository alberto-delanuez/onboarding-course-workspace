/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

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
        plugins: [
            react(),
            nxViteTsPaths(),
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
                        return undefined;
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
