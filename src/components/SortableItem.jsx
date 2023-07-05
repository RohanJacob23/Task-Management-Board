"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

/**
 * Render a sortable item.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.column - The column identifier.
 * @param {Array} props.taskArr - The array of tasks.
 * @returns {JSX.Element} The rendered sortable item.
 */
export default function SortableItem({ column, taskArr }) {
  // Get the reference for the droppable node
  const { setNodeRef } = useDroppable({ id: column });

  return (
    // Set up the sortable context for the column
    <SortableContext
      id={column}
      items={taskArr}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="flex flex-col min-w-[16rem]">
        <h1 className="font-semibold">{column.toUpperCase()}</h1>
        <div className="flex flex-col space-y-4 flex-grow pb-4">
          {/* Render each task */}
          {taskArr.map((item) => (
            <Task key={item.id} id={item.id} item={item} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
