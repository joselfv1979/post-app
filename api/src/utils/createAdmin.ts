import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

export async function createAdminUser() {
  try {
    if (process.env.NODE_ENV !== "test") {
      const adminUser = await User.findOne({ username: "admin" });
      if (adminUser) {        
        return;
      } else {
        const passwordHash = await bcrypt.hash("1234", 10);
        const admin: IUser = new User({
          name: "admin",
          username: "admin",
          email: "admin@gmail.com",
          passwordHash,
          role: "admin",
        });
        await admin.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
