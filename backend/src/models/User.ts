import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    email: { 
        type: String,
        unique: true,
        validate:{
            validator: function(v:string){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: (props:{value:string}) => `${props.value} is not a valid email address!`
        },
    },
    password: String,
    expiresAt: { type: Date }
}, {
    timestamp: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

userSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

//Check this one out...I don't think it is correct.
userSchema.virtual('places', {
    ref: 'Places',
    localField: '_id',
    foreignField: 'users.userID'
})

export default mongoose.model("User",userSchema);