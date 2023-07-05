"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { useStore } from "@/util/zustandStore";

/**
 * Component for displaying and editing a board's columns.
 */
export default function BoardMenuModal() {
  // Destructure the necessary functions and state variables from the custom hook
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

  /**
   * Handle input change for a column.
   * @param {Event} e - The input change event.
   * @param {number} index - The index of the column being edited.
   */
  const handleInputChange = (e, index) => {
    handleColumnsInput(e.target.value, index);
  };

  /**
   * Handle form submission.
   * @param {Event} e - The form submission event.
   */
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
          {/* Columns section */}
          <div className="flex flex-col space-y-2">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Subtasks
            </Label>
            {columns.map((column, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={column}
                  onChange={(e) => handleInputChange(e, index)}
                  className="focus:border-primary-color border-2"
                />
                <X
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => deleteColumn(column, index)}
                />
              </div>
            ))}
            {/* Display error message if showError is true */}
            <h6
              className={`text-destructive text-sm ${
                showError ? "block" : "hidden"
              }`}
            >
              Same Columns
            </h6>
          </div>

          {/* Buttons */}
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
