import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import React from "react";

export default function Loading() {
  const tempBoard = ["todo", "doing", "done"];
  const tempEmail = "roh@roh.com";
  return (
    <section className="flex flex-col h-full">
      <Header email={tempEmail} skeleton={true} />
      <main className="flex h-full overflow-y-hidden">
        <SideMenu tempBoard={tempBoard} email={tempEmail} skeleton={true} />
      </main>
    </section>
  );
}
