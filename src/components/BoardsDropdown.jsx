"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ChevronDown, Plus, Layout } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BoardsDropdown({ dropdownList, pathname }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden focus-visible:outline-none flex items-center">
        <h1 className="text-xl font-semibold">
          {pathname === "" ? "Select a Board" : pathname}
        </h1>
        <ChevronDown className="mr-2 h-4 w-4 md:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:hidden bg-bg-color-variant w-52 max-w-md pl-0">
        <DropdownMenuLabel className="py-4 font-bold text-base">
          All Boards
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary-color/20" />

        {/* task list */}
        {dropdownList.map((item) => (
          <DropdownMenuItem
            key={item}
            className={`${
              pathname === item ? "bg-primary-color text-white" : ""
            } rounded-l-none rounded-r-full font-semibold hover:bg-white hover:text-primary-color cursor-pointer py-4`}
            onClick={() => {
              router.push(item);
              router.refresh();
            }}
          >
            <Layout className="mr-2 h-4 w-4" />
            {item}
          </DropdownMenuItem>
        ))}

        {/* create new board */}
        <DropdownMenuItem
          className="hover:bg-primary-color/10 hover:text-primary-color text-primary-color rounded-l-none rounded-r-full font-semibold py-4"
          onClick={() => window.my_modal_7.showModal()}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
