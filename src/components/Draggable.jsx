"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import SortableItem from "./SortableItem";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TaskModal from "./TaskModal";
import { useStore } from "@/util/zustandStore";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * Draggable component that handles drag and drop functionality for tasks.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.selectedBoard - Selected board object.
 * @param {string} props.email - User email.
 * @param {string} props.board - Board name.
 * @returns {React.ReactNode} - Rendered component.
 */
export default function Draggable({ selectedBoard, email, board }) {
  const url = "https://task-management-board.vercel.app";
  // const localUrl = "http://localhost:3000";
  const router = useRouter();

  // Retrieve state and state setters from custom hook
  const [tasks, setTasks, setColumns, setTaskDragOver, setTaskDragEnd] =
    useStore((state) => [
      state.tasks,
      state.setTasks,
      state.setColumns,
      state.setTaskDragOver,
      state.setTaskDragEnd,
    ]);

  // Flag to track route change
  const [routeChangeFlag, setRouteChangeFlag] = useState(false);

  // Refresh router on component mount and update
  useEffect(() => {
    router.refresh();
  }, [router]);

  // Update tasks and columns when selectedBoard changes
  useEffect(() => {
    setTasks(selectedBoard.tasks);
    setColumns(Object.keys(selectedBoard.tasks));
    setRouteChangeFlag(true);
  }, [setTasks, selectedBoard, setColumns]);

  // Post tasks to API when tasks change
  useEffect(() => {
    const postTasks = async () => {
      await axios
        .post(`${url}/api/userTask?email=${email}&board=${board}`, tasks)
        .catch((error) => console.log(error));
    };

    if (selectedBoard.tasks !== tasks && tasks.length !== 0 && routeChangeFlag)
      postTasks();
  }, [tasks, selectedBoard, email, board, routeChangeFlag]);

  // Define sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  // Handle drag over event
  const handleDragOver = ({ over, active }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      setTaskDragOver(activeContainer, activeIndex, overContainer, overIndex);
    }
  };

  // Handle drag end event
  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      setTaskDragEnd(activeContainer, activeIndex, overContainer, overIndex);
    }
  };

  return (
    <>
      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        {Object.entries(tasks).map(([column, taskArr]) => (
          <SortableItem key={column} column={column} taskArr={taskArr} />
        ))}
      </DndContext>
      <TaskModal />
    </>
  );
}
