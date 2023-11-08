import { deleteUser, getAllUsers, updateUser } from "@/controllers/users";
import { isAuthenticated, isOwner } from "@/middlewares";

import express from "express";

export default function (router: express.Router) {
	router.get("/users", isAuthenticated, getAllUsers);
	router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
	router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
}
