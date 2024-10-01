// Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./utils/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import router from "./routes/handlerRoutes.tsx";

// Structure
const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<RouterProvider router={router} />
				<Toaster />
			</ThemeProvider>
		</StrictMode>,
	);
}
