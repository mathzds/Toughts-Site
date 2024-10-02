import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type ProtectedRouteProps from "@/interfaces/protected.interface";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (!token) {
			navigate("/account");
		} else {
			try {
				const decoded = jwtDecode(token);
				if (!decoded) {
					navigate("/account");
				}
			} catch (error) {
				console.error("Token decoding failed:", error);
				navigate("/account");
			}
		}
	}, [token, navigate]);

	return token ? <>{children}</> : null;
};

export default ProtectedRoute;
