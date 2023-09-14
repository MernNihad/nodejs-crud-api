import express from "express";
import mongoose from "mongoose";


const app = express();

let PORT = 3002;

app.use(express.json());


app.get('/api/users',async(req, res) => {
    let result = await mongoose.connection.collection("users").find().toArray();
    res.json(result)
})
app.post('/api/users', (req, res) => {
    const  { email,password } = req.body;
    mongoose.connection.collection("users").insertOne({email,password})
    res.json('created')
})
app.put('/api/user/:id',(req,res)=>{
    console.log(req.params.id)
    console.log(req.body);
    const { id } = req.params;
    let result_id = new mongoose.Types.ObjectId(id)
    mongoose.connection.collection("users").updateOne({_id:result_id},{
        $set:{
            email:req.body.email,
            password:req.body.password
        }
    })

    res.json("api for update")
})
app.delete('/api/user/:id',(req,res)=>{
    console.log(req.params.id)
    let result_id = new mongoose.Types.ObjectId(req.params.id)
    mongoose.connection.collection("users").deleteOne({_id:result_id})
    res.json("deleted")

})


app.get('/sumof10_20', (req, res) => {
    let sum = 10 + 20;
    res.json(sum);
})


// http://localhost:3000/api/users - GET 
// http://localhost:3000/demo - GET  - demo

// starting server

const connect_mongodb = () => {
    mongoose.connect('mongodb://localhost:27017/socialmedia').then(() => {
        console.log('mongodb connected');
    }).catch((err) => console.log(err.message));

}


app.listen(PORT, () => {
    connect_mongodb();
    console.log(`App listening on port ${PORT}`)
})

