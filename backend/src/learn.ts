import mongoose from "mongoose";
const { Schema } = mongoose;


export default (
 async () =>{
      const schema = new Schema({ 
         name: String,
         age: Number
      })

      const Model = mongoose.model('Model', schema);

      // await Model.create([
      //    {
      //     name: "Wille Wonker",
      //     age: 34
      //    },
      //     {
      //     name: "Janson Frebber",
      //     age: 21
      //    },
      //     {
      //     name: "Nicolas Thredder",
      //     age: 31
      //    },
      // ])
      const query = Model.find({ age: {$lte:30}});
      console.log(query instanceof mongoose.Query)

      const query2 =  Model.findOne()
     
      // console.log(await query2)
        // query.then(res=>console.log(res))
        console.log(await query.exec())
      const hello =  Model.
      find({ name: "Wille Wonker"}).
      updateOne({}, {age: 85}) //basically this is equivalent to doing updateOne()

      const query3 = await Model.find({});
      // console.log(query3)

      const res =  Model.find( {age: { $lt:30} })
      
      const res2 = Model.countDocuments({ age: { $lt: 50}})

      const res3 = Model.deleteOne({age: { $lt: 30}});
      const res4 = Model.deleteMany({ age: {$gt: 80}})
      // res4.deletedCount //This will work when you have the await on the query to execute
     //DeleteOne or many does not return the deleted documents, if you want to do that then simply do  findOneAndDelete.
      // Model.insertMany([

      // ])

      //We have the distinct property which returns an array of distinct keys, you can pass a filter or simply just the key name 

      const res5 = Model.distinct('age', {age:{$gt:35}})
      console.log(await res5)


      console.log( await Model.estimatedDocumentCount()) // This does not take any parameters This is not always accurate but faster than countDocuments.


      let filter = { age: { $eq:  40}}
      filter = { age: { $gte: 30, $lt: 60 }}
      filter = { name: { $in: ["willie Wonker", "Jean Bercanu"]}}

      filter = { name: { $regex: /picard/i }}

      //All ofn what i just practiced are query selectors or operators for comparisons

      //Then yup, we have element type query operators, and what they do is that theeu filter documents based on the kind of values that they have stored.

      //We have the $exists and  $type 
      
      let doc = Model.findOne({ rank: { $exists:true}})
      //  console.log(await doc)

       //the type property helps you match cases that have the wrong type

       doc = Model.findOne({age:{ $type: 'number'}})

       doc = Model.findOne({ age: { $not:{ $type: 'number'}}})
      // console.log(await res3)
      
      //Array query selectors
      let s = new Schema({
         comments: [ { user: String, text:String }]
      })

      const BlogPost = mongoose.model('Post', s)

//       await BlogPost.create(
//         [
// { comments: [{ user: 'wriker', text: 'One, or both?' }] }
//         ]
//       )

      const doc1 = BlogPost.findOne({ 'comments.user':{ $all:['wriker', 'jpicard']}}) //This will return documents that contains both this values. //0 in my case.

      const comments = { $size: 2}
      const doc2 = BlogPost.find({comments})
    

      const $elemMatch = { user: 'jpicard' , comment: 'Make it so!'};

      let doc3 = await BlogPost.find({ comments: { $elemMatch }})
      console.log(await doc1)

      //Update Operators.
      const schema2 = new Schema({
         name: String,
         age: Number,
         rank: String
      });
      const Character = mongoose.model('Character', schema2);
      
      // await Character.deleteMany({})
      // console.log(await Character.find({}))

    
      const characters = Character.create({
        name: 'Willis Riker',
        age: 29
      })

      // console.log(await characters)

      // const update = await Character.findOneAndUpdate({name: 'Will Riker'}, {$set:{name: "Chai Roger"}})

      const update = Character.findOneAndUpdate({name: "Willis Riker"}, { $unset : { name: 1} }, { returnDocument: "after" })


      let doc8 = Character.findOneAndUpdate({name: 'Willis Riker'}, { $inc: { age: 1}}, {returnDocument: "after"});

      const schema3 = new Schema({ title: String, tags: [String] });
    const Post = mongoose.model('BlogPost', schema3);

      // const newPost = Post.create({
      //    title:  "Intro to mongoose",
      //    tags: ['Node.js']
      // })

      // console.log( await Post.find({}))
      const updateNewPost = Post.findOneAndUpdate({title: "Intro to mongoose"}, { $push: {tags: 'MongoDB'}}, {returnDocument: 'after'})

      // await newPost

      // console.log( await updateNewPost )

      // console.log(await doc8)

      // console.log(characters)
      // const _filter = { name: 'Willis Riker'};
      // let update = { rank: 'Commander'}
      // let opts  = { returnDocuments: 'after'}
      // let doc4 = await Character.findOneAndUpdate({name: 'Willis Riker'}, update, opts);
      // console.log(doc4)
      // update = { $set: { rank: 'Captain' }}
      // let docs = await Character.findOneAndUpdate(_filter, update, opts)
      // console.log(doc)
     
  }

)



// const personSchema =  new Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   age: Number,
//   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

// const storySchema = new Schema({
//   author: { type: Schema.Types.ObjectId, ref: 'Person' },
//   title: String,
//   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });

// const Story = mongoose.model('Story', storySchema);
// const Person = mongoose.model('Person', personSchema);


// export default (async ()=>{
// const author = new Person({
//     _id: new mongoose.Types.ObjectId(),
//     name: 'Ian Fleming',
//     age: 50
// })

// await author.save()
// const story1 = new Story({
//   title: 'Casino Royale',
//   author: author._id // assign the _id from the person
// });
// const story1 = new Story({
//   title: 'Casino Royale',
//   author: author._id // assign the _id from the person
// });

// await story1.save();

// // const story = await Story.findOne({
// //     title: 'Casino Royale'
// // }).populate('author').exec()
// // console.log(story)

// const story = await Story.findOne({title: 'Casino Royale'});
// story.author = author;

// const fan1 = await Person.create({ _id: new mongoose.Types.ObjectId(), name: 'Sean'});
// console.log(fan1)
// await Story.updateOne({title: 'Casino Royale'}, {$push:{fans:{ $each: [fan1._id] }}});

// const story3 = await Story.findOne({title: 'Casino Royale'}).populate({
//     path: 'fans',
//     match: { age: { $gte: 21}},
//     select: 'name -_id'
// }).populate('author').exec()
// console.log(story3)
// // console.log(story3.fans[0].name)

// // const fan2 = await Person.create({ _id: new mongoose.Types.ObjectId(), name: 'George'})
// // const fan3 =  await Person.create({ _id: new mongoose.Types.ObjectId(), name: 'Rihanna'})
// // story3.fans.push(fan2);

// // story3.fans.push({_id: new mongoose.Types.ObjectId(), name: 'Roger'})
// // story3.fans.push(fan3._id)


// // console.log(story3,story3?.author._id)
// // // console.log(story3)

// const userSchema = new Schema({
//     email: String
// });

// userSchema.virtual('domain').get(function(){
//      return this.email?.slice(this.email.indexOf('@') + 1)
// })

// const User = mongoose.model('User', userSchema);
// let doc= await User.create({ email: 'test@gmail.com' });
// doc.domain; // gmail.com
// doc.set({email: 'test@test.com', domain: 'foo'}); 
// //Momgoose ignores setting virtuals that don't have a setter

// doc.domain;



// })()

