"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const formSchema = z.object({
	username: z.string().min(4, {
		message: "Username is required",
	}),
	email: z.string().email({
		message: "Email is invalid",
	}),
	password: z.string().min(4, {
		message: "Password is required",
	}),
});

export function UserProfile() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const token = localStorage.getItem("token");
		if (!token) {
			toast({
				title: "Erro",
				description: "Token não encontrado.",
				variant: "destructive",
			});
			return;
		}

		try {
			const { id } = jwtDecode<{ id: string }>(token); // Ensure to define the shape of your decoded token
			const response = await axios.put(
				`http://localhost:3000/users/${id}`,
				{
					username: values.username,
					email: values.email,
					senha: values.password, // Assuming 'senha' is the correct field name for password
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			if (response.status === 200) {
				toast({
					title: "Dados atualizados",
					description: "Dados atualizados com sucesso.",
					variant: "success",
				});
				reset(); // Clear the form fields after a successful submission
			} else {
				toast({
					title: "Erro",
					description: "Ocorreu um erro ao atualizar os dados.",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("Error during request:", error);
			toast({
				title: "Erro",
				description: "Ocorreu um erro ao processar a solicitação.",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="my-2">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Edit Profile</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Username
							</Label>
							<Input
								id="username"
								{...register("username")}
								className="col-span-3"
							/>
							{errors.username && (
								<p className="text-red-500">{errors.username.message}</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								{...register("email")}
								className="col-span-3"
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="password" className="text-right">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								{...register("password")}
								className="col-span-3"
							/>
							{errors.password && (
								<p className="text-red-500">{errors.password.message}</p>
							)}
						</div>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
