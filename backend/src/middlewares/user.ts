import type {Request, Response } from 'express';
import Blog from "@/models/User.ts";
import mongoose from 'mongoose';

const getUserDetails = async (req:Request, res: Response) =>{

};

const deleteUser = async (req:Request, res: Response) =>{
    return;
};

export 
{ 
    getUserDetails, 
    deleteUser 
};