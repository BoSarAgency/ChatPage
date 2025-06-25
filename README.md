# ChatPage - React + Vite

This project is a React application built with Vite, designed to be deployed as an embeddable iframe component.

## Usage

This application is designed to be deployed and embedded as an iframe in other applications. Follow these steps:

### 1. Deploy to AWS Amplify

1. Connect your repository to AWS Amplify
2. Configure the build settings (Amplify should auto-detect Vite configuration)
3. Deploy the application
4. Copy the deployment URL from Amplify

### 2. Embed as iframe

Once deployed, you can embed the application using an iframe. See `test.html` for a complete example:

```html
<iframe src="YOUR_AMPLIFY_URL_HERE"
        style="width: 100vw; height: 100vh; border: none;"
        title="ChatPage App"
        allowfullscreen>
</iframe>
```

The `test.html` file in this repository provides a full-screen iframe implementation that you can use as a reference or for testing your deployment.

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Local Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
