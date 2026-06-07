import React from "react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-gray-800">Kanban Board</h1>
        {/* Optional right buttons / user info */}
      </div>
    </header>
  );
};
