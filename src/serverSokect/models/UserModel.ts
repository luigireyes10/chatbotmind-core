import { Schema, model } from "mongoose";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },/* 
        channelId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }, 
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }, */
        status: {
            type: String,
            required: true,
            default: "offline",
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


userSchema.method('toJSON', function() {
    const { __v, ...object } = (this as any).toObject();
    return object;
});
const User = model("User", userSchema);

export default User;
