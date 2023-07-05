import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Retrieves a user's board titles based on their email.
 *
 * @param {Request} req - The request object.
 * @return {Promise<Response>} A promise that resolves to the response object.
 */
export async function GET(req) {
  // Extract the searchParams from the URL of the request
  const { searchParams } = new URL(req.url);

  // Extract the email from the searchParams
  const email = searchParams.get("email");

  // Use Prisma to find a unique user based on the email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Extract all the titles from the user's tasks and store them in an array
  const allBoardTitles = user.tasks.map((task) => task.title);

  // Check if there are any board titles
  // If there are, return the array of board titles
  // Otherwise, return an object with an error message
  const response = allBoardTitles ? allBoardTitles : { error: "No such Board" };

  // Return the response as a JSON object
  return NextResponse.json(response);
}

/**
 * Update the name of a board in the user's tasks.
 *
 * @param {Request} req - The HTTP request object.
 * @returns {Response} The HTTP response object.
 */
export async function POST(req) {
  // Extract the email and board parameters from the request URL
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");

  // Extract the new board name from the request body
  const { boardName } = await req.json();

  // Find the user with the provided email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Update the title of tasks that match the board name
  user.tasks.forEach((task) => {
    if (task.title === board) {
      task.title = boardName;
    }
  });

  // Update the user's tasks in the database
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: user.tasks,
    },
  });

  // Return the updated user as JSON response
  return NextResponse.json(updatedUser);
}

/**
 * Deletes a Board from a user's task list.
 * @param {Request} req - The HTTP request object.
 * @returns {Response} The HTTP response object.
 */
export async function DELETE(req) {
  // Extract email and board parameters from the URL
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");

  // Find the user with the given email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Filter out the task with the given board title
  const updatedTasks = user.tasks.filter((task) => task.title !== board);

  // Update the user with the updated task list
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: updatedTasks,
    },
  });

  // Return the updated user as a JSON response
  return NextResponse.json(updatedUser);
}
