"use client";

import { useStore } from "@/util/zustandStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

/**
 * Renders a sortable task item.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique id of the task item.
 * @param {Object} props.item - The data of the task item.
 * @returns {JSX.Element} - The rendered task item.
 */
export default function Task({ id, item }) {
  // Destructure the properties from the useSortable hook
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Create the item style object
  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get the setSelectedTask function from the store
  const [setSelectedTask] = useStore((state) => [state.setSelectedTask]);

  // Define the click event handler
  const handleClick = () => {
    window.my_modal_3.showModal();
    setSelectedTask(item);
  };

  // Render the task item
  return (
    <div
      onClick={handleClick}
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
