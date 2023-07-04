import axios from "axios";
import { removeAtIndex, arrayMove, insertAtIndex } from "./array";
import { create } from "zustand";

const useStore = create((set) => ({
  tasks: [],
  selectedTask: null,
  columns: [],
  boards: [],
  showError: false,
  setTasks: (tasks) => set({ tasks }),
  setSelectedTask: (selectedTask) => set({ selectedTask }),
  setColumns: (columns) => set({ columns }),
  setBoards: (boards) => set({ boards }),
  setTaskDragOver: (activeContainer, activeIndex, overContainer, overIndex) =>
    set((state) => {
      console.log("setTaskDragOver");
      state.tasks[activeContainer][activeIndex].column = overContainer;
      return {
        tasks: moveBetweenContainers(
          state.tasks,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          state.tasks[activeContainer][activeIndex]
        ),
      };
    }),
  setTaskDragEnd: (activeContainer, activeIndex, overContainer, overIndex) =>
    set((state) => {
      console.log("setTaskDragEnd");
      let newItem;
      if (activeContainer === overContainer) {
        newItem = {
          ...state.tasks,
          [overContainer]: arrayMove(
            state.tasks[overContainer],
            activeIndex,
            overIndex
          ),
        };
      } else {
        state.tasks[activeContainer][activeIndex].column = overContainer;
        newItem = moveBetweenContainers(
          state.tasks,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          state.tasks[activeContainer][activeIndex]
        );
      }
      return {
        tasks: newItem,
      };
    }),
  setSubTaskStatus: (id) =>
    set((state) => {
      console.log("setSubTaskStatus");
      let countCompletedTask = 0;
      const updatedSubtaskStatus = state.selectedTask.subTasks.map((task) => {
        if (task.id === id) {
          task.status = !task.status;
        }
        countCompletedTask += task.status ? 1 : 0;
        return task;
      });
      const updatedColumnTask = state.tasks[state.selectedTask.column].map(
        (task) => {
          if (task.id === state.selectedTask.id) {
            return {
              ...task,
              subTasks: updatedSubtaskStatus,
              completedTask: countCompletedTask,
            };
          }
          return task;
        }
      );
      return {
        tasks: {
          ...state.tasks,
          [state.selectedTask.column]: updatedColumnTask,
        },
        selectedTask: {
          ...state.selectedTask,
          subTasks: updatedSubtaskStatus,
          completedTask: countCompletedTask,
        },
      };
    }),
  handleTaskHeading: (value) =>
    set((state) => {
      console.log("handleTaskHeading"), (state.selectedTask.heading = value);
      return { selectedTask: state.selectedTask };
    }),
  handleTaskDescription: (value) =>
    set((state) => {
      console.log("handleTaskDescription"),
        (state.selectedTask.description = value);
      return { selectedTask: state.selectedTask };
    }),
  handleSubtask: (value, id) => {
    set((state) => {
      const updatedSubtask = state.selectedTask.subTasks.map((task) => {
        if (task.id === id) {
          task.subtask = value;
        }
        return task;
      });
      return {
        selectedTask: { ...state.selectedTask, subTasks: updatedSubtask },
      };
    });
  },
  updateTask: () => {
    set((state) => {
      const updatedTask = state.tasks[state.selectedTask.column].map((task) => {
        if (task.id === state.selectedTask.id) {
          task = state.selectedTask;
        }
        return task;
      });
      return {
        tasks: { ...state.tasks, [state.selectedTask.column]: updatedTask },
        selectedTask: { ...state.selectedTask },
      };
    });
  },

  addSubtask: () => {
    set((state) => {
      console.log("addSubtask");
      const subtask = {
        id: randomIdGenerator(),
        subtask: "",
        status: false,
      };
      const { column, id, subTasks } = state.selectedTask;
      const updatedSubtasks = [...subTasks, subtask];
      const updatedTasks = state.tasks[column].map((task) =>
        task.id === id
          ? {
              ...task,
              subTasks: updatedSubtasks,
              totalTask: updatedSubtasks.length,
            }
          : task
      );
      return {
        tasks: { ...state.tasks, [column]: updatedTasks },
        selectedTask: {
          ...state.selectedTask,
          subTasks: updatedSubtasks,
          totalTask: updatedSubtasks.length,
        },
      };
    });
  },

  removeSubtask: (id) => {
    set((state) => {
      console.log("removeSubtask");
      const column = state.selectedTask.column;
      let countCompletedTask = 0;
      const updatedSubtask = state.selectedTask.subTasks.filter((task) => {
        if (task.id !== id) {
          countCompletedTask += task.status ? 1 : 0;
          return task;
        }
      });
      const updatedTask = state.tasks[column].map((task) => {
        if (task.id === state.selectedTask.id) {
          task.subTasks = updatedSubtask;
          task.totalTask = updatedSubtask.length;
          task.completedTask = countCompletedTask;
        }
        return task;
      });
      return {
        tasks: { ...state.tasks, [column]: updatedTask },
        selectedTask: {
          ...state.selectedTask,
          subTasks: updatedSubtask,
          totalTask: updatedSubtask.length,
          completedTask: countCompletedTask,
        },
      };
    });
  },

  changeTaskColumn: (fromColumn, toColumn) => {
    set((state) => {
      console.log("changeTaskColumn");
      state.selectedTask.column = toColumn;
      const deleteFromColumn = state.tasks[fromColumn].filter(
        (task) => task.id !== state.selectedTask.id
      );

      const addToColumn = [...state.tasks[toColumn], state.selectedTask];

      return {
        tasks: {
          ...state.tasks,
          [fromColumn]: deleteFromColumn,
          [toColumn]: addToColumn,
        },
        selectedTask: state.selectedTask,
      };
    });
  },

  setNewTask: (newTask) => {
    set((state) => {
      console.log("setNewTask");
      const id = randomIdGenerator();
      const taskWithId = { id, ...newTask };
      let tasks = { ...state.tasks };
      tasks[taskWithId.column] = [...tasks[taskWithId.column], taskWithId];
      return { tasks };
    });
  },
  deleteTask: (id) => {
    set((state) => {
      console.log("deleteTask");
      const column = state.selectedTask.column;
      const deleteFromColumn = state.tasks[column].filter(
        (task) => task.id !== id
      );
      return {
        tasks: { ...state.tasks, [column]: deleteFromColumn },
      };
    });
  },

  handleColumnsInput: (value, index) => {
    set((state) => {
      console.log("handleColumnsInput");
      if (state.columns.includes(value)) {
        state.showError = true;
      } else state.showError = false;
      state.columns[index] = value;
      return { columns: state.columns, showError: state.showError };
    });
  },

  changeColumn: (columns) => {
    set((state) => {
      console.log("changeColumn", columns);
      const oldKeys = Object.keys(state.tasks);
      let newTask = {};
      columns.forEach((key, index) => {
        if (index + 1 <= Object.keys(state.tasks).length) {
          newTask[key] = state.tasks[oldKeys[index]];
          newTask[key].forEach((task) => {
            task.column = key;
          });
        } else {
          newTask[key] = [];
        }
      });
      console.log(newTask);
      return {
        tasks: newTask,
        columns: Object.keys(newTask),
      };
    });
  },

  addColumn: () => {
    set((state) => {
      console.log("addColumn");
      const columns = [...state.columns, ""];
      return { columns };
    });
  },

  deleteColumn: (column, index) => {
    set((state) => {
      console.log("deleteColumn");
      const updatedTasks = { ...state.tasks };
      delete updatedTasks[column];
      state.columns.splice(index, 1);
      return { tasks: updatedTasks, columns: state.columns };
    });
  },
}));

const moveBetweenContainers = (
  prev,
  activeContainer,
  activeIndex,
  overContainer,
  overIndex,
  item
) => {
  return {
    ...prev,
    [activeContainer]: removeAtIndex(prev[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(prev[overContainer], overIndex, item),
  };
};

const randomIdGenerator = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
};

export { useStore };
