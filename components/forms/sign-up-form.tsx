"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { signUpSchema } from "@/lib/validation";

type Form = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const form = useForm<Form>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", agree: false },
  });

  const handleSubmit = (data: Form) => {
    console.log({ data });
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
                <Input placeholder="Your email" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem>
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  I agree with the Terms of Service and Privacy Policy.
                </FormLabel>
              </FormItem>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormMessage className="text-destructive text-sm">
          {form.formState.errors.root?.message}
        </FormMessage>

        <Button disabled={form.formState.isSubmitting} className="w-full" type="submit">
          {form.formState.isSubmitting && <Loader className="animate-spin" />}
          <span>Send</span>
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

export default SignUpForm;
