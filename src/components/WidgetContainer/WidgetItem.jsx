import React from "react";
import { Rnd } from "react-rnd";
import { useDispatch } from "react-redux";
import { deleteWidget, updateWidgetPosition } from "../../redux/dashboardSlice";
import WeatherWidget from "../Widgets/WeatherWidget";
import NewsWidget from "../Widgets/NewsWidget";
import CalendarWidget from "../Widgets/CalendarWidget";
import StocksWidget from "../Widgets/StocksWidget";

const Widget = ({ widget }) => {
  const dispatch = useDispatch();

  const onDragStop = (e, d) => {
    dispatch(updateWidgetPosition({ id: widget.id, x: d.x, y: d.y }));
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    dispatch(
      updateWidgetPosition({
        id: widget.id,
        x: position.x,
        y: position.y,
        width: parseInt(ref.style.width),
        height: parseInt(ref.style.height),
      })
    );
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "weather":
        return <WeatherWidget />;
      case "news":
        return <NewsWidget />;
      case "calendar":
        return <CalendarWidget />;
      case "stocks":
        return <StocksWidget />;
      default:
        return null;
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteWidget({ id }));
  };

  return (
    <Rnd
      size={{ width: widget.width, height: widget.height }}
      position={{ x: widget.x, y: widget.y }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      bounds="parent"
      className="bg-white shadow-md rounded-md p-6"
    >
      {renderWidgetContent()}
      <button
        onClick={() => handleDelete(widget.id)}
        className="absolute top-1 right-1 bg-gray-100 hover:bg-gray-200 text-gray text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md cursor-pointer"
      >
        ×
      </button>
    </Rnd>
  );
};

export default Widget;
