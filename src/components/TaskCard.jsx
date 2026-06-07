import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Pencil, Trash2, CheckCircle } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete, ghost = false }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  
  const titleColor =
    task.status === "todo"
      ? "text-red-500"
      : task.status === "inprogress"
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={`rounded-xl border bg-gray-800 p-2 shadow-sm ${
          ghost ? "opacity-80" : ""
        }`}
      >
        {/* Title + Done checkmark */}
        <div className="mb-1 flex items-center justify-between">
          <h3
            className={`flex items-center gap-1 text-sm font-semibold leading-snug ${titleColor}`}
          >
            {task.title}
            {task.status === "done" && (
              <CheckCircle size={14} className="text-green-500" />
            )}
          </h3>
        </div>

        {/* Description */}
        {task.description && (
          <p className="mb-1 whitespace-pre-line text-xs text-gray-300">
            {task.description}
          </p>
        )}

        {/* Date */}
        {task.date && (
          <div className="text-xs text-gray-400">Due: {task.date}</div>
        )}

        {/* Actions */}
        <div className="mt-1 flex gap-2">
          <button
            className="rounded-full p-1 hover:bg-gray-700"
            onClick={onEdit} 
            disabled={isDragging}
            title="Edit"
          >
            <Pencil size={14} className="text-gray-200" />
          </button>
          <button
            className="rounded-full p-1 hover:bg-red-700"
            onClick={() => onDelete(task.id)}
            disabled={isDragging}
            title="Delete"
          >
            <Trash2 size={14} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
