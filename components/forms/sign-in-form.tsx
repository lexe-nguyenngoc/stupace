"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { signInSchema } from "@/lib/validation";

type Form = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const form = useForm<Form>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Link href={ROUTES.forgotPassword} className="text-primary block text-sm hover:underline">
          Forgot password?
        </Link>

        <Button disabled={form.formState.isSubmitting} className="w-full" type="submit">
          {form.formState.isSubmitting && <Loader className="animate-spin" />}
          <span>Sign In</span>
        </Button>

        <p className="text-right text-sm">
          <span>Don&apos;t have an account? </span>

          <Link href={ROUTES.signUp} className="text-primary font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
