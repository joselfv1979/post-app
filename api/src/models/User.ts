import { Schema, model, Document } from 'mongoose';
import { IPost } from './Post';
import { ErrorModel } from "./ErrorModel";

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
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
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

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new ErrorModel(409, "Email already exists"));
    } else {
      next();
    }
  });

export default model<IUser>('User', UserSchema);