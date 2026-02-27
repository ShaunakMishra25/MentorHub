import { requireAuth } from "@clerk/express";

export const protect = requireAuth();

export default protect