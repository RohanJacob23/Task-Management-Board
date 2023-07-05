"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import NewTaskDialog from "./NewTaskDialog";
import BoardsDropdown from "./BoardsDropdown";
import { Plus } from "lucide-react";
import VerticalDotMenu from "./VerticalDotMenu";
import BoardMenuModal from "./BoardMenuModal";
import { useStore } from "@/util/zustandStore";
import RenameBoard from "./RenameBoard";
import Image from "next/image";

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
          <div className="hidden md:flex relative w-28 md:w-32 h-10 items-center justify-center">
            <Image
              src={"/logo.png"}
              fill
              alt="logo"
              priority={true}
              className="object-contain"
            />
          </div>
          <div className="flex md:hidden relative w-8 h-10 items-center justify-center">
            <Image
              src={"/onlyLogo.png"}
              fill
              alt="logo"
              priority={true}
              className="object-contain"
            />
          </div>

          {/* add boards */}
          <BoardsDropdown dropdownList={boards} pathname={pathname} />
          <h1 className="hidden md:block text-3xl font-semibold">
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

          <NewTaskDialog />

          {/* vertical dot icon */}
          <VerticalDotMenu email={email} />
          <BoardMenuModal />
          <RenameBoard email={email} />
        </div>
      </header>
    </>
  );
}
