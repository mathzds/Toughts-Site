import type ThoughtInterface from "@/interfaces/thought.interface";
import type Response from "@/interfaces/response.interface";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function UserThought() {
	const { id } = useParams<{ id: string }>();
	const [thought, setThought] = useState<ThoughtInterface | null>(null);
	const [responses, setResponses] = useState<Response[]>([]);
	const [replyContent, setReplyContent] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchThought = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await axios.get(`http://localhost:3000/toughts/${id}`);
				setThought(response.data);
			} catch (error) {
				setError("Error fetching thought.");
				console.error("Error fetching thought:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchThought();
	}, [id]);

	useEffect(() => {
		const fetchResponses = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await axios.get(
					`http://localhost:3000/toughts/${id}/responses`,
				);
				setResponses(response.data);
			} catch (error) {
				setError("Error fetching responses.");
				console.error("Error fetching responses:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchResponses();
	}, [id]);

	interface Token {
		id: number;
		email: string;
	}

	const token = localStorage.getItem("token");
	let decodedUserId: number | null = null;

	if (token) {
		try {
			const decodedToken = jwtDecode<Token>(token);
			decodedUserId = decodedToken.id;
		} catch (error) {
			console.error("Failed to decode token:", error);
		}
	}

	const reply = async () => {
		if (!replyContent || !decodedUserId) return;

		try {
			await axios.post(`http://localhost:3000/toughts/${id}/response`, {
				userId: decodedUserId,
				content: replyContent,
			});
			setReplyContent("");
			const response = await axios.get(
				`http://localhost:3000/toughts/${id}/responses`,
			);
			setResponses(response.data);
		} catch (error) {
			setError("Error posting reply.");
			console.error("Error posting reply:", error);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<h1 className="text-2xl font-bold mt-4 mb-4">User Thought</h1>
			{thought ? (
				<div className="border p-4 rounded shadow w-[80%] max-w-[600px]">
					<h2 className="text-lg font-semibold">{thought.title}</h2>
					<p className="text-sm text-gray-500">
						By: {thought.user.username}#{thought.user.id}
					</p>
				</div>
			) : (
				<p>Loading thought...</p>
			)}

			<div className="mt-6 w-[80%] max-w-[600px]">
				<h3 className="text-lg font-semibold">Responses</h3>
				{responses.length > 0 ? (
					responses.map((response) => (
						<div key={response.id} className="border p-2 rounded mt-2">
							<ul>{response.content}</ul>
							<p className="text-sm text-gray-500">
								By: {response.user.username}#{response.user.id}
							</p>
						</div>
					))
				) : (
					<p>No responses yet.</p>
				)}
			</div>

			<div className="mt-4 w-[80%] max-w-[600px]">
				<Label htmlFor="message" className="flex align-left mb-2">
					Your reply:
				</Label>
				<Textarea
					className="border p-2 rounded w-full"
					rows={4}
					value={replyContent}
					onChange={(e) => setReplyContent(e.target.value)}
					placeholder="Write your reply..."
				/>
				<Button
					onClick={reply}
					className="mt-4 py-1 px-4 rounded"
					type="button"
				>
					Reply
				</Button>
			</div>
		</div>
	);
}

export default UserThought;
