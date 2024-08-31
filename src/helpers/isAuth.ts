import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken"
import { VmContext } from "../typeDef/VmContext";

export const isAuth: MiddlewareFn<VmContext> = async ({ context }, next) => {

    const token = context.req.header('authorization') || '';

    if (!token) {
        return new Error("not authenticated");
    }
    return next();
}
