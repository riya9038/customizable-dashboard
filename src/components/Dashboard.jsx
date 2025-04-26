// src/components/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import Widget from "./WidgetContainer/WidgetItem";

const Dashboard = () => {
  const widgets = useSelector((state) => state.widgets);

  return (
    <div className="min-h-screen w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map((widget) => (
        <Widget key={widget.id} widget={widget} />
      ))}
    </div>
  );
};

export default Dashboard;
