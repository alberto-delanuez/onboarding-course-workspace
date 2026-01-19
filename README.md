# eCare Onboarding Project

This repository contains the source code for the eCare Onboarding Course project. It is a multi-brand application (Formal Blue and Mad Purple) built within an NX monorepo, demonstrating advanced architecture patterns and best practices.

## 🚀 Features

-   **Multi-brand Support**: Two distinct applications (`formal-blue` and `mad-purple`) sharing core logic but maintaining unique identities.
-   **Hexagonal Architecture**: Core domains (`auth`, `profile`) are structured using Ports and Adapters to isolate business logic.
-   **Dependency Injection**: Custom DI container to manage dependencies and facilitate testing.
-   **Modern Stack**: React, TypeScript, Vite, React Query, React Hook Form.
-   **Infrastructure as Code**: Dockerized applications and Helm charts for Kubernetes deployment.

## 📋 Prerequisites

Ensure you have the following installed:

-   **Node.js** (v18 or higher)
-   **pnpm** (Package manager)
-   **Docker** (For containerization)
-   **Kubernetes CLI (kubectl)** & **Helm** (For deployment)

## 🛠️ Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd onboarding-course-workspace
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

## 🏃‍♂️ Running the Applications

You can start the development servers for each brand:

### Formal Blue

```bash
nx serve formal-blue
```

Access at: `http://localhost:4200`

### Mad Purple

```bash
nx serve mad-purple
```

Access at: `http://localhost:4201`

## 🔐 Authentication (Mocked Flows)

-   Social Login: The social login flow is mocked. Clicking “Login with social networks” will automatically authenticate without an external provider.
-   OTP Login: The OTP flow is mocked. Enter the code 123456 to authenticate successfully.
-   Notes:
    -   Formal Blue enables social login in addition to standard login.
    -   Mad Purple uses OTP-only; provide 123456 when prompted.
    -   Standard Login: The backend (DummyJSON) expects a username instead of an email. The app automatically converts the email to username (parte antes de @) para el login estándar.

## 🧪 Running Tests

Run unit tests for applications or libraries:

```bash
# Run tests for a specific app
nx test formal-blue

# Run tests for a specific library
nx test customer-auth-domain

# Run all tests
nx run-many -t test
```

## 🏗️ Build and Deployment

### Build Application

```bash
nx build formal-blue
```

### Docker Build

To build the Docker image for an application:

```bash
nx docker:build formal-blue
```

### Helm Deployment

To deploy to a Kubernetes cluster using Helm:

```bash
# Update dependencies if needed
helm dependency update apps/customer/formal-blue/charts/formal-blue

# Install or Upgrade release
helm upgrade --install formal-blue ./apps/customer/formal-blue/charts/formal-blue --set image.tag=<version>
```

## 📂 Project Structure

```
├── apps/
│   ├── customer/
│   │   ├── formal-blue/   # Brand A Application
│   │   └── mad-purple/    # Brand B Application
├── libs/
│   ├── customer/
│   │   ├── auth/          # Auth Domain (Hexagonal)
│   │   │   ├── application/
│   │   │   ├── domain/
│   │   │   ├── infrastructure/
│   │   │   └── ui/
│   │   ├── profile/       # Profile Domain (Hexagonal)
│   │   └── common/        # Shared Utilities & UI
```
