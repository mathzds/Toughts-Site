"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

type AnimatedTabsProps = {
	containerClassName?: string;
	activeTabClassName?: string;
	tabClassName?: string;
};

export function NavigationMenuDemo({ containerClassName, activeTabClassName, tabClassName }: AnimatedTabsProps) {
	const [activeIdx, setActiveIdx] = useState(0);
	const tabs = [
		{ title: "Home", href: "/" },
		{ title: "Pensamentos", href: "/home" },
		{ title: "Conta", href: "/user" },
	];

	return (
		<div className={cn("relative flex flex-wrap items-center justify-center mt-2", containerClassName)}>
			{tabs.map(({ title, href }, index) => (
				<Link key={title} to={href} onClick={() => setActiveIdx(index)} className={cn("group relative z-[1] rounded-lg border border-transparent mx-[5px] px-4 py-2", tabClassName)}>
					{activeIdx === index && (
						<motion.div
							layoutId="clicked-button"
							transition={{ duration: 0.2 }}
							className={cn("absolute inset-0 rounded-lg bg-white", activeTabClassName)}
						/>
					)}
					<span className={cn("relative text-sm font-medium duration-100", activeIdx === index ? "text-black" : "text-white")}>
						{title}
					</span>
				</Link>
			))}
		</div>
	);
}
