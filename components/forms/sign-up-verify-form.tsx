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
import { signInWithCredentials } from "@/lib/services/auth";
import { authSchemas } from "@/lib/validators";
import { SignUpVerify } from "@/lib/validators/auth.validator";

const SignUpVerifyForm = () => {
  const form = useForm<SignUpVerify>({
    resolver: zodResolver(authSchemas.signUpVerify),
    defaultValues: { key: "", name: "", username: "", password: "" },
  });
  const navigate = useRouter();

  const handleSubmit = async (data: SignUpVerify) => {
    const response = await authService.signUpVerify(data);

    if (response.success) {
      toast.success("Your account has been created successfully.");
      await signInWithCredentials(response.data.email, data.password);
      navigate.push(ROUTES.home);
      return;
    }

    form.setError("root", { message: response.message });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key</FormLabel>
              <FormControl>
                <Input placeholder="Key" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" className="" {...field} />
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
                <Input placeholder="Your password" type="password" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormMessage className="text-destructive text-center text-sm">
          {form.formState.errors.root?.message}
        </FormMessage>

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer disabled:cursor-wait"
          type="submit"
        >
          {form.formState.isSubmitting && <Loader className="animate-spin" />}
          <span>Verify</span>
        </Button>

        <p className="text-right text-sm">
          <span>Don&apos;t have an account? </span>

          <Link href={ROUTES.signIn} className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpVerifyForm;
