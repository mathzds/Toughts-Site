import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./utils/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Home from "./pages/home/App.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
			<Toaster />
		</ThemeProvider>
	</StrictMode>,
);
