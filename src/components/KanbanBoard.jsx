import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import Column from "./Column";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  selectAllTasks,
} from "../features/tasks/tasksSlice";

const ColumnIds = {
  TODO: "todo",
  INPROGRESS: "inprogress",
  DONE: "done",
};

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [modalTask, setModalTask] = useState(null); // { isNew: true } or full task object

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const columns = useMemo(
    () => [
      { id: ColumnIds.TODO, title: "To-Do", color: "red-500" },
      { id: ColumnIds.INPROGRESS, title: "In Progress", color: "blue-500" },
      { id: ColumnIds.DONE, title: "Done", color: "green-500" },
    ],
    []
  );

  const tasksByColumn = useMemo(() => {
    return {
      [ColumnIds.TODO]: tasks.filter((t) => t.status === ColumnIds.TODO),
      [ColumnIds.INPROGRESS]: tasks.filter(
        (t) => t.status === ColumnIds.INPROGRESS
      ),
      [ColumnIds.DONE]: tasks.filter((t) => t.status === ColumnIds.DONE),
    };
  }, [tasks]);

  // local handlers that dispatch actions
  function handleAdd(values) {
    dispatch(addTask(values)); 
    toast.success("Task added successfully!");
  }

  function handleUpdate(id, values) {
    dispatch(
      updateTask({
        id,
        updates: {
          title: (values.title ?? "").trim(),
          description: (values.description ?? "").trim(),
          date: values.date ?? "",
        },
      })
    );
    toast.info("Task updated!");
  }

  function handleDelete(id) {
    dispatch(deleteTask(id));
    toast.error("Task deleted!");
  }

  function onDragStart(e) {
    setActiveTaskId(e.active.id);
  }

  function onDragEnd(e) {
    const { active, over } = e;
    setActiveTaskId(null);
    if (!over) return;
    const dest = over.id;
    if (
      [ColumnIds.TODO, ColumnIds.INPROGRESS, ColumnIds.DONE].includes(dest)
    ) {
      dispatch(moveTask({ id: active.id, status: dest }));
    }
  }

  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div
          className="min-h-screen pt-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg.webp')" }}
        >
          <div className="flex justify-center gap-6 px-6 flex-wrap">
            {columns.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                tasks={tasksByColumn[col.id]}
                onAdd={() => setModalTask({ isNew: true })}
                onEdit={(task) => setModalTask(task)}
                onDelete={handleDelete}
                color={col.color}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} ghost /> : null}
        </DragOverlay>
      </DndContext>

      {/* Modal for Add / Edit */}
      {modalTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-800 text-white rounded-xl p-4 shadow-lg w-96">
            <h2 className="mb-3 text-lg font-semibold">
              {modalTask.isNew ? "Add Task" : "Edit Task"}
            </h2>
            <TaskForm
              defaultValues={modalTask.isNew ? {} : modalTask}
              onCancel={() => setModalTask(null)}
              onSubmit={(values) => {
                if (modalTask.isNew) handleAdd(values);
                else handleUpdate(modalTask.id, values);
                setModalTask(null);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
