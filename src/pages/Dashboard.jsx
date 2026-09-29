import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const authCfg = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

const COMMON = [
  { name: "fullName", label: "Full Name", required: true },
  { name: "nic", label: "NIC Number" },
  { name: "phone", label: "Phone" },
  { name: "dateOfBirth", label: "Birthday", type: "date" },
  { name: "address", label: "Address" },
];

const TYPES = {
  prisoner: { label: "Prisoners", fields: [
    { name: "caseNumber", label: "Case Number", required: true },
    { name: "cellNumber", label: "Cell Number" },
    { name: "offence", label: "Offence" },
    { name: "admissionDate", label: "Admission Date", type: "date" },
    { name: "sentenceYears", label: "Sentence (years)", type: "number" },
  ]},
  doctor: { label: "Doctors", fields: [
    { name: "licenseNumber", label: "SLMC Reg. No.", required: true },
    { name: "specialization", label: "Specialization" },
  ]},
  visitor: { label: "Visitors", fields: [
    { name: "visitingPrisoner", label: "Visiting Prisoner" },
    { name: "relationship", label: "Relationship" },
    { name: "visitDate", label: "Visit Date", type: "date" },
    { name: "purpose", label: "Purpose" },
  ]},
  staff: { label: "Other Staff", fields: [
    { name: "department", label: "Department" },
    { name: "jobTitle", label: "Job Title" },
  ]},
};

const inputClass =
  "w-full border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [tab, setTab] = useState("prisoner");
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(null); // null = form eka close
  const [error, setError] = useState("");
  const [invite, setInvite] = useState({ badgeNumber: "", fullName: "" });
  const [inviteCode, setInviteCode] = useState("");

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }, [navigate]);

  const load = useCallback(async () => {
    try {
      const res = await api.get(`/people/${tab}`, { ...authCfg(), params: { q: search } });
      setRows(res.data);
    } catch (err) {
      if ([401, 403].includes(err.response?.status)) logout();
      else setError("Failed to load records");
    }
  }, [tab, search, logout]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    else load();
  }, [load, navigate]);

  const switchTab = (t) => { setTab(t); setSearch(""); setForm(null); setError(""); };

  const openNew = () => { setError(""); setForm({ fullName: "", nic: "", phone: "", dateOfBirth: "", address: "", details: {} }); };
  const openEdit = (row) => {
    setError("");
    setForm({ ...row, dateOfBirth: row.dateOfBirth ? row.dateOfBirth.slice(0, 10) : "", details: { ...row.details } });
  };

  const value = (f) => (f.detail ? form.details?.[f.name] : form[f.name]) ?? "";
  const change = (f, v) =>
    f.detail ? setForm({ ...form, details: { ...form.details, [f.name]: v } }) : setForm({ ...form, [f.name]: v });

  const save = async (e) => {
    e.preventDefault();
    setError("");
    const { fullName, nic, phone, address, dateOfBirth, details } = form;
    const payload = { fullName, nic, phone, address, dateOfBirth, details };
    try {
      if (form._id) await api.put(`/people/${tab}/${form._id}`, payload, authCfg());
      else await api.post(`/people/${tab}`, payload, authCfg());
      setForm(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete ${row.fullName}? This cannot be undone.`)) return;
    try {
      await api.delete(`/people/${tab}/${row._id}`, authCfg());
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const createInvite = async (e) => {
    e.preventDefault();
    setInviteCode("");
    try {
      const res = await api.post("/admin/invites", invite, authCfg());
      setInviteCode(res.data.code);
      setInvite({ badgeNumber: "", fullName: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Could not create invite");
    }
  };

  const t = TYPES[tab];
  const allFields = [...COMMON, ...t.fields.map((f) => ({ ...f, detail: true }))];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold">🏛️ Prison of Welikada · IT Section</h1>
        <div className="text-sm flex items-center gap-4">
          <span>{user?.fullName} ({user?.role})</span>
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {user?.role === "admin" && (
          <form onSubmit={createInvite} className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="font-semibold text-slate-700 mb-2">Create officer invite code</h2>
            <div className="flex flex-wrap gap-2">
              <input placeholder="Officer full name" required value={invite.fullName}
                onChange={(e) => setInvite({ ...invite, fullName: e.target.value })} className={inputClass + " md:w-64"} />
              <input placeholder="Badge number" required value={invite.badgeNumber}
                onChange={(e) => setInvite({ ...invite, badgeNumber: e.target.value })} className={inputClass + " md:w-48"} />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg">Generate</button>
            </div>
            {inviteCode && (
              <p className="mt-3 text-sm">
                Code: <span className="font-mono font-bold text-lg">{inviteCode}</span>{" "}
                <span className="text-slate-500">(valid 48 hours, one-time. Give it to the officer directly. It won't be shown again.)</span>
              </p>
            )}
          </form>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(TYPES).map(([key, v]) => (
            <button key={key} onClick={() => switchTab(key)}
              className={`px-4 py-2 rounded-lg ${tab === key ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}>
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <input placeholder="Search by name or NIC..." value={search}
            onChange={(e) => setSearch(e.target.value)} className={inputClass} />
          <button onClick={openNew} className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg whitespace-nowrap">
            + Add
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {form && (
          <form onSubmit={save} className="bg-white p-4 rounded-xl shadow mb-4">
            <h2 className="font-semibold text-slate-700 mb-3">{form._id ? "Edit" : "Add"} · {t.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {allFields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm text-slate-600 mb-1">{f.label}</label>
                  <input type={f.type || "text"} value={value(f)} required={f.required}
                    onChange={(e) => change(f, e.target.value)} className={inputClass} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Save</button>
              <button type="button" onClick={() => setForm(null)} className="bg-slate-200 px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Name</th><th className="p-3">NIC</th><th className="p-3">Phone</th>
                {t.fields.slice(0, 3).map((f) => <th key={f.name} className="p-3">{f.label}</th>)}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={7} className="p-4 text-center text-slate-400">No records found</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-3">{r.fullName}</td>
                  <td className="p-3">{r.nic}</td>
                  <td className="p-3">{r.phone}</td>
                  {t.fields.slice(0, 3).map((f) => (
                    <td key={f.name} className="p-3">{String(r.details?.[f.name] ?? "").slice(0, 30)}</td>
                  ))}
                  <td className="p-3 whitespace-nowrap">
                    <button onClick={() => openEdit(r)} className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => remove(r)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;