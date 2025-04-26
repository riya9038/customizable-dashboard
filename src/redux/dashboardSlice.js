import { createSlice } from "@reduxjs/toolkit";

const widgetState = [
  {
    id: "1",
    type: "weather",
    x: 0,
    y: 0,
    width: 300,
    height: 200,
  },
  {
    id: "2",
    type: "news",
    x: 320,
    y: 0,
    width: 300,
    height: 200,
  },
  {
    id: "3",
    type: "calendar",
    x: 640,
    y: 0,
    width: 300,
    height: 200,
  },
  {
    id: "4",
    type: "stock",
    x: 960,
    y: 0,
    width: 300,
    height: 200,
  },
];

const initialState = JSON.parse(localStorage.getItem("widgets")) || widgetState;

const dashboardSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    updateWidgetPosition: (state, action) => {
      const { id, x, y, width, height } = action.payload;
      const widget = state.find((w) => w.id === id);
      if (widget) {
        widget.x = x;
        widget.y = y;
        if (width) widget.width = width;
        if (height) widget.height = height;
        localStorage.setItem("widgets", JSON.stringify(state)); // Save to localStorage
      }
    },
    addWidget: (state = initialState, action) => {
      const type = action.payload;
      const nextId = `${type}-${Date.now()}`;

      // calculate max y (to place the new widget below the others)
      let maxY = 0;
      state.forEach((w) => {
        if (typeof w.y === "number") {
          maxY = Math.max(maxY, w.y + (w.h || 250));
        }
      });

      const newWidget = {
        id: nextId,
        type: action.payload,
        x: 0, // start from first column
        y: maxY, // place it after the last widget
        width: 300, // width (number of columns)
        height: 200, // height (number of rows)
      };

      state.push(newWidget);
      localStorage.setItem("widgets", JSON.stringify(state)); // Save to localStorage
    },
    deleteWidget: (state, action) => {
      let index = state.findIndex((widget) => widget.id === action.payload.id);
      state.splice(index, 1);
      localStorage.setItem("widgets", JSON.stringify(state)); // Save to localStorage
    },
  },
});

export const { updateWidgetPosition, addWidget, deleteWidget } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
