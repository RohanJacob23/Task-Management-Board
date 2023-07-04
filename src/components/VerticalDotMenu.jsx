"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";

export default function VerticalDotMenu({ email }) {
  const pathname = usePathname().replace("/", "").replace(/%20/g, " ");
  const router = useRouter();
  // const email = "rohanjacob@gmail.com";

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:3000/api/boardName?email=${email}&board=${pathname}`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(() => router.refresh());
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none">
          <MoreVertical className="text-primary-color cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-bg-color">
          <DropdownMenuItem
            className="font-semibold hover:bg-white hover:text-primary-color cursor-pointer"
            onClick={() => window.my_modal_6.showModal()}
          >
            Edit Board
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-semibold hover:bg-white hover:text-primary-color cursor-pointer"
            onClick={() => window.my_modal_8.showModal()}
          >
            Rename Board
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-semibold text-destructive hover:bg-white hover:text-primary-color cursor-pointer"
            onClick={() => window.my_modal_9.showModal()}
          >
            {/* TODO: Delete board function */}
            Delete Board
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-semibold text-destructive hover:bg-white hover:text-primary-color cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
          >
            {/* TODO: Delete board function */}
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <dialog id="my_modal_9" className="modal">
        <form
          method="dialog"
          className="modal-box flex flex-col bg-error text-black gap-3"
        >
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Delete this task?</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p>
            Are you sure you want to delete the{" "}
            <span className="font-semibold">
              &quot;{pathname !== "" ? pathname : "Select a board to delete"}
              &quot;
            </span>
            {"? "}This action will remove all columns and tasks and cannot be
            reversed.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="outline"
              className="hover:bg-bg-color-variant hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
