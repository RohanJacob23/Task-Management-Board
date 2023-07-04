import Draggable from "@/components/Draggable";
import { redirect } from "next/navigation";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getData(email, board) {
  const res = await fetch(
    `${process.env.API_URL}/api/userTask?email=${email}&board=${board}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  if (data.error) {
    redirect("/");
  }
  return data;
}

export default async function page({ params: { board } }) {
  const {
    user: { email },
  } = await getServerSession(authOptions);
  const tempObj = [
    {
      title: "Marketing Plan",
      tasks: {},
    },
    {
      title: "Roadmap",
      tasks: {
        todo: [
          {
            id: 1,
            heading: "Build Ui onboarding flow 1",
            description: "some random description",
            totalTask: 3,
            completedTask: 1,
            column: "todo",
            subTasks: [
              { id: 1, subtask: "sub task 1", status: false },
              { id: 2, subtask: "sub task 2", status: true },
              { id: 3, subtask: "sub task 3", status: false },
            ],
          },
          {
            id: 2,
            heading: "Build Ui onboarding flow 2",
            description: "some random description",
            totalTask: 3,
            completedTask: 1,
            column: "todo",
            subTasks: [
              { id: 1, subtask: "sub task 1", status: false },
              { id: 2, subtask: "sub task 2", status: false },
              { id: 3, subtask: "sub task 3", status: true },
            ],
          },
        ],
        doing: [
          {
            id: 3,
            heading: "Build Ui onboarding flow 3",
            description: "some random description",
            totalTask: 3,
            completedTask: 1,
            column: "doing",
            subTasks: [
              { id: 1, subtask: "sub task 1", status: false },
              { id: 2, subtask: "sub task 2", status: true },
              { id: 3, subtask: "sub task 3", status: false },
            ],
          },
        ],
      },
    },
  ];
  const filteredBoard = board.replace("/", "").replace(/%20/g, " ");
  // const email = "rohanjacob@gmail.com";
  const userTasks = await getData(email, filteredBoard);

  const selectedBoard = tempObj.find((item) => item.title === filteredBoard);
  console.log(userTasks);
  return (
    <section className="flex p-4 overflow-auto gap-4">
      <Draggable selectedBoard={userTasks} board={board} email={email} />
      {/* <Draggable selectedBoard={selectedBoard} board={board} email={email} /> */}
    </section>
  );
}
