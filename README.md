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
<iframe
  src="YOUR_AMPLIFY_URL_HERE"
  style="width: 100vw; height: 100vh; border: none;"
  title="ChatPage App"
  allowfullscreen
>
</iframe>
```

The `test.html` file in this repository provides a full-screen iframe implementation that you can use as a reference or for testing your deployment.

### Configuration

Before deploying or running the application, you need to configure the chat settings in `src/config.js`:

```javascript
export const chatConfig = {
  initialMessage: "Hello! How can I help you today?",
  color: "#10a37f", // ChatGPT green
  apiURL: "https://your-api-endpoint.com/messages",
  theme: "dark", // Choose "light" or "dark"
};
```

**Configuration Options:**

- **`initialMessage`**: Customize the greeting message that appears when the chat loads
- **`apiURL`**: **Required** - Set this to your chat API endpoint URL that handles message processing
- **`color`**: Customize the accent color for the chat interface (hex color code)
- **`theme`**: Choose between `"light"` or `"dark"` theme for the chat interface

### Local Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```
