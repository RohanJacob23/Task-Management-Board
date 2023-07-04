"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function RenameBoard({ email }) {
  const url = "https://task-management-board.vercel.app";
  const pathname = usePathname().replace("/", "").replace(/%20/g, " ");
  const router = useRouter();
  const [boardName, setBoardName] = useState(pathname);

  useEffect(() => {
    setBoardName(pathname);
  }, [pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}/api/boardName?email=${email}&board=${pathname}`, {
        boardName,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error))
      .finally(() => {
        router.replace(`/${boardName}`);
        router.refresh();
      });
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
