import type ThoughtInterface from "@/interfaces/thought.interface";
import { DialogTest } from "@/components/user/postThougts";
import { Button } from "@/components/ui/button";

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "@/config/config.app";

function UserHome() {
	const navigate = useNavigate();
	const [thoughts, setThoughts] = useState<ThoughtInterface[]>([]);

	const handlerThoughts = useCallback(async () => {
		try {
			const response = await axios.get(`${Config.apiUrl}/toughts`);
			setThoughts(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		handlerThoughts();
	}, [handlerThoughts]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<h1 className="text-2xl font-bold mt-4 mb-4">User Home</h1>
			<DialogTest />
			<div className="w-[80%] max-w-[1200px] mt-2 mb-6">
				{thoughts.length > 0 ? (
					<ul className="space-y-4 w-full">
						{thoughts.map((thought) => (
							<li
								key={thought.id}
								className="border p-4 rounded shadow w-full flex justify-between items-center"
							>
								<div>
									<h2 className="text-lg text-left font-semibold">
										{thought.title}
									</h2>
									<p className="text-sm text-left text-gray-500">
										By: {thought.user.name}#{thought.user.id}
									</p>
								</div>
								<Button onClick={() => navigate(`/thoughts/${thought.id}`)}>
									Reply
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p>No thoughts available.</p>
				)}
			</div>
		</div>
	);
}

export default UserHome;
