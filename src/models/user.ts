import Book from "./book";

type User = {
    Id: number;
	UserName: string;
	Email: string;
	Password: string;
	Avatar: string;
	Role: number;
	CreatedAt: Date;
	UpdatedAt: Date;
	DeletedAt: Date;
	UserBooks: Book[];
}

export default User;
