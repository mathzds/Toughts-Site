import type UserInterface from "./user.interface";

export default interface ThoughtInterface {
	id: number;
	title: string;
	user: UserInterface; 
}
