import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Config from "@/config/config.app";

import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
	email: z.string().email({ message: "Email inválido" }),
	password: z.string().min(1, { message: "Senha é obrigatória" }),
});

const registerSchema = z.object({
	username: z.string().min(1, { message: "Nome de usuário é obrigatório" }),
	email: z.string().email({ message: "Email inválido" }),
	password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export function CaraEuNaoSei() {
	const navigate = useNavigate();
	const loginForm = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const registerForm = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const handleLogin = async (values: z.infer<typeof loginSchema>) => {
		try {
			const response = await axios.post(`${Config.apiUrl}/users/login/me`, {
				email: values.email,
				senha: values.password,
			});
			if (response) {
				localStorage.setItem("token", response.data);
				toast({
					title: "Login",
					description: "Login bem-sucedido",
					variant: "success",
				});
				navigate("/home");
			}
		} catch (error) {
			console.error("Erro durante o login:", error);
			toast({
				title: "Erro",
				description: "Ocorreu um erro durante o login.",
				variant: "destructive",
			});
		}
	};

	const handleRegister = async (values: z.infer<typeof registerSchema>) => {
		try {
			const response = await axios.post(`${Config.apiUrl}/users`, {
				username: values.username,
				email: values.email,
				senha: values.password,
			});
			if (response) {
				toast({
					title: "Registro",
					description: "Registro bem-sucedido",
					variant: "success",
				});
			}
		} catch (error) {
			console.error("Erro durante o registro:", error);
			toast({
				title: "Erro",
				description: "Ocorreu um erro durante o registro.",
				variant: "destructive",
			});
		}
	};

	return (
		<Tabs defaultValue="login" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="register">Registrar</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<Card>
					<CardHeader>
						<CardTitle>Login</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<form
							onSubmit={loginForm.handleSubmit(handleLogin)}
							className="space-y-4"
						>
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									{...loginForm.register("email")}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type="password"
									{...loginForm.register("password")}
								/>
							</div>
							<Button className="w-full text-center" type="submit">
								Login
							</Button>
						</form>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="register">
				<Card>
					<CardHeader>
						<CardTitle>Registrar</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<form
							onSubmit={registerForm.handleSubmit(handleRegister)}
							className="space-y-4"
						>
							<div className="space-y-1">
								<Label htmlFor="username">Nome de Usuário</Label>
								<Input id="username" {...registerForm.register("username")} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									{...registerForm.register("email")}
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type="password"
									{...registerForm.register("password")}
								/>
							</div>
							<Button className="w-full text-center" type="submit">
								Registrar
							</Button>
						</form>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
