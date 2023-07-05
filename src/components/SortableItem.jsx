"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

export default function SortableItem({ column, taskArr }) {
  const { setNodeRef } = useDroppable({ id: column });

  return (
    <SortableContext
      id={column}
      items={taskArr}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="flex flex-col min-w-[16rem]">
        <h1 className="font-semibold">{column.toUpperCase()}</h1>
        <div className="flex flex-col space-y-4 flex-grow pb-4">
          {taskArr.map((item) => (
            <Task key={item.id} id={item.id} item={item} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
