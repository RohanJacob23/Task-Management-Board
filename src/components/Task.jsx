"use client";

import { useStore } from "@/util/zustandStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export default function Task({ id, item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [setSelectedTask] = useStore((state) => [state.setSelectedTask]);

  return (
    <div
      onClick={() => {
        window.my_modal_3.showModal();
        setSelectedTask(item);
      }}
      ref={setNodeRef}
      style={itemStyle}
      {...attributes}
      {...listeners}
      className="bg-bg-color-variant text-white rounded-xl w-64 py-6 px-4 break-words hyphens-auto hover:text-primary-color"
    >
      <h1 className="cursor-pointer font-semibold">{item.heading}</h1>
      <p className="text-white/60 text-sm">
        {item.completedTask} of {item.totalTask}
      </p>
    </div>
  );
}
