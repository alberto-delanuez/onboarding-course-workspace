import nx from '@nx/eslint-plugin';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: [
            '**/dist',
            '**/vite.config.*.timestamp*',
            '**/vitest.config.*.timestamp*'
        ]
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*']
                        },
                        {
                            sourceTag: 'scope:customer',
                            onlyDependOnLibsWithTags: [
                                'scope:common',
                                'scope:customer'
                            ]
                        },
                        {
                            sourceTag: 'type:ui',
                            onlyDependOnLibsWithTags: [
                                'type:domain',
                                'type:application',
                                'type:infrastructure',
                                'type:ui',
                                'type:common'
                            ]
                        },
                        {
                            sourceTag: 'type:infrastructure',
                            onlyDependOnLibsWithTags: [
                                'type:domain',
                                'type:application',
                                'type:common'
                            ]
                        },
                        {
                            sourceTag: 'type:application',
                            onlyDependOnLibsWithTags: [
                                'type:domain',
                                'type:common'
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.cts',
            '**/*.mts',
            '**/*.js',
            '**/*.jsx',
            '**/*.cjs',
            '**/*.mjs'
        ],
        // Override or add rules here
        rules: {}
    }
];
