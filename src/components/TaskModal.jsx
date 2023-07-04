"use client";

import { useStore } from "@/util/zustandStore";
import React from "react";
import { MoreVertical } from "lucide-react";
import Dialog from "./Dialog";
import { Button } from "./ui/button";

export default function TaskModal() {
  const [
    columns,
    changeTaskColumn,
    selectedTask,
    setSubTaskStatus,
    deleteTask,
  ] = useStore((state) => [
    state.columns,
    state.changeTaskColumn,
    state.selectedTask,
    state.setSubTaskStatus,
    state.deleteTask,
  ]);
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        {selectedTask && (
          <form method="dialog" className="modal-box bg-bg-color-variant">
            {/* heading plus dot menu section */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{selectedTask.heading}</h3>
              {/* dropdown */}
              <details className="dropdown dropdown-end z-50 h-fit">
                <summary className="list-none">
                  <MoreVertical className="text-primary-color cursor-pointer" />
                </summary>
                <ul className="shadow menu dropdown-content bg-base-100 rounded-md w-28 p-1.5">
                  <div
                    onClick={() => window.my_modal_4.showModal()}
                    className="font-semibold hover:bg-white hover:text-primary-color rounded px-2 py-1.5 cursor-pointer"
                  >
                    <span>Edit Task</span>
                  </div>
                  <div
                    className="font-semibold text-destructive hover:bg-white hover:text-primary-color rounded px-2 py-1.5 cursor-pointer"
                    onClick={() => window.my_modal_5.showModal()}
                  >
                    {/* Open the modal using ID.showModal() method */}
                    Delete Task
                  </div>
                </ul>
              </details>
            </div>
            <p className="py-4">{selectedTask.description}</p>

            {/* content */}
            <div className="flex flex-col space-y-3">
              {/* subtasks */}
              <div>
                <h1 className="font-semibold opacity-80">
                  Subtasks ({selectedTask.completedTask} of{" "}
                  {selectedTask.totalTask})
                </h1>

                <div className="flex flex-col w-full">
                  {selectedTask.subTasks.map(({ id, subtask, status }) => (
                    <label
                      key={id}
                      className="label justify-start space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        checked={status}
                        onChange={() => setSubTaskStatus(id)}
                      />
                      <span
                        className={`label-text font-semibold ${
                          status ? "line-through text-primary-color/70" : ""
                        }`}
                      >
                        {subtask}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* current status */}
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold whitespace-nowrap">
                  Current Status
                </h1>

                <select
                  onChange={(e) =>
                    changeTaskColumn(selectedTask.column, e.target.value)
                  }
                  value={selectedTask.column}
                  className="select select-bordered bg-bg-color-variant w-full outline-none focus:outline-none focus:border-primary-color"
                >
                  {columns.map((column) => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        )}
        {/* Dialog modal, closes when clicked outside */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="my_modal_4" className="modal ml-0">
        {selectedTask && <Dialog id="my_modal_4" from="taskModal" />}
      </dialog>

      <dialog id="my_modal_5" className="modal">
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
              &quot;{selectedTask ? selectedTask.heading : ""}
              &quot;
            </span>{" "}
            task and its subtasks? This action cannot be reversed.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="destructive"
              onClick={() => {
                window.my_modal_3.close();
                deleteTask(selectedTask.id);
              }}
            >
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
