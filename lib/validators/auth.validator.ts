import z from "zod";

export const signIn = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signUp = z.object({
  email: z.email("Invalid email address"),
  agree: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
});

export const signUpVerify = z.object({
  key: z.string().min(1, "Key is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username must be less than 100 characters"),
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
});

export type SignIn = z.infer<typeof signIn>;
export type SignUp = z.infer<typeof signUp>;
export type SignUpVerify = z.infer<typeof signUpVerify>;
