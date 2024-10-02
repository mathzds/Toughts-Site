import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/middleware/authGuard";

import Root from "@/pages/Root.tsx";
import Home from "@/pages/home/Home";
import UserAccount from "@/pages/userAccount/userAccount";
import UserHome from "@/pages/userHome/userHome";
import UserThought from "@/pages/userThought/userThought";
import LoginOrRegister from "@/pages/loginOrRegister/LoginOrRegister";

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
				path: "account",
				element: <LoginOrRegister />,
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

export default router;
