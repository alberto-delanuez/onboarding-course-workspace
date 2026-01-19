# Technical Decisions

This document outlines the key technical decisions and architectural patterns adopted in the eCare Onboarding project.

## 1. Monorepo Structure (NX)

## Build Resolution Issues in Nx Monorepo with React Vite + TypeScript

### Problem Statement

After setting up an Nx monorepo with React, Vite, and TypeScript, build processes are failing due to module resolution issues between workspace libraries. The errors typically manifest as:

```
Error: Cannot find module '@workspace/shared'
Error: Failed to resolve import "@workspace/utils"
Module not found: Error: Can't resolve '@workspace/components'
```

### Root Cause Analysis

The issue stems from Vite's inability to automatically resolve TypeScript path mappings defined in `tsconfig.json` files. Nx configures path aliases in TypeScript configuration, but Vite doesn't automatically inherit these during build time.

### Solution 1: Manual Vite Alias Configuration

Add explicit `resolve.alias` configuration in `vite.config.ts`:

```typescript
// apps/my-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Manual aliases for each workspace library
            '@workspace/shared': join(__dirname, '../../libs/shared/src'),
            '@workspace/utils': join(__dirname, '../../libs/utils/src'),
            '@workspace/components': join(__dirname, '../../libs/components/src')
            // Add all internal dependencies here
        }
    }
});
```

**Pros:**

-   Explicit control over each alias
-   Clear visibility of all workspace dependencies
-   Works with any build tool, not Vite-specific

**Cons:**

-   Requires manual updates when adding new libraries
-   Prone to human error in path definitions
-   Breaks DRY principle (duplicates tsconfig paths)

### Solution 2: Using Nx Vite Plugin (`nxViteTsPaths`)

Utilize the official Nx plugin that automatically resolves TypeScript paths:

```typescript
// apps/my-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
    plugins: [
        react(),
        nxViteTsPaths() // Automatically reads tsconfig paths
    ]
});
```

**Prerequisites:**

```bash
npm install --save-dev @nx/vite
# or
yarn add -D @nx/vite
```

**How it works:**

1. The plugin reads `tsconfig.json` (and extended configs) from your project
2. Extracts all paths from `compilerOptions.paths`
3. Automatically configures Vite's resolve.alias with proper absolute paths
4. Handles all workspace library dependencies automatically

**Pros:**

-   Automatic path resolution - no manual configuration needed
-   Always stays in sync with TypeScript configuration
-   Supports all workspace libraries automatically
-   Maintained by Nx team

**Cons:**

-   Adds dependency on @nx/vite
-   Magic behavior (less explicit configuration)

## Recommended Approach

### Primary Recommendation: Use `nxViteTsPaths`

For most Nx monorepos, the `nxViteTsPaths` plugin is the recommended solution because:

1. **Consistency**: Ensures Vite and TypeScript use the same path resolution
2. **Maintainability**: No need to update vite.config.ts when adding new libraries
3. **Scalability**: Automatically works with all workspace projects
4. **Nx Integration**: Part of the official Nx ecosystem

### Implementation Steps:

1. **Update vite.config.ts:**

```typescript
// apps/my-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
    plugins: [react(), nxViteTsPaths()],

    // Optional: Customize build settings
    build: {
        outDir: '../../dist/apps/my-app',
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true
        }
    }
});
```

2. **Verify TypeScript configuration:**
   Ensure your project's `tsconfig.json` extends the base configuration:

```json
// apps/my-app/tsconfig.json
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "jsx": "react-jsx"
    },
    "include": ["src/**/*"]
}
```

3. **Check base TypeScript configuration:**

```json
// tsconfig.base.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@workspace/*": ["libs/*/src/index.ts"]
        }
    }
}
```

### Verification Steps

1. **Check path resolution:**

```bash
npx nx build my-app
# Should complete without module resolution errors
```

2. **Verify development server:**

```bash
npx nx serve my-app
# Should start without import errors
```

3. **Inspect generated config:**

```bash
# Add debug logging to see resolved aliases
export default defineConfig({
  plugins: [react(), nxViteTsPaths()],
  define: {
    __VITE_ALIASES__: JSON.stringify(require('vite').resolve.alias)
  }
});
```

### Alternative for Non-Nx Projects

If you're not using Nx's full capabilities, consider `vite-tsconfig-paths`:

```bash
npm install --save-dev vite-tsconfig-paths
```

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()]
});
```

## Decision Record

| Decision                            | Date       | Status   | Rationale                                                                                                                |
| ----------------------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Use `nxViteTsPaths` for Vite builds | 2024-01-15 | Approved | Provides automatic TypeScript path resolution, reduces maintenance overhead, and integrates seamlessly with Nx workspace |

## 2. Hexagonal Architecture (Ports & Adapters)

**Decision:** Implement Hexagonal Architecture for core domains (`auth`, `profile`).

**Structure:**

-   **Domain:** Pure business logic, Entities, and Repository Interfaces (Ports). No external dependencies (Framework agnostic).
-   **Application:** Use Cases that orchestrate domain logic. Depends only on Domain.
-   **Infrastructure:** Implementations of repositories (Adapters), API clients, and third-party integrations. Depends on Domain.
-   **UI:** React components and hooks. Consumes Application layer.

**Rationale:**

-   **Testability:** Domain logic can be tested in isolation with unit tests using mock adapters.
-   **Maintainability:** Decouples business rules from UI frameworks and external APIs.
-   **Flexibility:** Allows swapping infrastructure implementations (e.g., HTTP vs. LocalStorage) without changing business logic.

## 5. Form Handling

**Decision:** `react-hook-form` paired with `zod`.

**Rationale:**

-   **Performance:** Uncontrolled components reduce re-renders compared to controlled state.
-   **Validation:** `zod` was chosen instead of using custom rules objects. It provides a powerful, schema-based validation that can be inferred as TypeScript types, ensuring type safety from form to API and avoiding the complexity of maintaining custom validation logic.

## 6. Multi-Brand Theming

**Decision:** Material UI (MUI) with Theme Augmentation.

**Rationale:**

-   Allows defining a base theme and extending it for `formal-blue` and `mad-purple` with specific color palettes and typography.
-   Consistent component API across brands while maintaining distinct visual identities.

## 7. Infrastructure & Deployment

**Decision:** Docker + Helm + Kubernetes.

-   **Docker:** Multi-stage builds to create lightweight production images (serving static files via Nginx).
-   **Helm:** Manages Kubernetes manifests as a package, allowing parameterization (values.yaml) for different environments and dynamic image tagging.
-   **Dynamic Versioning:** `version.json` generated at build time to track Git commit hashes and ensure traceability.

## 8. API Integration & Workarounds

**Decision:** Use `https://dummyjson.com/` as the backend API for demonstration purposes.

**Workarounds:**

-   **Authentication:** The external API expects a `username` instead of an `email` for login. A utility function `parseEmailToUsername` was implemented in the repository to adapt the input.
-   **OTP & Mad Purple:** Since `mad-purple` relies solely on OTP login (which is not supported by DummyJSON), we simulate the process by hardcoding a valid JWT token in `libs/customer/auth/infrastructure/src/lib/repositories/auth.http.repository.ts` (method `loginWithOtp`). This allows the application to proceed to authenticated routes (like `/profile`) by verifying a real token against the DummyJSON `/auth/me` endpoint.
