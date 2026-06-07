import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KanbanBoard from "./components/KanbanBoard";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <KanbanBoard />
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
}

export default App;
