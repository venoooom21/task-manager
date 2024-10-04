import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Line } from "react-chartjs-2";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({
    totalTodos: 0,
    completedTodos: 0,
    inProgressTodos: 0,
  });

  const [chartData, setChartData] = useState({
    completedToday: 0,
    completedThisWeek: 0,
    completedThisMonth: 0,
  });

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsResponse = await axios.get("/api/todos/stats");
        setStats(statsResponse.data);

        const chartResponse = await axios.get("/api/todos/completed-stats");
        setChartData(chartResponse.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const lineChartData = {
    labels: ["Today", "This Week", "This Month"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [chartData.completedToday, chartData.completedThisWeek, chartData.completedThisMonth],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="assignment"
                title="Total Todos"
                count={stats.totalTodos}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Completed Todos"
                count={stats.completedTodos}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="checklist"
                title="In Progress"
                count={stats.inProgressTodos}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Completed Tasks Line Chart */}
        <MDBox mt={4}>
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Completed Tasks Over Time",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
