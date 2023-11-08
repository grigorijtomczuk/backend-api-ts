import authentication from "@/router/authentication";
import express from "express";
import users from "@/router/users";

const router = express.Router();

export default function (): express.Router {
	authentication(router);
	users(router);
	return router;
}
