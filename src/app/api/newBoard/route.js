import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  let newTask = {};
  body.tempColumn.forEach((column) => {
    newTask[column] = [];
  });
  const updatedTask = [
    ...user.tasks,
    { title: body.boardName, tasks: newTask },
  ];

  const updateData = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: updatedTask,
    },
  });
  return NextResponse.json(updateData);
}
