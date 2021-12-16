import Post, { IPost } from "../models/Post";
import { ObjectId } from "mongodb";

export async function getPostsService(userId: ObjectId) {
  try {
    return await Post.find({ user: userId }).populate("user", {
      username: 1,
      name: 1,
    });
  } catch (error) {
    throw Error(error);
  }
}

export async function getPostService(id: ObjectId) {
  try {
    return await Post.findById(id);
  } catch (error) {
    throw Error(error);
  }
}

export async function createPostService(post: IPost) {
  try {
    const savedPost = await post.save();
    return savedPost;
  } catch (error) {
    throw Error(error);
  }
}

export async function updatePostService(id: ObjectId, post: IPost) {
  try {
    const response = await Post.findByIdAndUpdate(id, post, { new: true });
    return response;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function deletePostService(id: ObjectId) {
  try {
    return await Post.findByIdAndDelete(id);
  } catch (error) {
    throw Error(error);
  }
}
