import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Create a new user with the provided name, email, and password.
 *
 * @param {Object} req - The HTTP request object.
 * @returns {Object} - The JSON response containing the newly created user.
 */
export async function POST(req) {
  // Extract the name, email, and password from the request body
  const { name, email, password } = await req.json();

  // Create a new user using the extracted data
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  // Return the newly created user as a JSON response
  return NextResponse.json(newUser);
}
