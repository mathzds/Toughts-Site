import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type ThoughtInterface from "@/interfaces/thought.interface";

function UserThought() {
	const { id } = useParams<{ id: string }>();
	const [thought, setThought] = useState<ThoughtInterface | null>(null);

	useEffect(() => {
		const fetchThought = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/toughts/${id}`);
				setThought(response.data);
			} catch (error) {
				console.error("Error fetching thought:", error);
			}
		};

		fetchThought();
	}, [id]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<h1 className="text-2xl font-bold mt-4 mb-4">User Thought</h1>
			{thought ? (
				<div className="border p-4 rounded shadow w-[80%] max-w-[600px]">
					<h2 className="text-lg font-semibold">{thought.title}</h2>
					<p className="text-sm text-gray-500">
						By: {thought.user.name}#{thought.user.id}
					</p>
				</div>
			) : (
				<p>Loading thought...</p>
			)}
		</div>
	);
}

export default UserThought;
