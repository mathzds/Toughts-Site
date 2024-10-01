// Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./utils/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import ProtectedRoute from "./middleware/authGuard.app.tsx";

// Pages
import Root from "./pages/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import UserHome from "./pages/userHome/userHome.tsx";
import UserAccount from "./pages/userAccount/userAccount.tsx";
import UserThought from "./pages/userThought/userThought.tsx";

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
				element: (
					<ProtectedRoute>
						<UserHome />
					</ProtectedRoute>
				),
			},
			{
				path: "thoughts/:id",
				element: (
					<ProtectedRoute>
						<UserThought />
					</ProtectedRoute>
				),
			},
			{
				path: "user",
				element: (
					<ProtectedRoute>
						<UserAccount />
					</ProtectedRoute>
				),
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
