import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

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
			const response = await axios.post(
				"http://localhost:3000/users/login/me",
				{
					email: values.email,
					senha: values.password,
				},
			);
			console.log(response);
			if (response) {
				localStorage.setItem("token", response.data);
				toast({
					title: "Login",
					description: "Login bem-sucedido",
					variant: "success",
				});
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
			const response = await axios.post("http://localhost:3000/users", {
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
						<CardDescription>Entre na sua conta</CardDescription>
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
					<CardFooter>
						<Button variant="outline">Esqueceu a senha?</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="register">
				<Card>
					<CardHeader>
						<CardTitle>Registrar</CardTitle>
						<CardDescription>Crie uma nova conta</CardDescription>
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
					<CardFooter>
						<Button variant="outline">Já tem uma conta?</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
