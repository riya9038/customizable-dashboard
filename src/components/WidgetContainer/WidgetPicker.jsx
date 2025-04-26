import React from "react";
import { useDispatch } from "react-redux";
import { addWidget } from "../../redux/dashboardSlice";

const widgetOptions = [
  { type: "weather", label: "Weather", color: "bg-blue-500 hover:bg-blue-600" },
  { type: "news", label: "News", color: "bg-purple-500 hover:bg-purple-600" },
  {
    type: "calendar",
    label: "Calendar",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    type: "stocks",
    label: "Stocks",
    color: "bg-yellow-500 hover:bg-yellow-600 text-black",
  },
];

const WidgetPicker = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 my-4">
      {widgetOptions.map((widget) => (
        <button
          key={widget.type}
          onClick={() => dispatch(addWidget(widget.type))}
          className={`text-white font-semibold py-2 px-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${widget.color}`}
        >
          Add {widget.label}
        </button>
      ))}
    </div>
  );
};

export default WidgetPicker;
