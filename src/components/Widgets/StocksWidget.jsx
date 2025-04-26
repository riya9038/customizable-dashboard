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
import useWidgetData from "../../hooks/useWidgetData";

const StocksWidget = () => {
  const { data, loading, error } = useWidgetData("stocks");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Failed to load stock data: {error}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="grid grid-cols-2 gap-4 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {data?.map((stock) => (
          <motion.div
            key={stock.symbol}
            className="bg-white p-3 rounded-lg shadow-sm"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800">{stock.symbol}</h3>
              <span
                className={`text-sm font-semibold ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)}%
              </span>
            </div>
            <p className="text-2xl font-bold mt-1">${stock.price.toFixed(2)}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data?.[0]?.history}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default StocksWidget;
