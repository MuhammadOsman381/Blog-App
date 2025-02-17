import jwt from "jsonwebtoken";

interface User {
    name: string;
    email: string;
    password: string;
    userId: number;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const TokenGenerator = (user: User) => {
    const token = jwt.sign({ _id: user.userId }, process.env.JWT_SECRET as string)
    return token
}

