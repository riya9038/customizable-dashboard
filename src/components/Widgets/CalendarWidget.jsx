import React from "react";
import { motion } from "framer-motion";
import useWidgetData from "../../hooks/useWidgetData";

const CalendarWidget = () => {
  const { data, loading, error } = useWidgetData("calendar");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Failed to load calendar events: {error}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <motion.ul
        className="divide-y divide-green-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {data?.map((event) => (
          <motion.li
            key={event.id}
            className="py-3 px-2 hover:bg-green-50 rounded-lg transition-colors"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-start">
              <div className="bg-green-100 text-green-800 rounded-lg p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString()} • {event.time}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default CalendarWidget;
