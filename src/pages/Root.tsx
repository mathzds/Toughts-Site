import { NavigationMenuDemo } from "@/components/user/navigationMenu";
import { Outlet } from "react-router-dom";

function Root() {
	return (
		<>
			<div className="flex flex-col">
				<NavigationMenuDemo />
				<Outlet />
			</div>
		</>
	);
}

export default Root;
