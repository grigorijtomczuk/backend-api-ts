import { get, merge } from "lodash";

import express from "express";
import { getUserBySessionToken } from "@/db/users";

export async function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const sessionToken = req.cookies["auth_sessiontoken"];
		if (!sessionToken) {
			return res.sendStatus(403);
		}

		const existingUser = await getUserBySessionToken(sessionToken);
		if (!existingUser) {
			return res.sendStatus(403);
		}

		merge(req, { identity: existingUser });

		return next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}

export async function isOwner(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const { id } = req.params;

		const currentUserId = get(req, "identity._id") as string;
		// Not necessary as we first check if user isAuthenticated when routing
		// if (!currentUserId) {
		// 	return res.sendStatus(403);
		// }
		if (currentUserId.toString() !== id) {
			return res.sendStatus(403);
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
}
