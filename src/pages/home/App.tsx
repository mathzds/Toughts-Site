import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/login");
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen text-center">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
					Toughts - Ever and Forever
				</h2>
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
					People stopped telling jokes
				</h4>
				<Button onClick={handleNavigate}>Enter in this world!</Button>
			</div>
		</>
	);
}

export default Home;
