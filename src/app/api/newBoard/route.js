import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Handles the POST request.
 * @param {Request} req - The request object.
 * @returns {Response} - The response object.
 */
export async function POST(req) {
  // Extract the email from the request URL
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  // Parse the request body as JSON
  const body = await req.json();

  // Find the user with the given email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Create a new task column object with empty arrays for each column
  let newTask = {};
  body.tempColumn.forEach((column) => {
    newTask[column] = [];
  });

  // Add the new task column to the user's tasks array
  const updatedTask = [
    ...user.tasks,
    { title: body.boardName, tasks: newTask },
  ];

  // Update the user's tasks in the database
  const updateData = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: updatedTask,
    },
  });

  // Return the updated data as a JSON response
  return NextResponse.json(updateData);
}
