// src/components/StatCard.jsx
export default function StatCard({ title, value, icon, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]} bg-opacity-20`}>
          <span className={`text-${color}-500 text-xl`}>{icon}</span>
        </div>
      </div>
    </div>
  );
}