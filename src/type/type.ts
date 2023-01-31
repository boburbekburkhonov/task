namespace Express {
	export interface Request {
    filtered: {
			firstName?: string;
			lastName?: string;
			password?: string;
		};
		userId: string;
	}
}
