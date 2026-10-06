"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface InquiryItem {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<any>(null);

  const fetchStatusAndInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      // Check db health
      const healthRes = await fetch("/api/health");
      const healthData = await healthRes.json();
      setDbStatus(healthData);

      // Fetch inquiries
      const res = await fetch("/api/inquiry");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      } else {
        setError(data.error || "Failed to load inquiries.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to backend API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusAndInquiries();
  }, []);

  return (
    <div className="min-h-screen bg-[#121110] text-[#f4f0e8] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-[#2a2725] gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#c98a52] mb-1">
              Shree Balaji Industries · Admin
            </p>
            <h1 className="text-3xl font-serif">Customer Inquiries</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchStatusAndInquiries}
              className="px-4 py-2 border border-[#3a3532] text-xs uppercase tracking-widest hover:border-[#c98a52] hover:text-[#c98a52] transition-colors"
            >
              Refresh
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-[#f4f0e8] text-[#121110] text-xs uppercase tracking-widest hover:bg-[#c98a52] transition-colors"
            >
              View Site
            </Link>
          </div>
        </div>

        {/* Database Status Card */}
        <div className="mt-8 p-4 bg-[#1b1918] border border-[#2a2725] rounded-none flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${
                dbStatus?.database === "connected"
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />
            <span className="text-sm font-medium">
              Database Status:{" "}
              <span className="text-[#c98a52] capitalize">
                {dbStatus?.database || "Checking..."}
              </span>
            </span>
          </div>
          {dbStatus?.databaseName && (
            <span className="text-xs text-[#a09a93]">
              Database: <span className="text-white">{dbStatus.databaseName}</span>
            </span>
          )}
        </div>

        {/* Inquiries List */}
        <div className="mt-8">
          {loading ? (
            <div className="py-20 text-center text-[#a09a93]">
              <div className="inline-block w-8 h-8 border-2 border-[#c98a52] border-t-transparent rounded-full animate-spin mb-4" />
              <p>Loading inquiries from MongoDB...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-950/30 border border-red-800 text-red-300">
              <p className="font-semibold mb-1">Connection Notice</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-3 text-red-400">
                Ensure `MONGODB_URI` is correctly provided in `.env.local` and your IP address is whitelisted in MongoDB Atlas.
              </p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[#2a2725] p-12">
              <p className="text-lg text-[#a09a93] font-serif">No inquiries yet.</p>
              <p className="text-sm text-[#706a64] mt-2">
                Submissions from the Contact page form will be recorded in MongoDB and displayed here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs tracking-widest text-[#a09a93] uppercase">
                Total Inquiries ({inquiries.length})
              </p>
              <div className="grid gap-4">
                {inquiries.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 bg-[#181615] border border-[#2a2725] hover:border-[#c98a52]/40 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#252220] pb-4 mb-4">
                      <div>
                        <h2 className="text-xl font-serif text-[#f4f0e8]">{item.name}</h2>
                        <span className="inline-block mt-1 text-xs px-2.5 py-0.5 bg-[#c98a52]/15 text-[#c98a52] border border-[#c98a52]/30 uppercase tracking-wider">
                          {item.service}
                        </span>
                      </div>
                      <div className="text-xs text-[#a09a93]">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#706a64] block mb-1">
                          Phone
                        </span>
                        <a
                          href={`tel:${item.phone}`}
                          className="text-[#f4f0e8] hover:text-[#c98a52] transition-colors"
                        >
                          {item.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#706a64] block mb-1">
                          Email
                        </span>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-[#f4f0e8] hover:text-[#c98a52] transition-colors break-all"
                        >
                          {item.email}
                        </a>
                      </div>
                    </div>

                    {item.message && (
                      <div className="pt-3 border-t border-[#252220]">
                        <span className="text-xs uppercase tracking-widest text-[#706a64] block mb-1">
                          Message
                        </span>
                        <p className="text-sm text-[#d4cecb] whitespace-pre-wrap leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
