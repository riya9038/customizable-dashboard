import { useState, useEffect } from "react";
import {
  fetchWeatherData,
  fetchNewsData,
  fetchStockData,
  fetchCalendarEvents,
} from "../utils/api";

const useWidgetData = (widgetType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;

        switch (widgetType) {
          case "weather":
            result = await fetchWeatherData();
            break;
          case "news":
            result = await fetchNewsData();
            break;
          case "stocks":
            result = await fetchStockData();
            break;
          case "calendar":
            result = await fetchCalendarEvents();
            break;
          default:
            throw new Error("Unknown widget type");
        }

        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(`Failed to load ${widgetType} data:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up refresh interval (e.g., every 5 minutes)
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [widgetType]);

  return { data, loading, error };
};

export default useWidgetData;
