"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const formSchema = z.object({
	email: z.string().email({
		message: "Email is invalid",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

function Register() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post(
				"http://localhost:3000/users/login/me",
				{
					email: values.email,
					senha: values.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const data = response.data;
			console.log("Response data:", data);

			localStorage.setItem("token", data);

			toast({
				title: "Login",
				description: "Login bem-sucedido",
				variant: "success",
			});
		} catch (error) {
			console.error("Error during request:", error);
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
				<h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-left">Email</FormLabel>
									<FormControl>
										<Input placeholder="Your email" {...field} />
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
										<Input type="password" placeholder="secret" {...field} />
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
			</div>
		</div>
	);
}

export default Register;
