import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const allBoards = user.tasks.map((userTask) => userTask.title);
  return NextResponse.json(allBoards ? allBoards : { error: "No such Board" });
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");
  const { boardName } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log(boardName);
  user.tasks.map((item) => {
    if (item.title === board) {
      item.title = boardName;
    }
    return item;
  });
  const updatedBoardName = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: user.tasks,
    },
  });
  return NextResponse.json(updatedBoardName);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const board = searchParams.get("board");
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const updatedTask = user.tasks.filter((task) => task.title !== board);

  const updatedBoardName = await prisma.user.update({
    where: {
      email,
    },
    data: {
      tasks: updatedTask,
    },
  });
  return NextResponse.json(updatedBoardName);
}
