import express, { type Express } from 'express';
import Database from "@/providers/Database.ts";
import cors from 'cors';
import authRoutes  from "@/routes/auth.ts";
import userRoutes from "@/routes/user.ts";
import mapRoutes from "@/routes/map.ts";
import learn from "@/learn.ts";

const port = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database setup
(async()=>{
await Database();
learn()
})()

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/map', mapRoutes);


//Confirm health
app.get('/test', function(req, res) {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});