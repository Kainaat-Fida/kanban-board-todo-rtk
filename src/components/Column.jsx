import React from "react";
import '../scroll.css'
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

export default function Column({ id, title, tasks = [], onAdd, onEdit, onDelete, color }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <section
      ref={setNodeRef}
      className={`flex w-72 flex-col rounded-2xl border bg-gray-900 p-2 shadow-sm transition 
        h-[40vh] ${isOver ? "ring-2 ring-indigo-400" : ""}`}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between px-2">
        <h2 className="text-md font-semibold text-white">{title}</h2>
        {id === "todo" && (
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700 hover:bg-gray-800"
            onClick={() => onAdd({})}
          >
            <Plus size={14} className="text-white" />
          </button>
        )}
      </div>

      {/* Scrollable tasks container */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-700 p-3 text-center text-xs text-gray-400">
            {id === "todo"
              ? "No tasks yet. Click + to add."
              : id === "inprogress"
              ? "Drag tasks here to start work."
              : "Done tasks will appear here."}
          </div>
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onEdit={() => onEdit(t)}
              onDelete={onDelete}
              titleColor={color}
            />
          ))
        )}
      </div>
    </section>
  );
}
