"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus, ShowerHead, X } from "lucide-react";
import { Button } from "./ui/button";
import { useStore } from "@/util/zustandStore";

// TODO: Need to implement change board zustand

export default function BoardMenuModal() {
  const [
    columns,
    handleColumnsInput,
    changeColumn,
    addColumn,
    deleteColumn,
    showError,
  ] = useStore((state) => [
    state.columns,
    state.handleColumnsInput,
    state.changeColumn,
    state.addColumn,
    state.deleteColumn,
    state.showError,
  ]);
  const handleInputChange = (e, column, index) => {
    handleColumnsInput(e.target.value, index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeColumn(columns);
  };

  return (
    <dialog id="my_modal_6" className="modal">
      <form
        method="dialog"
        onSubmit={handleSubmit}
        className="modal-box bg-bg-color-variant"
      >
        <h3 className="font-bold text-lg">Edit Board!</h3>

        <div className="flex flex-col mt-3 space-y-4">
          {/* columns section */}
          <div className="flex flex-col space-y-2">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Subtasks
            </Label>
            {columns.map((column, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={column}
                  onChange={(e) => handleInputChange(e, column, index)}
                  className="focus:border-primary-color border-2"
                />
                <X
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => deleteColumn(column, index)}
                />
              </div>
            ))}
            <h6
              className={`text-destructive text-sm ${
                showError ? "block" : "hidden"
              }`}
            >
              Same Columns
            </h6>
          </div>

          {/* buttons */}
          <div
            className="flex items-center justify-center py-3 hover:bg-primary-color rounded-full bg-primary-color/10 text-primary-color hover:text-white font-semibold cursor-pointer"
            onClick={addColumn}
          >
            <Plus className="h-5 w-5" />
            <span>Add New Column</span>
          </div>
          <Button
            className="py-3 h-12 bg-primary-color rounded-full hover:bg-primary-color/70 text-white font-semibold"
            type="submit"
            disabled={showError}
            onClick={() => window.my_modal_6.close()}
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
