import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
});
