/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../../../node_modules/.vite/libs/customer/common/utils',
    resolve: {
        alias: {
            '@onboarding-course/customer-common-di': path.resolve(
                __dirname,
                '../../common/di/src/index.ts'
            ),
            '@onboarding-course/customer-common-ui': path.resolve(
                __dirname,
                '../../common/ui/src/index.ts'
            ),
            '@onboarding-course/customer-auth-application': path.resolve(
                __dirname,
                '../../auth/application/src/index.ts'
            ),
            '@onboarding-course/customer-profile-application': path.resolve(
                __dirname,
                '../../profile/application/src/index.ts'
            ),
            '@onboarding-course/customer-auth-infrastructure': path.resolve(
                __dirname,
                '../../auth/infrastructure/src/index.ts'
            ),
            '@onboarding-course/customer-profile-infrastructure': path.resolve(
                __dirname,
                '../../profile/infrastructure/src/index.ts'
            ),

        }
    },
    plugins: [
        dts({
            entryRoot: 'src',
            tsconfigPath: path.join(__dirname, 'tsconfig.lib.json')
        })
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
        outDir: './dist',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true
        },
        lib: {
            // Could also be a dictionary or array of multiple entry points.
            entry: 'src/index.ts',
            name: '@onboarding-course/utils',
            fileName: 'index',
            // Change this to the formats you want to support.
            // Don't forget to update your package.json as well.
            formats: ['es' as const]
        },
        rollupOptions: {
            // External packages that should not be bundled into your library.
            external: []
        }
    },
    test: {
        name: '@onboarding-course/utils',
        watch: false,
        globals: true,
        environment: 'node',
        include: [
            '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
        ],
        reporters: ['default'],
        coverage: {
            reportsDirectory: './test-output/vitest/coverage',
            provider: 'v8' as const
        }
    }
}));
