import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

import { getAuthToken } from "../../shared/helpers/general-helper";
import { useAppDispatch } from "../../store";
import { getBookmarkRepositoriesChartData } from "../app/app.actions";

// Register required chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the type for bookmark data
interface Bookmark {
  _id: string;
  count: number;
}

export const BookmarkGraph: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [labels, setLabels] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    const response = await dispatch(getBookmarkRepositoriesChartData());
    if (response?.data) {
      processData(response.data);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login");
    } else {
      loadData();
    }
  }, []);

  const processData = (bookmarks: Bookmark[]) => {
    const dateMap: { [key: string]: number } = {};

    bookmarks.forEach((bookmark: Bookmark) => {
      dateMap[bookmark._id] = bookmark.count;
    });

    setLabels(Object.keys(dateMap));
    setData(Object.values(dateMap));
  };

  return (
    <div>
      <h2>Chart</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Number of Bookmarks",
              data,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Bookmarks",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};
