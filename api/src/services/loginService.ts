import User from "../models/User";

export async function getUserService(username: string) {
  try {
    return await User.findOne({ username });
  } catch (error) {
    throw Error(error);
  }
}
