import { deleteUserById, getUserById, getUsers } from "@/db/users";

import express from "express";

export async function getAllUsers(req: express.Request, res: express.Response) {
	try {
		const users = await getUsers();
		return res.status(200).json(users).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}

export async function updateUser(req: express.Request, res: express.Response) {
	try {
		const { id } = req.params;

		const { username } = req.body;
		if (!username) {
			return res.sendStatus(400);
		}

		const user = await getUserById(id);
		user.username = username;
		await user.save();

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}

export async function deleteUser(req: express.Request, res: express.Response) {
	try {
		const { id } = req.params;
		const deletedUser = await deleteUserById(id);
		return res.json(deletedUser).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}
