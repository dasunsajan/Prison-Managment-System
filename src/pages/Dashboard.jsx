function Dashboard() {
  const stats = [
    { label: "Total Prisoners", value: 6, color: "bg-blue-500" },
    { label: "Active Staff", value: 5, color: "bg-green-500" },
    { label: "Total Cells", value: 6, color: "bg-purple-500" },
    { label: "Open Incidents", value: 1, color: "bg-red-500" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">Dashboard</h1>
      <p className="text-slate-500 mb-8">Welcome to the Prison Management System</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow p-6">
            <div className={`w-10 h-10 rounded-lg ${s.color} mb-4`}></div>
            <p className="text-slate-500 text-sm">{s.label}</p>
            <p className="text-3xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;