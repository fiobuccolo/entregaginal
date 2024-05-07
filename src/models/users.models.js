import mongoose from "mongoose";

const collection = 'Users';
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    age: Number,
    loggedBy: String,
    cart: {
        type: [
            {
                _id: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'carts'
                }
            }
        ],
        default: []
    }

})

userSchema.pre("find", function () {
    // console.log(this);
    this.populate("carts");
});

const userModel = mongoose.model(collection, userSchema)

export default userModel







