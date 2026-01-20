"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type PieChartProps = {
  labels: string[];
  values: number[];
  unit?: string;
  title?: string;
  total?: number;
};

export default function PieChart({ labels, values, unit = "", title, total }: PieChartProps) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#2563eb",
          "#dc2626",
          "#16a34a",
          "#f97316",
          "#7c3aed",
          "#0ea5e9",
        ],
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false, // 👈 để co giãn theo cột
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          boxWidth: 14,
          boxHeight: 14,
          padding: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.label}: ${ctx.parsed.toLocaleString()} ${unit}`,
        },
      },
      datalabels: {
        color: "#fff",
        backgroundColor: (ctx) => {
          const bg = ctx.dataset.backgroundColor as string[];
          return bg[ctx.dataIndex];
        },
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 6,
        padding: 6,
        font: {
          size: 11,
        },
        textStrokeColor: "rgba(0,0,0,0.25)",
        textStrokeWidth: 1,
        formatter: (value: number) => `${value.toLocaleString()} ${unit}`,
      },
    },
  };
  return (
    <div
      style={{
        width: "100%",
        height: 360,
        padding: 12,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      {title && (
        <div
          style={{
            textAlign: "center",
            fontWeight: 600,
            marginBottom: 8,
            color: "#333",
          }}
        >
          {title}
        </div>
      )}

      <div style={{ position: "relative", height: 300 }}>
        <Pie data={data} options={options} />

        {total !== undefined && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
              color: "#111",
            }}
          >
            Tổng: {total.toLocaleString()} {unit}
          </div>
        )}
      </div>
    </div>
  );
}
