"use client";

import React, { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserAuthForm({ method }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://task-management-board.vercel.app";

  const createUser = async (e) => {
    axios
      .post(`${url}/api/newUser`, {
        name,
        email,
        password,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(() => router.push("/auth/login"));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    method === "signin"
      ? createUser()
      : signIn("credentials", { email, password, callbackUrl: "/" });
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2.5">
            {method === "signin" && (
              <>
                <Label className="sr-only" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </>
            )}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Label className="sr-only" htmlFor="password">
              Name
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button
            disabled={isLoading}
            className="bg-primary-color hover:bg-primary-color/30 hover:text-primary-color px-4 py-1"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {method === "signin" ? "Sign" : "Login"} In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          //   <Github className="mr-2 h-4 w-4" />
          <Image
            src="/google-dark.svg"
            alt="Google"
            width={16}
            height={16}
            className="mr-2"
          />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
