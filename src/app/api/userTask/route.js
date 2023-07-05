import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * GET request handler
 *
 * @param {Request} req - The HTTP request object
 * @returns {Response} - The HTTP response object
 */
export async function GET(req) {
  // Extract email and board from URL search params
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");

  // Query user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Find selected board in user's tasks
  const selectedBoard = user.tasks.find(
    (userTask) => userTask.title.trim() === board
  );

  // Return JSON response
  return NextResponse.json(
    selectedBoard ? selectedBoard : { error: "No such Board" }
  );
}

/**
 * Handle POST request
 *
 * @param {Request} req - The request object
 * @returns {Promise<Response>} - The response object
 */
export async function POST(req) {
  // Extract email and board from request URL search params
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");

  // Parse request body as JSON
  const body = await req.json();

  // Retrieve user from database based on email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Update user tasks with new data for specified board
  const updateUserTask = user.tasks.map((userTask) => {
    if (userTask.title === board) {
      userTask.tasks = body;
    }
    return userTask;
  });

  // Update user in the database
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: updateUserTask,
    },
  });

  // Return updated user as JSON response
  return NextResponse.json(updatedUser);
}
