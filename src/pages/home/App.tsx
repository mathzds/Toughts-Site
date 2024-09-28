import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen text-center">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
					Toughts - Ever and Forever
				</h2>
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
					People stopped telling jokes
				</h4>
				<div className="flex flex-rows gap-2">
					<Button onClick={() => navigate("/register")}>
						Register in this woldr!
					</Button>
					<Button onClick={() => navigate("/login")}>
						Login on your mind!
					</Button>
				</div>
			</div>
		</>
	);
}

export default Home;
