interface WeatherData {
  current: {
    temp: number;
    condition: string;
  };
  forecast: Array<{
    day: string;
    temp: number;
  }>;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  history: Array<{
    date: string;
    price: number;
  }>;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
}

// Mock API functions with simulated delays
export const fetchWeatherData = async (): Promise<WeatherData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    current: {
      temp: 22,
      condition: "Partly Cloudy",
    },
    forecast: [
      { day: "Mon", temp: 21 },
      { day: "Tue", temp: 23 },
      { day: "Wed", temp: 20 },
      { day: "Thu", temp: 19 },
      { day: "Fri", temp: 24 },
    ],
  };
};

export const fetchNewsData = async (): Promise<NewsItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    {
      id: "1",
      title: "New React Features Announced",
      source: "Tech News",
      publishedAt: "2023-05-15",
    },
    {
      id: "2",
      title: "Global Tech Conference Coming Soon",
      source: "Developer Weekly",
      publishedAt: "2023-05-14",
    },
    {
      id: "3",
      title: "Breaking: Major Software Update Released",
      source: "Digital Trends",
      publishedAt: "2023-05-13",
    },
  ];
};

export const fetchStockData = async (): Promise<StockData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return [
    {
      symbol: "AAPL",
      price: 175.34,
      change: 1.23,
      history: [
        { date: "May 1", price: 172.5 },
        { date: "May 2", price: 173.2 },
        { date: "May 3", price: 174.1 },
        { date: "May 4", price: 173.8 },
        { date: "May 5", price: 175.34 },
      ],
    },
    {
      symbol: "GOOGL",
      price: 125.67,
      change: -0.45,
      history: [
        { date: "May 1", price: 126.2 },
        { date: "May 2", price: 126.5 },
        { date: "May 3", price: 125.8 },
        { date: "May 4", price: 126.1 },
        { date: "May 5", price: 125.67 },
      ],
    },
  ];
};

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    {
      id: "1",
      title: "Team Meeting",
      date: "2023-05-15",
      time: "10:00 AM",
    },
    {
      id: "2",
      title: "Project Deadline",
      date: "2023-05-17",
    },
    {
      id: "3",
      title: "Client Call",
      date: "2023-05-18",
      time: "2:30 PM",
    },
  ];
};
