import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

const inputClass =
  "w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

const SECTIONS = [
  { titleKey: "sectionVerification", fields: [
    { name: "badgeNumber", labelKey: "fieldBadgeNumber" },
    { name: "inviteCode", labelKey: "fieldInviteCode" },
  ]},
  { titleKey: "sectionPersonal", fields: [
    { name: "fullName", labelKey: "fieldFullName" },
    { name: "rank", labelKey: "fieldRank" },
    { name: "nic", labelKey: "fieldNic", pattern: "([0-9]{9}[vVxX]|[0-9]{12})", title: "e.g. 123456789V or 200012345678" },
    { name: "phone", labelKey: "fieldPhone", pattern: "0[0-9]{9}", title: "10 digits, e.g. 0771234567" },
    { name: "email", labelKey: "fieldEmailOptional", type: "email", optional: true, span: true },
  ]},
  { titleKey: "sectionLogin", fields: [
    { name: "username", labelKey: "username", span: true },
    { name: "password", labelKey: "password", type: "password", minLength: 6 },
    { name: "confirmPassword", labelKey: "fieldConfirmPassword", type: "password", minLength: 6 },
  ]},
];

function Register() {
  const { t, lang, changeLang } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    badgeNumber: "", inviteCode: "", fullName: "", rank: "", nic: "", phone: "",
    email: "", username: "", password: "", confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      delete payload.confirmPassword;
      await api.post("/register", payload);
      alert(t("registerSuccess"));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || t("registerFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 py-10 px-4">
      <div className="absolute top-5 right-5">
        <select
          translate="no"
          value={lang}
          onChange={(e) => changeLang(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm cursor-pointer shadow-sm"
        >
          <option value="en">English</option>
          <option value="si">සිංහල</option>
          <option value="ta">தமிழ்</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏛️</div>
          <h1 className="text-2xl font-bold text-slate-800">{t("registerTitle")}</h1>
          <p className="text-slate-500 text-sm mt-1">{t("registerSubtitle")}</p>
          <p className="text-slate-400 text-xs mt-2">
            {t("registerInviteNote")}
          </p>
        </div>

        {SECTIONS.map((s) => (
          <div key={s.titleKey}>
            <h2 className="font-semibold text-slate-700 mt-4 mb-2">{t(s.titleKey)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              {s.fields.map((f) => (
                <div key={f.name} className={`mb-3 ${f.span ? "md:col-span-2" : ""}`}>
                  <label className="block text-sm text-slate-600 mb-1">{t(f.labelKey)}</label>
                  <input
                    name={f.name}
                    type={f.type || "text"}
                    value={form[f.name]}
                    onChange={handleChange}
                    required={!f.optional}
                    pattern={f.pattern}
                    title={f.title}
                    minLength={f.minLength}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {error && <p className="text-red-500 text-sm my-3 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition disabled:opacity-50 mt-2"
        >
          {loading ? t("creatingAccount") : t("createAccount")}
        </button>

        <p className="text-center text-sm text-slate-500 mt-4">
          {t("alreadyHaveAccount")}{" "}
          <Link to="/" className="text-blue-600 hover:underline">{t("login")}</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;