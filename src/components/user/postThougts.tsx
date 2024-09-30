import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {jwtDecode} from "jwt-decode";

interface Token {
	id: number;
	email: string;
}

export function DialogTest() {
	const [open, setOpen] = React.useState(false);
	const [thought, setThought] = React.useState("");

	const token = localStorage.getItem("token");
	let userId: Token | null = null;

	if (token) {
		try {
			userId = jwtDecode<Token>(token);
		} catch (error) {
			console.error("Failed to decode token:", error);
		}
	}

	const createThought = async (values: { username: string; id: number }) => {
		if (!userId) {
			toast({
				title: "Erro",
				description: "Usuário não autenticado.",
				variant: "destructive",
			});
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/toughts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: values.username,
					user: {
						id: userId.id,
					},
				}),
			});

			if (!response.ok) {
				toast({
					title: "Erro",
					description: "Ocorreu um erro.",
					variant: "destructive",
				});
				return;
			}

			toast({
				title: "Registro",
				description: "Registro bem-sucedido",
				variant: "success",
			});
			setOpen(false);
			setThought("");
		} catch (error) {
			console.error(error);
			toast({
				title: "Erro",
				description: "Ocorreu um erro.",
				variant: "destructive",
			});
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!thought.trim()) {
			toast({
				title: "Erro",
				description: "O pensamento não pode estar vazio.",
				variant: "destructive",
			});
			return;
		}
		if (userId) {
			createThought({ username: thought, id: userId.id });
		}
	};

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Post</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Post your thought</DrawerTitle>
				</DrawerHeader>
				<ProfileForm
					className="px-4"
					thought={thought}
					setThought={setThought}
					onSubmit={handleSubmit}
				/>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function ProfileForm({
	className,
	thought,
	setThought,
	onSubmit,
}: {
	className?: string;
	thought: string;
	setThought: React.Dispatch<React.SetStateAction<string>>;
	onSubmit: (e: React.FormEvent) => void;
}) {
	return (
		<form
			className={cn("grid items-start gap-4", className)}
			onSubmit={onSubmit}
		>
			<div className="grid gap-2">
				<Label htmlFor="text">Thought</Label>
				<Input
					id="text"
					value={thought}
					onChange={(e) => setThought(e.target.value)}
					placeholder="Write your thought here..."
				/>
			</div>
			<Button type="submit">Save changes</Button>
		</form>
	);
}
