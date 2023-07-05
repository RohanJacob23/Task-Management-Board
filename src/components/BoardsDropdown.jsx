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

/**
 * Renders a dropdown menu of boards.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.dropdownList - The list of boards to display in the dropdown.
 * @param {string} props.pathname - The current pathname.
 * @returns {JSX.Element} - The rendered dropdown menu.
 */
export default function BoardsDropdown({ dropdownList, pathname }) {
  const router = useRouter();
  const isPathnameEmpty = pathname === "";

  return (
    <DropdownMenu>
      {/* Dropdown menu trigger */}
      <DropdownMenuTrigger className="md:hidden focus-visible:outline-none flex items-center">
        <h1 className="text-xl font-semibold">
          {isPathnameEmpty ? "Select a Board" : pathname}
        </h1>
        <ChevronDown className="mr-2 h-4 w-4 md:hidden" />
      </DropdownMenuTrigger>

      {/* Dropdown menu content */}
      <DropdownMenuContent className="md:hidden bg-bg-color-variant w-52 max-w-md pl-0">
        {/* Dropdown menu label */}
        <DropdownMenuLabel className="py-4 font-bold text-base">
          All Boards
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary-color/20" />

        {/* Render dropdown menu items */}
        {dropdownList.map((item) => (
          <DropdownMenuItem
            key={item}
            className={`${
              pathname === item.trim() ? "bg-primary-color text-white" : ""
            } rounded-l-none rounded-r-full font-semibold hover:bg-white hover:text-primary-color cursor-pointer py-4`}
            onClick={() => router.push(item)}
          >
            <Layout className="mr-2 h-4 w-4" />
            {item}
          </DropdownMenuItem>
        ))}

        {/* Create new board */}
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
