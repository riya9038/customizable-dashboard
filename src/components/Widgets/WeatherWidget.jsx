import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fetchWeatherData } from "../../utils/api";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to load weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="flex items-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-4xl font-bold text-blue-600 mr-3">
          {weatherData.current.temp}°C
        </div>
        <div className="text-lg text-blue-800">
          {weatherData.current.condition}
        </div>
      </motion.div>

      <motion.div
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherData.forecast}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="day" tick={{ fill: "#1e40af" }} />
            <YAxis tick={{ fill: "#1e40af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#60a5fa",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#1d4ed8", strokeWidth: 2 }}
              activeDot={{ fill: "#1e40af", strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default WeatherWidget;
