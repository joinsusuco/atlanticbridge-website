"use client";

import { useState, useEffect } from "react";
import type { ShippingSchedule } from "@/config/shipping-schedule";

interface ScheduleForm {
  departure_date: string;
  arrival_date: string;
  booking_deadline: string;
  departure_port: string;
  arrival_port: string;
  show_banner: boolean;
}

function ScheduleEditor({
  title,
  type,
  schedule,
  password,
  onSaved,
}: {
  title: string;
  type: "container" | "gp";
  schedule: ShippingSchedule;
  password: string;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ScheduleForm>({
    departure_date: schedule.departure_date,
    arrival_date: schedule.arrival_date,
    booking_deadline: schedule.booking_deadline,
    departure_port: schedule.departure_port,
    arrival_port: schedule.arrival_port,
    show_banner: schedule.show_banner,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/schedules", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ type, ...form }),
      });

      if (res.ok) {
        setMessage({ text: "Saved!", ok: true });
        onSaved();
      } else {
        setMessage({ text: "Failed to save", ok: false });
      }
    } catch {
      setMessage({ text: "Network error", ok: false });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold appearance-none";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-navy mb-6">{title}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">
            Departure Date
          </label>
          <input
            type="text"
            value={form.departure_date}
            onChange={(e) => setForm({ ...form, departure_date: e.target.value })}
            className={inputClass}
            placeholder="e.g., July 15, 2026 or TBD"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1">
            Arrival Date
          </label>
          <input
            type="text"
            value={form.arrival_date}
            onChange={(e) => setForm({ ...form, arrival_date: e.target.value })}
            className={inputClass}
            placeholder="e.g., August 20, 2026 or TBD"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1">
            Booking Deadline
          </label>
          <input
            type="text"
            value={form.booking_deadline}
            onChange={(e) => setForm({ ...form, booking_deadline: e.target.value })}
            className={inputClass}
            placeholder="e.g., July 5, 2026 or TBD"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1">
            Departure Port
          </label>
          <input
            type="text"
            value={form.departure_port}
            onChange={(e) => setForm({ ...form, departure_port: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1">
            Arrival Port
          </label>
          <input
            type="text"
            value={form.arrival_port}
            onChange={(e) => setForm({ ...form, arrival_port: e.target.value })}
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.show_banner}
            onChange={(e) => setForm({ ...form, show_banner: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
          />
          <span className="text-sm font-medium text-navy">Show departure banner on website</span>
        </label>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gold text-navy font-bold rounded-full hover:bg-gold-light transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {message && (
          <span className={`text-sm font-medium ${message.ok ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </span>
        )}
      </div>

      {schedule.updated_at && (
        <p className="mt-4 text-xs text-gray-400">
          Last updated: {new Date(schedule.updated_at).toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [schedules, setSchedules] = useState<{
    container: ShippingSchedule;
    gp: ShippingSchedule;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/schedules", {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.ok) {
        const data = await res.json();
        setSchedules(data);
        setAuthenticated(true);
      } else {
        setError("Wrong password");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      const res = await fetch("/api/admin/schedules", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        setSchedules(await res.json());
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-pw");
    if (saved) {
      setPassword(saved);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      sessionStorage.setItem("admin-pw", password);
    }
  }, [authenticated, password]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-navy text-center mb-8">Admin Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              inputMode="text"
              className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold mb-4 appearance-none"
              style={{ fontSize: "16px", touchAction: "manipulation" }}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-6 py-4 text-base bg-gold text-navy font-bold rounded-full hover:bg-gold-light transition-all disabled:opacity-50"
            >
              {loading ? "Checking..." : "Login"}
            </button>
            {error && <p className="mt-3 text-red-600 text-sm text-center">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (!schedules) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-navy mb-2">Departure Schedules</h1>
        <p className="text-gray-600 mb-8">Update departure dates from here. Changes go live immediately.</p>

        <div className="space-y-8">
          <ScheduleEditor
            title="Container Shipping"
            type="container"
            schedule={schedules.container}
            password={password}
            onSaved={refresh}
          />
          <ScheduleEditor
            title="GP Shipping (Parcels)"
            type="gp"
            schedule={schedules.gp}
            password={password}
            onSaved={refresh}
          />
        </div>

        <button
          onClick={() => {
            setAuthenticated(false);
            setPassword("");
            sessionStorage.removeItem("admin-pw");
          }}
          className="mt-10 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
