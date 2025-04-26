import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dashboard from "./components/Dashboard";
import React from "react";
import WidgetPicker from "./components/WidgetContainer/WidgetPicker";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">My Dashboard</h1>
        <WidgetPicker />
        <Dashboard />
      </div>
    </DndProvider>
  );
}

export default App;
