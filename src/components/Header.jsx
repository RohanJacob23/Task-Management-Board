"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Dialog from "./Dialog";
import BoardsDropdown from "./BoardsDropdown";
import { Plus } from "lucide-react";
import VerticalDotMenu from "./VerticalDotMenu";
import BoardMenuModal from "./BoardMenuModal";
import { useStore } from "@/util/zustandStore";
import RenameBoard from "./RenameBoard";

export default function Header({ dropdownList, email }) {
  const pathname = usePathname().replace("/", "").replace(/%20/g, " ");
  const [columns, boards, setBoards] = useStore((state) => [
    state.columns,
    state.boards,
    state.setBoards,
  ]);
  useEffect(() => {
    setBoards(dropdownList);
  }, [setBoards, dropdownList]);
  return (
    <>
      <header
        className={`bg-bg-color-variant flex relative w-full items-center justify-between px-3 py-4 z-50`}
      >
        <div className="flex items-center gap-3">
          {/* TODO: logo */}
          <div className="w-10 h-10 bg-primary-color/10 rounded-full flex items-center justify-center">
            Logo
          </div>

          {/* add boards */}
          <BoardsDropdown dropdownList={boards} pathname={pathname} />
          <h1 className="hidden md:block text-xl font-semibold">
            {pathname === "" ? "Select a Board" : pathname}
          </h1>
        </div>

        {/* modal for new task */}
        <div className="flex items-center gap-3">
          {/* add new board icon */}
          <Button
            disabled={columns.length === 0 ? true : false}
            className="bg-primary-color rounded-full hover:bg-primary-color/30 hover:text-primary-color px-4 py-1"
            onClick={() => window.my_modal_1.showModal()}
          >
            {/* Open the modal using ID.showModal() method */}
            <Plus className="h-5 w-5" />
            <span className="hidden md:block ml-2">Add New Task</span>
          </Button>
          <dialog id="my_modal_1" className="modal ml-0">
            <Dialog id="my_modal_1" />
          </dialog>

          {/* vertical dot icon */}
          <VerticalDotMenu email={email} />
          <BoardMenuModal />
          <RenameBoard email={email} />
        </div>
      </header>
    </>
  );
}
