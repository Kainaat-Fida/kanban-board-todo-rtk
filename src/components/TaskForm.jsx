import React, { useState } from "react";

export default function TaskForm({ defaultValues = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(defaultValues.title ?? "");
  const [description, setDescription] = useState(defaultValues.description ?? "");
  const [date, setDate] = useState(defaultValues.date ?? "");
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = "* Title is required!";
    if (!description.trim()) newErrors.description = "* Description is required!";
    if (!date) newErrors.date = "* Date is required!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setErrors({});
    onSubmit({ title: title.trim(), description: description.trim(), date });
  };

  return (
    <div className="rounded-xl bg-gray-800 p-4 shadow-lg text-white">
      <div className="grid gap-2">
        {/* Title */}
        <label className="text-xs font-medium">Title</label>
        <input
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none bg-gray-700 text-white ${
            errors.title ? "border-red-500" : "border-gray-600"
          }`}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}

        {/* Description */}
        <label className="text-xs font-medium">Description</label>
        <textarea
          className={`min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm outline-none bg-gray-700 text-white ${
            errors.description ? "border-red-500" : "border-gray-600"
          }`}
          placeholder="Details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}

        {/* Date */}
        <label className="text-xs font-medium">Date</label>
        <input
          type="date"
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none bg-gray-700 text-white ${
            errors.date ? "border-red-500" : "border-gray-600"
          }`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}

        {/* Buttons */}
        <div className="mt-3 flex items-center gap-2">
          <button
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="rounded-lg border border-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
