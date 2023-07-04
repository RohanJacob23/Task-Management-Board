import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function fetchBoard(email) {
  const res = await fetch(
    `${process.env.API_URL}/api/boardName?email=${email}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const {
    user: { email },
  } = session;
  // const email = "rohanjacob@gmail.com";
  const allBoards = await fetchBoard(email);
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
  // console.log(allBoards);
  const dropdownList = tempObj.map((item) => item.title);
  return (
    <section className="flex flex-col h-full">
      <Header dropdownList={allBoards} email={email} />
      <main className="flex h-full overflow-y-hidden">
        <SideMenu dropdownList={allBoards} email={email} />
        {children}
      </main>
    </section>
  );
}
