"use clinet";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/line-chart-with-customized-label-hs5b7";

  render() {
    const { data } = this.props;
    return (
      <div className="chart !max-w-[1300px] min-w-[400px]">
        <div className="font-semibold tracking-wide opacity-60 ml-10">
          Six Month Activities
        </div>
        <ResponsiveContainer width="100%" aspect={3 / 1}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="totalOrder"
              stroke="#8684d8"
              label={<CustomizedLabel />}
            />
            <Line
              type="monotone"
              dataKey="delivered"
              stroke="#FF6F61"
              label={<CustomizedLabel />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
