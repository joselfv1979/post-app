import { Schema, model, Document } from 'mongoose';
import { IPost } from './Post';

export interface IUser extends Document {
    name: string,
    username: string,
    email: string,
    passwordHash: string,
    role: string,
    posts: Array<IPost>
}

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    role: {type: String, required: true},
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
});

// const User = model('User', userSchema)

export default model<IUser>('User', UserSchema);