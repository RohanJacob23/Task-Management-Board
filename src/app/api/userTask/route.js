import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const selectedBoard = user.tasks.find((userTask) => userTask.title === board);
  return NextResponse.json(
    selectedBoard ? selectedBoard : { error: "No such Board" }
  );
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const updateUserTask = user.tasks.map((userTask) => {
    if (userTask.title === board) {
      userTask.tasks = body;
    }
    return userTask;
  });

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: updateUserTask,
    },
  });
  return NextResponse.json(updatedUser);
}
