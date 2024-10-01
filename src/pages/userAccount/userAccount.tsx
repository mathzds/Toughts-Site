import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import type UserInterface from "@/interfaces/user.interface";
import axios from "axios";

function UserAccount() {
	const [user, setUser] = useState<UserInterface | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const decodeToken = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const decoded = jwtDecode<UserInterface>(token);

					const response = await axios.get(
						`http://localhost:3000/users/${decoded.id}`,
					);
					setUser(response.data);
					console.log(response.data);
				} catch (error) {
					console.error("Token decoding failed:", error);
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		decodeToken();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<h1 className="text-2xl font-bold mt-4 mb-4">User Account</h1>
			{loading ? (
				<p>Loading...</p>
			) : user ? (
				<div>
					<p>Name: {user.name || user.username || "N/A"}</p>
					<p>Email: {user.email || "N/A"}</p>
					<p>Age: {user.id || "N/A"}</p>
				</div>
			) : (
				<p>No user data available.</p>
			)}
		</div>
	);
}

export default UserAccount;
