namespace Express {
	export interface Request {
    filtered: {
			first_name?: string;
			last_name?: string;
			password?: string;
		};
		userId: string;
	}
}
