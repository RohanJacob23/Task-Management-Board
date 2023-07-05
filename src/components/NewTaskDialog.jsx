"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Plus, X } from "lucide-react";
import { useStore } from "@/util/zustandStore";

export default function NewTaskDialog() {
  const [columns, selectedTask, setNewTask] = useStore((state) => [
    state.columns,
    state.selectedTask,
    state.setNewTask,
  ]);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [tempSubtask, setTempSubtask] = useState([
    { id: 1, subtask: "", status: false },
    { id: 2, subtask: "", status: false },
    { id: 3, subtask: "", status: false },
  ]);
  const [tempOption, setTempOption] = useState("");

  useEffect(() => {
    setTempOption(columns[0]);
  }, [columns]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTask({
      heading: tempTitle,
      description: tempDescription,
      completedTask: 0,
      totalTask: tempSubtask.length,
      column: tempOption,
      subTasks: tempSubtask,
    });
    setTempTitle("");
    setTempDescription("");
    setTempSubtask([
      { id: 1, subtask: "", status: false },
      { id: 2, subtask: "", status: false },
      { id: 3, subtask: "", status: false },
    ]);
    setTempOption(columns[0]);
  };

  return (
    <dialog id="my_modal_1" className="modal ml-0">
      <form method="dialog" className="modal-box bg-bg-color-variant p-4">
        {/* modal close button */}
        <button
          htmlFor="my_modal_1"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Add new Task!</h3>

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
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="focus:border-primary-color border-2"
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
              placeholder="e.g. It's good take a few minutes coffee break to make sure you have a good day"
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              className="focus:border-primary-color border-2"
            />
          </div>

          {/* sub tasks */}
          <div className="flex flex-col">
            <Label className="text-sm font-semibold whitespace-nowrap">
              Subtasks
            </Label>

            <div className="flex flex-col space-y-3">
              {tempSubtask.map((task) => (
                <div key={task.id} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    id={task.id}
                    name={task.id}
                    value={task.subtask}
                    onChange={(e) =>
                      setTempSubtask((prev) => {
                        prev.map((subtask) => {
                          if (subtask.id === task.id) {
                            subtask.subtask = e.target.value;
                          }
                        });
                        return [...prev];
                      })
                    }
                    className="focus:border-primary-color border-2"
                  />
                  <X
                    className="h-5 w-5 cursor-pointer"
                    onClick={() =>
                      setTempSubtask((prev) => {
                        return [
                          ...prev.filter((subtask) => subtask.id !== task.id),
                        ];
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* button to add new sub task */}
          <div
            className="flex items-center justify-center py-3 hover:bg-primary-color rounded-full bg-primary-color/10 text-primary-color hover:text-white font-semibold cursor-pointer"
            onClick={() =>
              setTempSubtask((prev) => {
                prev.push({
                  id: prev[prev.length - 1].id + 1,
                  subtask: "",
                  status: false,
                });
                return [...prev];
              })
            }
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
              onChange={(e) => setTempOption(e.target.value)}
              value={tempOption}
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
            onClick={handleSubmit}
            className="flex items-center justify-center py-3 bg-primary-color rounded-full hover:bg-primary-color/70 text-white font-semibold cursor-pointer"
          >
            <Plus className="mr-2 h-5 w-5" />
            <span>Create Task</span>
          </div>
        </div>
      </form>
    </dialog>
  );
}
