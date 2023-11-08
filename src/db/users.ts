import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: { type: String, requiered: true },
	email: { type: String, requiered: true },
	authentication: {
		password: { type: String, requiered: true, select: false },
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
});

export const userModel = mongoose.model("User", userSchema);

export const getUsers = () => userModel.find();
export const getUserById = (id: string) => userModel.findById(id);
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => userModel.findOne({ "authentication.sessionToken": sessionToken });
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values);
export const deleteUserById = (id: string) => userModel.findByIdAndDelete(id);
