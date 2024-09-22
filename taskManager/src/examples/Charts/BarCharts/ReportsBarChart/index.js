import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "./data"; // Assuming chartData is an array of objects with keys 'name' and 'total'

const Chart = () => {
  return (
    <ResponsiveContainer width={500} height={500}>
      <BarChart data={chartData} width={500} height={40}>
        <XAxis dataKey={"name"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey={"total"} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
