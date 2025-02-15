"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { OnboardingAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemas } from "@/lib/zodSchemas";
import { SubmitButton } from "@/components/submit-button";

export default function OnboardingRoute() {
  const [lastResult, action] = useActionState(OnboardingAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchemas,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="">Welcome to CalAndri</CardTitle>
          <CardDescription>
            We need the following information to set up your profile
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Fullname</Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Your username"
              />
              <p className="text-red-700 text-sm line-clamp-1">
                {fields.fullName.errors}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm">
                  calandri.com/
                </span>
                <Input
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  placeholder="example-user"
                  className="rounded-none"
                />
              </div>
              <p className="text-red-700 text-sm">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton
              text="Submit"
              className="w-full font-bold"
              variant={"secondary"}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
