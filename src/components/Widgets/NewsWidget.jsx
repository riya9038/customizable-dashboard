import React from "react";
import { motion } from "framer-motion";
import useWidgetData from "../../hooks/useWidgetData";

const NewsWidget = () => {
  const { data, loading, error } = useWidgetData("news");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Failed to load news: {error}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <motion.ul
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {data?.map((newsItem, index) => (
          <motion.li
            key={newsItem.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <h4 className="font-bold text-purple-800 mb-2">{newsItem.title}</h4>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>{newsItem.source}</span>
              <span>{new Date(newsItem.publishedAt).toLocaleDateString()}</span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default NewsWidget;
