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
import Home from "./pages/home/App.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import UserHome from "./pages/userHome/userHome.tsx";
import { jwtDecode } from "jwt-decode";
import { NavigationMenuDemo } from "./components/user/navigationMenu.tsx";

const ProtectedRoute = () => {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/login" />;
	}

	try {
		const decoded = jwtDecode(token);
		if (decoded) return <UserHome />;

		return <Navigate to="/login" />;
	} catch (error) {
		return <Navigate to="/login" />;
	}
};

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
	{
		path: "/home",
		element: <ProtectedRoute />,
	},
]);

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<NavigationMenuDemo />
				<RouterProvider router={router} />
				<Toaster />
			</ThemeProvider>
		</StrictMode>,
	);
}
