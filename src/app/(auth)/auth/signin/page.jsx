import Link from "next/link";
import { Command } from "lucide-react";
import UserAuthForm from "@/components/UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In",
  description: "Authentication forms built using the components.",
};

/**
 * A description of the entire function.
 *
 * @return {Promise<void>} description of return value
 */
export default async function page() {
  // Get the server session using the provided auth options
  const session = await getServerSession(authOptions);

  // If a session exists, redirect to the home page
  if (session) redirect("/");

  // Render the page
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Login link */}
        <Link
          className={`${buttonVariants({
            variant: "ghost",
          })} absolute right-4 top-4 md:right-8 md:top-8 hover:bg-primary-color/10 hover:text-primary-color text-primary-color`}
          href="/auth/login"
        >
          Login
        </Link>

        {/* Sidebar */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Command className="mr-2 h-6 w-6" /> Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your name, email and password below to create your account
              </p>
            </div>
            <UserAuthForm method="signin" />
          </div>
        </div>
      </div>
    </>
  );
}
