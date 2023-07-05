import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Plus, X } from "lucide-react";
import { useStore } from "@/util/zustandStore";

export default function UpdateTaskDialog() {
  const [
    columns,
    selectedTask,
    handleTaskHeading,
    handleTaskDescription,
    handleSubtask,
    addSubtask,
    removeSubtask,
    changeTaskColumn,
    updateTask,
  ] = useStore((state) => [
    state.columns,
    state.selectedTask,
    state.handleTaskHeading,
    state.handleTaskDescription,
    state.handleSubtask,
    state.addSubtask,
    state.removeSubtask,
    state.changeTaskColumn,
    state.updateTask,
  ]);
  return (
    <dialog id="my_modal_4" className="modal ml-0">
      <form method="dialog" className="modal-box bg-bg-color-variant p-4">
        {/* modal close button */}
        <button
          htmlFor="my_modal_4"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Edit Task!</h3>

        <div className="flex flex-col mt-3 space-y-4">
          {/* task name */}
          <div className="flex flex-col">
            <Label
              htmlFor="taskName"
              className="text-sm font-semibold whitespace-nowrap"
            >
              Task Name
            </Label>
            <Input
              type="text"
              id="taskName"
              value={selectedTask.heading}
              className="focus:border-primary-color border-2"
              onChange={(e) => handleTaskHeading(e.target.value)}
              placeholder="e.g.Take a Coffee Break"
            />
          </div>

          {/* description */}
          <div className="flex flex-col">
            <Label
              htmlFor="Description"
              className="text-sm font-semibold whitespace-nowrap"
            >
              Description
            </Label>
            <Textarea
              id="Description"
              value={selectedTask.description}
              onChange={(e) => handleTaskDescription(e.target.value)}
              placeholder="e.g. It's good take a few minutes coffee break to make sure you have a good day"
              className="focus:border-primary-color border-2"
            />
          </div>

          {/* sub tasks */}
          <div className="flex flex-col">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Subtasks
            </Label>

            <div className="flex flex-col space-y-3">
              {selectedTask.subTasks.map(({ id, subtask }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    id={id}
                    value={subtask}
                    onChange={(e) => handleSubtask(e.target.value, id)}
                    name={id}
                    className="focus:border-primary-color border-2"
                  />
                  <X
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => removeSubtask(id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* button to add new sub task */}
          <div
            className="flex items-center justify-center py-3 hover:bg-primary-color rounded-full bg-primary-color/10 text-primary-color hover:text-white font-semibold cursor-pointer"
            onClick={() => addSubtask()}
          >
            <Plus className="mr-2 h-5 w-5" />
            <span>Add New Subtask</span>
          </div>

          {/* select status */}
          <div className="flex flex-col">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Current Status
            </Label>

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

          {/* create task */}
          <div
            onClick={() => {
              updateTask();
              window.my_modal_4.close();
            }}
            className="flex items-center justify-center py-3 bg-primary-color rounded-full hover:bg-primary-color/70 text-white font-semibold cursor-pointer"
          >
            <Plus className="mr-2 h-5 w-5" />
            <span>Update Task</span>
          </div>
        </div>
      </form>
    </dialog>
  );
}
