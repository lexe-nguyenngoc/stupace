import z from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signUpSchema = z.object({
  email: z.email("Invalid email address"),
  agree: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
});
