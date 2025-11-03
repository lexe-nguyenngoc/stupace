"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/constants";
import { authService } from "@/lib/services";
import { authSchemas } from "@/lib/validators";

import type { SignIn } from "@/lib/validators/auth.validator";

const SignInForm = () => {
  const form = useForm<SignIn>({
    resolver: zodResolver(authSchemas.signIn),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();

  const handleSubmit = async (data: SignIn) => {
    const response = await authService.signIn(data);

    if (response.success) {
      toast.success("Sign in successfully!");

      router.push(ROUTES.home);
      return;
    }

    form.setError("root", { message: response.message });
  };

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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormMessage className="text-destructive text-center text-sm">
          {form.formState.errors.root?.message}
        </FormMessage>

        <Link
          href={ROUTES.forgotPassword}
          className="text-primary block text-right text-sm hover:underline"
        >
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
