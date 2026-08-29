import type { Response, Request } from "express";
import bcrypt from "bcryptjs";
import type { CreateUserRequest } from "@/interfaces/user.interface.ts";
import User from "@/models/User.ts";
import jwt from "jsonwebtoken";


interface ResBody<T = any> {
    status: "error" | "success",
    message: string,
    data?: T
}

type Send<T = Response> = (body?: ResBody) => T;

interface CustomResponse extends Response {
    json: Send<this>;
}

const login = async (req: Request<{}, {}, CreateUserRequest>, res: Response<ResBody>) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Incorrect Credentials Provided."
            });
        };

        if (!user.password) {
            return res.status(400).json({
                status: "error",
                message: "Incorrect Credentials Provided."
            });
        }
      
        const confirmPassword = await bcrypt.compare(password, user.password);
        if (!confirmPassword) {
            return res.status(400).json({
                status: "error",
                message: "Incorrect Credentials Provided."
            });
        }
        //Trying Principle of least of exposure 😹
        {
            const expiresAt = Date.now() + (30 * 60 * 60);
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { 'expiresIn': expiresAt });
            return res.status(201).json({
                status: 'success',
                message: 'Guest Successfully Created.',
                data: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    access_token: token,
                }
            });
        }
    } catch {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })

    }
};

const signup = async (req: Request<{}, {}, CreateUserRequest>, res: CustomResponse) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            })
        }
        const hashedPassword = await bcrypt.hash(password, process.env.SALTROUNDS!);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: "User Already exists!"
            })
        }

        const user = await User.create({
            email,
            fullName,
            password: hashedPassword
        });

        return res.status(201).json({
            status: "success",
            message: "User Created Successfully.",
            data: {
                id: user.id,
                fullName: user.fullName
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
};

const createGuest = async (req: Request, res: CustomResponse) => {
    try {
        /**
         * 1. Create the user, with the fullname set to "Guest" and an expiration time set for 30 days
         * 2. Return the created user with the id.
         * 3. I don't have to check for a duplicate user.
         * 4. I have to create a jsonwebtoken 
         */
        const expiresAt = Date.now() + (30 * 60 * 60);
        const user = await User.create({
            fullName: 'Guest',
            expiresAt
        });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { 'expiresIn': expiresAt });
        return res.status(201).json({
            status: 'success',
            message: 'Guest Successfully Created.',
            data: {
                acess_token: token
            }
        });
    } catch {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })

    }
}

export {
    login,
    signup,
    createGuest
}