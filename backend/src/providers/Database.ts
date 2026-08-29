import mongoose from 'mongoose';


export default async function main(){
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database connected to successfully 🎉");
    }catch(err){
        console.log("Something went wrong: ", err);
    }
}