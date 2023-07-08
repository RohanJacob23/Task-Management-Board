import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

/**
 * Fetches the board from the API endpoint using the provided email.
 *
 * @param {string} email - The email of the user.
 * @return {Promise} A promise that resolves to the retrieved board data.
 */
async function fetchBoard(email) {
  // Send a GET request to the API endpoint with the email as a query parameter
  const res = await fetch(
    `${process.env.API_URL}/api/boardName?email=${email}`,
    { cache: "no-store" }
  );

  // Parse the response as JSON
  const data = await res.json();

  // Check if the response is not OK (status code other than 200)
  if (!res.ok) {
    // Throw an error to activate the closest Error Boundary component
    throw new Error("Failed to fetch data");
  }

  // Return the retrieved data
  return data;
}

/**
 * Renders the layout of the application.
 *
 * @param {Object} children - The children components to be rendered within the layout.
 * @return {JSX.Element} The JSX structure with the layout components.
 */
export default async function AppLayout({ children }) {
  // Retrieve the session information from the server using authOptions
  const session = await getServerSession(authOptions);

  // If no session exists, redirect the user to the login page
  if (!session) redirect("/auth/login");

  // Extract the user's email from the session object
  const {
    user: { email },
  } = session;

  // Fetch all the boards associated with the user's email
  const allBoards = await fetchBoard(email);

  // Return the updated JSX structure with the refactored code
  return (
    <section className="flex flex-col h-full">
      <Header dropdownList={allBoards} email={email} />
      <main className="flex h-full overflow-y-hidden">
        <SideMenu email={email} />
        {children}
      </main>
    </section>
  );
}
