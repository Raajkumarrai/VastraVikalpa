import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "January",
//     users: 4000,
//     pv: 2400,
//     delivered: 2400,
//   },
//   {
//     name: "February",
//     users: 3000,
//     order: 1398,
//     delivered: 2210,
//   },
//   {
//     name: "March",
//     users: 2000,
//     order: 9800,
//     delivered: 2290,
//   },
//   {
//     name: "April",
//     users: 2780,
//     order: 3908,
//     delivered: 2000,
//   },
//   {
//     name: "May",
//     users: 1890,
//     order: 4800,
//     delivered: 2181,
//   },
//   {
//     name: "June",
//     users: 2390,
//     order: 3800,
//     delivered: 2500,
//   },
// ];

export default class Barchart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    const { data } = this.props;
    return (
      <div className="chart !max-w-[1300px] min-w-[400px]">
        <div className="font-semibold tracking-wide opacity-60 mb-2 ml-10">
          Six Month Data
        </div>
        <ResponsiveContainer width="100%" aspect={2 / 0.87}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
            <Bar dataKey="order" fill="#82ca9d" />
            <Bar dataKey="delivered" fill="#FF6F61" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
