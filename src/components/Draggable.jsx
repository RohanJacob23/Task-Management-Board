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

export default function Draggable({ selectedBoard, email, board }) {
  const [tasks, setTasks, setColumns, setTaskDragOver, setTaskDragEnd] =
    useStore((state) => [
      state.tasks,
      state.setTasks,
      state.setColumns,
      state.setTaskDragOver,
      state.setTaskDragEnd,
    ]);
  const [routeChangeFlag, setRouteChangeFlag] = useState(false);

  useEffect(() => {
    setTasks(selectedBoard.tasks);
    setColumns(Object.keys(selectedBoard.tasks));
    setRouteChangeFlag(true);
  }, [setTasks, selectedBoard, setColumns]);

  useEffect(() => {
    const postTasks = async () => {
      await axios
        .post(
          `http://localhost:3000/api/userTask?email=${email}&board=${board}`,
          tasks
        )
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    };

    if (selectedBoard.tasks !== tasks && tasks.length !== 0 && routeChangeFlag)
      postTasks();
  }, [tasks, selectedBoard, email, board, routeChangeFlag]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

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
      {/* You can open the modal using ID.showModal() method */}
      <TaskModal />
    </>
  );
}
