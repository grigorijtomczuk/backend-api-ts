import { authentication, random } from "@/helpers";
import { createUser, getUserByEmail } from "@/db/users";

import express from "express";

export async function login(req: express.Request, res: express.Response) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.sendStatus(400);
		}

		const user = await getUserByEmail(email).select("+authentication.password +authentication.salt");
		if (!user) {
			return res.sendStatus(400);
		}

		const expectedHash = authentication(user.authentication.salt, password);
		if (user.authentication.password !== expectedHash) {
			return res.sendStatus(403);
		}

		const salt = random();
		user.authentication.sessionToken = authentication(salt, user._id.toString());
		await user.save();

		res.cookie("auth_sessiontoken", user.authentication.sessionToken, { domain: "localhost", path: "/" });

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}

export async function register(req: express.Request, res: express.Response) {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.sendStatus(400);
		}

		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			return res.sendStatus(400);
		}

		const salt = random();
		const user = await createUser({
			username,
			email,
			authentication: {
				password: authentication(salt, password),
				salt,
			},
		});

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}
