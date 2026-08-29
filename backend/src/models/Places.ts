import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
    name: String,
    location: { 
        lat: {
            type: String,
            required: true
        },
        lon: {
            type: String,
            required: true
        }
    },
    address: String,
    users: [
        {
            userID: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            status: {
                 type: String,
                 enum: ['visited', 'wishlist'],
                 required: true
            }
        }
    ]
});

export default mongoose.model("Place", placeSchema);