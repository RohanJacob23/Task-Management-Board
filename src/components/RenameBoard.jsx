"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

/**
 * This function renames a board.
 *
 * @param {string} email - The email of the user.
 */
export default function RenameBoard({ email }) {
  // Set the URL
  const url = "https://task-management-board.vercel.app";
  // const url = "http://localhost:3000";

  // Get the pathname and replace any forward slashes and %20 with spaces
  const pathname = usePathname().replace("/", "").replace(/%20/g, " ");
  const router = useRouter();
  const [boardName, setBoardName] = useState(pathname);

  // Update the board name in the state whenever the pathname changes
  useEffect(() => {
    setBoardName(pathname);
  }, [pathname]);

  /**
   * Handle the form submission.
   *
   * @param {object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to update the board name
    await axios
      .post(`${url}/api/boardName?email=${email}&board=${pathname}`, {
        boardName,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error))
      // Redirect to the updated board URL
      .finally(() => router.replace(`/${boardName}`));
  };

  return (
    <dialog id="my_modal_8" className="modal">
      <form
        method="dialog"
        onSubmit={handleSubmit}
        className="modal-box bg-bg-color-variant"
      >
        <h3 className="font-bold text-lg">Edit Board!</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 mt-3">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Board Name
            </Label>
            <Input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="focus:border-primary-color border-2"
            />
          </div>
          <Button
            className="bg-primary-color rounded-full hover:bg-primary-color/70 text-white font-semibold"
            type="submit"
            onClick={() => window.my_modal_8.close()}
          >
            <span>Save Changes</span>
          </Button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
