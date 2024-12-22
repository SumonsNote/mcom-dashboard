// "use client";

// import { useEffect, useRef } from "react";

// const data = [
//   { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
//   { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
// ];

// export function AnalyticsOverview() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       const ctx = canvasRef.current.getContext("2d");
//       if (ctx) {
//         const maxTotal = Math.max(...data.map((item) => item.total));
//         const canvasHeight = canvasRef.current.height;
//         const canvasWidth = canvasRef.current.width;
//         const barWidth = canvasWidth / data.length - 10;

//         ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//         data.forEach((item, index) => {
//           const barHeight = (item.total / maxTotal) * canvasHeight;
//           const x = index * (barWidth + 10) + 5;
//           const y = canvasHeight - barHeight;

//           ctx.fillStyle = "#4CAF50";
//           ctx.fillRect(x, y, barWidth, barHeight);

//           ctx.fillStyle = "#000";
//           ctx.font = "12px Arial";
//           ctx.textAlign = "center";
//           ctx.fillText(item.name, x + barWidth / 2, canvasHeight - 5);
//           ctx.fillText(`$${item.total}`, x + barWidth / 2, y - 5);
//         });
//       }
//     }
//   }, []);

//   return (
//     <div className="w-full">
//       <canvas
//         ref={canvasRef}
//         width={600}
//         height={300}
//         className="w-full"
//       ></canvas>
//     </div>
//   );
// }
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function AnalyticsOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
