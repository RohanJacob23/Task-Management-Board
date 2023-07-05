// Import the necessary modules
import Link from "next/link";
import UserAuthForm from "@/components/UserAuthForm";
import { Command } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
};

/**
 * Asynchronously renders the page.
 *
 * @return {Promise<ReactNode>} The rendered page.
 */
export default async function page() {
  // Get the server session using the authOptions
  const session = await getServerSession(authOptions);

  // If session exists, redirect to "/"
  if (session) {
    redirect("/");
  }

  // Return the JSX elements
  return (
    <>
      {/* Container for the page */}
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Sign In link */}
        <Link
          className={`${buttonVariants({
            variant: "ghost",
          })} absolute right-4 top-4 md:right-8 md:top-8 hover:bg-primary-color/10 hover:text-primary-color text-primary-color`}
          href="/auth/signin"
        >
          Sign In
        </Link>

        {/* Background container */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-zinc-900" />
          {/* Company name */}
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* Command icon */}
            <Command className="mr-2 h-6 w-6" /> Acme Inc
          </div>
          {/* Testimonial */}
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

        {/* Login form container */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              {/* Heading */}
              <h1 className="text-2xl font-semibold tracking-tight">Login!</h1>
              {/* Description */}
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to create your account
              </p>
            </div>
            {/* User authentication form */}
            <UserAuthForm method="login" />
          </div>
        </div>
      </div>
    </>
  );
}
