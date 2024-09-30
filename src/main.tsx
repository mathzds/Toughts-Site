// Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./utils/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { jwtDecode } from "jwt-decode";

//Pages
import Root from "./pages/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/login/Login.tsx";
import UserHome from "./pages/userHome/userHome.tsx";

// Middleware
const ProtectedRoute = () => {
	const token = localStorage.getItem("token");

	if (!token) return <Navigate to="/login" />;

	const decoded = jwtDecode(token);
	return decoded ? <UserHome /> : <Navigate to="/login" />;
};

// Provider
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "home",
				element: <ProtectedRoute />,
			},
		],
	},
]);

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
