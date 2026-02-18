import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#9ca3af"];

const AnalyticsDashboard = ({ candidates = [] }) => {
  const total = candidates.length;

  const shortlisted = candidates.filter(
    (c) => c.status === "shortlisted"
  ).length;

  const rejected = candidates.filter(
    (c) => c.status === "rejected"
  ).length;

  const pending = total - shortlisted - rejected;

  const avgScore =
    total === 0
      ? 0
      : Math.round(
          candidates.reduce((sum, c) => sum + (c.finalScore || 0), 0) / total
        );

  const barData = candidates.map((c) => ({
    name: c.name || "Candidate",
    score: c.finalScore || 0,
  }));

  // ⭐ Avg score chart data
  const avgScoreData = [
    { name: "Avg Score", score: avgScore },
  ];

  const pieData = [
    { name: "Shortlisted", value: shortlisted },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-xl font-bold">{total}</p>
          <p>Total</p>
        </div>
        <div>
          <p className="text-xl font-bold">{shortlisted}</p>
          <p>Shortlisted</p>
        </div>
        <div>
          <p className="text-xl font-bold">{rejected}</p>
          <p>Rejected</p>
        </div>
        <div>
          <p className="text-xl font-bold">{avgScore}%</p>
          <p>Avg Score</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-6 justify-items-center">
        {/* Candidate Scores */}
        <BarChart width={300} height={250} data={barData}>
          <XAxis dataKey="name" hide />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" fill="#3b82f6" />
        </BarChart>

        {/* Status Pie */}
        <PieChart width={300} height={250}>
          <Pie data={pieData} dataKey="value" outerRadius={80}>
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* ⭐ Avg Score Chart */}
        <BarChart width={200} height={250} data={avgScoreData}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" fill="#22c55e" />
        </BarChart>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
