import User, { IUser } from "../models/User";
import { ObjectId } from "mongodb";
import { ErrorModel } from "./../models/ErrorModel";

export async function getUsersService() {
  try {
    return await User.find().populate("posts", {
      content: 1,
      created: 1,
    });
  } catch (error) {
    throw Error(error);
  }
}

export async function getUserService(id: ObjectId) {
  try {
    return await User.findById(id);
  } catch (error) {
    throw Error(error);
  }
}

export async function createUserService(user: IUser) {
  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    if (error instanceof ErrorModel) {
      throw new ErrorModel(error.status, error.message)
    }  
    throw Error(error);
  }
}

export async function updateUserService(id: ObjectId, user: IUser) {
  try {
    const response = await User.findByIdAndUpdate(id, user, { new: true });
    return response;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function deleteUserService(id: ObjectId) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw Error(error);
  }
}
