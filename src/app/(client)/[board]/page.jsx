import Draggable from "@/components/Draggable";
import { redirect } from "next/navigation";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Fetches data from an API endpoint based on the provided email and board.
 *
 * @param {string} email - The email of the user.
 * @param {string} board - The board to fetch data from.
 * @return {Promise<object>} The fetched data.
 */
async function getData(email, board) {
  // Construct the URL for the API endpoint using environment variable and query parameters
  const url = `${process.env.API_URL}/api/userTask?email=${email}&board=${board}`;

  // Fetch data from the API using the constructed URL
  const res = await fetch(url, { cache: "no-store" });

  // Parse the response body as JSON
  const data = await res.json();

  // Check if the response is not OK (status code in the 200-299 range)
  if (!res.ok) {
    // Throw an error to activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  // Check if the response data contains an error property
  if (data.error) {
    // Redirect to the home page
    redirect("/");
  }

  // Return the fetched data
  return data;
}

/**
 * Retrieves user tasks based on the email and filtered board string.
 *
 * @param {object} params - The parameters passed to the function.
 * @param {object} params.board - The board parameter from the params object.
 * @return {object} A section element with the specified classes and a Draggable component.
 */
export default async function page({ params: { board } }) {
  // Retrieve the email from the server session using the authOptions
  const {
    user: { email },
  } = await getServerSession(authOptions);

  // Remove forward slashes and replace "%20" with spaces in the board string
  const filteredBoard = board.replace("/", "").replace(/%20/g, " ");

  // Retrieve user tasks using the email and filtered board string
  const userTasks = await getData(email, filteredBoard);

  // Return a section element with the "flex", "p-4", "overflow-auto", and "gap-4" classes
  // Inside the section, render the Draggable component with the selectedBoard, board, and email props
  return (
    <section className="flex p-4 overflow-auto gap-4">
      <Draggable
        selectedBoard={userTasks}
        board={filteredBoard}
        email={email}
      />
    </section>
  );
}
