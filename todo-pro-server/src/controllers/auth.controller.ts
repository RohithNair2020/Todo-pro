import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Handles the Login function
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Checking if all the values are valid
    if (!username || !password)
        return res.status(400).json({ message: "Invalid Credentials" });

    // Finding the user using username
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user)
        return res.status(400).json({ message: "Username does not exist" });

    // Verifying password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: "Invalid Password" });

    // Creating auth token
    const JWT_SECRET = process.env.JWT_SECRET || "PRO_TODO";
    const token = jwt.sign({ username, id: user.id }, JWT_SECRET, {
        expiresIn: "1h",
    });

    // Setting the token as cookie
    return res.status(200).json({ message: "Login successful", user, token });
};

// Handles the Register function
export const register = async (req: Request, res: Response) => {
    const { username, password, passwordCopy } = req.body;

    // Checking if all values are valid
    if (!username || !password || !passwordCopy)
        return res.status(400).json({ message: "Invalid payload" });

    // Checking if passwords do not match
    if (password !== passwordCopy)
        return res.status(400).json({ message: "Passwords do not match" });

    // Checking if username already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (existingUser)
        return res.status(409).json({ message: "Username already exists" });

    // Hashing password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
        data: { username, password: hashedPassword },
    });

    // Returning the created user
    return res
        .status(201)
        .json({ message: "Account created successfully", user: createUser });
};
