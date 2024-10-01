"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	username: z.string().min(1, {
		message: "Username is required",
	}),
	email: z.string().email({
		message: "Email is invalid",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

function Register() {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await fetch("http://localhost:3000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: values.username,
					email: values.email,
					senha: values.password,
				}),
			});

			if (!response.ok) {
				toast({
					title: "Erro",
					description: "Ocorreu um erro.",
					variant: "destructive",
				});
			}

			const data = await response.json();
			console.log(data);
			toast({
				title: "Registro",
				description: "Registro bem-sucedido",
				variant: "success",
			});
		} catch (error) {
			console.error(error);
			toast({
				title: "Erro",
				description: "Ocorreu um erro.",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen w-full">
			<div className="border border-gray-300 p-8 rounded-lg shadow-md w-96">
				<h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-left">Username</FormLabel>
									<FormControl>
										<Input placeholder="Your username" {...field} />
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="you@example.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full text-center" type="submit">
							Register
						</Button>
					</form>
				</Form>
				<button
					className="flex align-center  text-sm font-bold mt-4"
					onClick={() => navigate("/login")}
					type="button"
				>
					Have an account? Login
				</button>
			</div>
		</div>
	);
}

export default Register;
