# TODO

-   Añadir flujo de registro completo en UI (formularios, validaciones, navegación) y conectar con RegisterUseCase
-   Implementar soporte de refresh token (caso de uso, endpoint en repositorio, almacenamiento seguro, refresco silencioso, revocación y logout)
-   Separar translations.json en en.json y es.json, carga por locale y organización de mensajes por dominio
-   Crear módulo de accesibilidad (WCAG 2.1 AA): auditoría de aria, navegación por teclado, gestión de foco, skip links, contraste de color, eslint-plugin-jsx-a11y
-   Mejoras de rendimiento (Módulo 8):
    -   Code splitting en páginas y widgets pesados
    -   Memoización y useMemo/useCallback en componentes con cálculos costosos
    -   Prefetch de datos críticos tras login (perfil, dashboard)
    -   Ajuste de React Query (staleTime/gcTime) y evitar renders innecesarios en BaseLayout y widgets
-   Seguridad:

    -   Mover tokens a cookies httpOnly (si el backend lo permite) y proteger contra XSS/CSRF
    -   Implementar rotación y revocación de tokens, cierre de sesión robusto

-   Observabilidad:
    -   Sistema de logging cliente con niveles y redacción de datos sensibles
    -   Trazas/de métricas básicas para operaciones clave (login, fetch perfil)
-   React Query:
    -   Manejo de errores global con toasts/alerts consistentes
-   UX/UI:
    -   Skeletons/placeholder en cargas de perfil y dashboard
    -   Sistema de notificaciones (toasts) para feedback inmediato
    -   Estados vacíos consistentes en widgets
-   Networking:
    -   Retries con backoff exponencial y cancelación (AbortController) en repos HTTP
    -   Manejo de timeouts y errores específicos (401/403/5xx) con estrategias diferenciadas
-   Temas:
    -   Revisar contraste y paleta (tertiary) para AA
    -   Unificar tokens de diseño y documentar variantes
-   Dev Experience:
    -   Scripts de typecheck y lint estandarizados y ejecutables desde raíz
    -   Resolver problemas de tsconfig (rootDir y references) entre libs
    -   Pre-commit con verificación de tipos/tests/lint
-   Seguridad de social login:
    -   Integración real con proveedores (OAuth/OIDC), manejo de estado y validación de tokens en backend
-   Gestión de errores:
    -   ErrorBoundaries por ruta y mensajes más amigables
    -   Registro de errores controlado y canal único de presentación al usuario
