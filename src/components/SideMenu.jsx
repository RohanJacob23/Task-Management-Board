"use client";

import { usePathname, useRouter } from "next/navigation";
import { Layout, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useStore } from "@/util/zustandStore";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import axios from "axios";

export default function SideMenu({ email }) {
  const pathname = usePathname().replace("/", "").replace(/%20/g, " ");
  const router = useRouter();
  const [boards] = useStore((state) => [state.boards]);
  const [boardName, setBoardName] = useState("");
  const [tempColumn, setTempColumn] = useState(["todo", "doing"]);
  const url = "https://task-management-board.vercel.app";

  const handleSubmit = async (e) => {
    window.my_modal_7.close();
    e.preventDefault();
    await axios
      .post(`${url}/api/newBoard?email=${email}`, {
        boardName,
        tempColumn,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(() => router.refresh());
    setBoardName("");
    setTempColumn(["todo", "doing"]);
  };

  return (
    <>
      <section className="hidden md:block relative h-full w-720 min-w-[15rem]">
        <div className="hidden md:block h-full w-full bg-bg-color-variant z-40">
          <div className="py-4 pl-3 font-bold text-base">
            <h1>All Boards</h1>
          </div>

          {/* all boards */}
          {boards.map((item) => (
            <div
              key={item}
              className={`${
                pathname === item ? "bg-primary-color text-white" : ""
              } flex items-center rounded-l-none rounded-r-full font-semibold hover:bg-white hover:text-primary-color cursor-pointer py-4 pl-3`}
              onClick={() => {
                router.push(`/${item}`);
                router.refresh();
              }}
            >
              <Layout className="mr-2 h-4 w-4" />
              {item}
            </div>
          ))}

          <div
            className="flex items-center hover:bg-primary-color/10 hover:text-primary-color text-primary-color rounded-l-none rounded-r-full font-semibold py-4 pl-3 cursor-pointer"
            onClick={() => window.my_modal_7.showModal()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Board
          </div>
        </div>
      </section>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_7" className="modal">
        <form method="dialog" className="modal-box bg-bg-color-variant">
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-lg">Add New Board</h3>

            <div className="">
              <Label
                htmlFor="boardName"
                className="text-sm font-semibold whitespace-nowrap"
              >
                Board Name
              </Label>
              <Input
                type="text"
                id="boardName"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="focus:border-primary-color border-2"
                placeholder="e.g. Web Design"
              />
            </div>

            <h3 className="font-semibold text-sm">Board Columns</h3>

            {tempColumn.map((column, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  id={index}
                  value={column}
                  onChange={(e) =>
                    setTempColumn((prev) => {
                      prev[index] = e.target.value;
                      return [...prev];
                    })
                  }
                  className="focus:border-primary-color border-2"
                />
                <X
                  className="h-5 w-5 cursor-pointer"
                  onClick={() =>
                    setTempColumn((prev, index) => {
                      prev.splice(index, 1);
                      return [...prev];
                    })
                  }
                />
              </div>
            ))}

            {/* new column */}
            <div
              className="flex items-center justify-center py-3 hover:bg-primary-color rounded-full bg-primary-color/10 text-primary-color hover:text-white font-semibold cursor-pointer"
              onClick={() => setTempColumn((prev) => [...prev, ""])}
            >
              <Plus className="mr-2 h-5 w-5" />
              <span>Add New Subtask</span>
            </div>

            {/* submit button */}
            <div
              className="flex items-center justify-center py-3 bg-primary-color rounded-full hover:bg-primary-color/70 text-white font-semibold cursor-pointer"
              onClick={handleSubmit}
            >
              <Plus className="mr-2 h-5 w-5" />
              <span>Create New Board</span>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
