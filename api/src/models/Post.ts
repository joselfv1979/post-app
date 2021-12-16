import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  content: string;
  created: Date;
}

const PostSchema = new Schema({
  content: { type: String, required: true },
  created: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

PostSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<IPost>("Post", PostSchema);
