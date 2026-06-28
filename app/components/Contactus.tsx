"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const SERVICES = ["Web Dev", "Mobile App", "AI Integration", "Admin Panel", "Software Dev", "Other"];

const SOCIALS = [
  {
    label: "WhatsApp",
    value: "+94 77 819 5727 , +94 77 015 8854",
    href: "https://wa.me/94778195727",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: "#25D366",
  },
  {
    label: "Instagram",
    value: "@ravanatecsolutions",
    href: "https://instagram.com/ravanatecsolutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: "#E1306C",
  },
  {
    label: "Facebook",
    value: "Ravana Tech Solutions",
    href: "https://www.facebook.com/profile.php?id=61590397422978&mibextid=rS40aB7S9Ucbxw6v",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: "#1877F2",
  },
  {
    label: "TikTok",
    value: "@ravanatecsolutions",
    href: "https://www.tiktok.com/@ravana.tec.soluti?_r=1&_t=ZS-97aIwegmvpp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z"/>
      </svg>
    ),
    color: "#00E5CC",
  },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/webp",
];
const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Contact() {
  const { ref: headRef, visible: headVisible } = useInView();
  const { ref: formRef, visible: formVisible } = useInView(0.1);

  const [fields, setFields] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [services, setServices] = useState<string[]>([]);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleService = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const validateAndSetFile = useCallback((file: File) => {
    setFileError("");
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError("Only PDF, Word (.doc/.docx), and image files are accepted.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File too large. Max 10 MB (yours: ${formatBytes(file.size)}).`);
      return;
    }
    setAttachment(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  }, [validateAndSetFile]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
    e.target.value = "";
  };

  const removeAttachment = () => { setAttachment(null); setFileError(""); };

  const handleSubmit = async () => {
    if (!fields.name || !fields.email) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", fields.name);
      formData.append("email", fields.email);
      formData.append("whatsapp", fields.whatsapp);
      formData.append("services", JSON.stringify(services));
      formData.append("description", fields.message);
      if (attachment) formData.append("attachment", attachment);

      const res = await fetch("/api/contact", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#020810] text-[#E0EFFF] font-sans py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-[#00E5CC]/[0.04] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] max-w-[360px] max-h-[360px] rounded-full bg-[#7B61FF]/[0.05] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,229,204,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div
          ref={headRef}
          className="text-center mb-14 sm:mb-16 transition-all duration-700"
          style={{ opacity: headVisible ? 1 : 0, transform: headVisible ? "none" : "translateY(24px)" }}
        >
          <div className="inline-flex items-center gap-2 border border-[#00E5CC]/20 bg-[#00E5CC]/5 rounded-full px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#00E5CC] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] shadow-[0_0_6px_#00E5CC] animate-[blink_2s_infinite]" />
            Get In Touch
          </div>
          <h2 className="font-bold leading-tight text-[clamp(2rem,6vw,3.5rem)] mb-4">
            <span className="text-[#E0EFFF]">Let&apos;s Build </span>
            <span className="bg-gradient-to-r from-[#00E5CC] via-[#7B61FF] to-[#00C2FF] bg-clip-text text-transparent">Something</span>
          </h2>
          <p className="max-w-[440px] mx-auto text-[#4A6080] font-light text-[clamp(0.875rem,2vw,1rem)]">
            Tell us about your project. We&apos;ll respond within 24 hours.
          </p>
        </div>

        {/* Form card */}
        <div
          ref={formRef}
          className="rounded-2xl border border-[#00E5CC]/08 bg-white/[0.02] p-6 sm:p-10 relative overflow-hidden transition-all duration-700"
          style={{ opacity: formVisible ? 1 : 0, transform: formVisible ? "none" : "translateY(28px)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00E5CC] via-[#7B61FF] to-transparent opacity-60" />

          {!sent ? (
            <div className="flex flex-col gap-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name", placeholder: "Alex Johnson", type: "text" },
                  { key: "email", label: "Email Address", placeholder: "alex@company.com", type: "email" },
                ].map(f => (
                  <div key={f.key} className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-[#3A5070] uppercase">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={fields[f.key as "name" | "email"]}
                      onChange={e => setFields(p => ({ ...p, [f.key]: e.target.value }))}
                      className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-[#C0D8F0] text-sm placeholder-[#1E3050] outline-none focus:border-[#00E5CC]/40 focus:bg-[#00E5CC]/[0.02] transition-all duration-200 font-light"
                    />
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] tracking-widest text-[#3A5070] uppercase">WhatsApp Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#25D366]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={fields.whatsapp}
                    onChange={e => setFields(p => ({ ...p, whatsapp: e.target.value }))}
                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-10 pr-4 py-3 text-[#C0D8F0] text-sm placeholder-[#1E3050] outline-none focus:border-[#25D366]/40 focus:bg-[#25D366]/[0.02] transition-all duration-200 font-light"
                  />
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] tracking-widest text-[#3A5070] uppercase">Services Needed</label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleService(s)}
                      className="font-mono text-xs px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer"
                      style={{
                        background: services.includes(s) ? "rgba(0,229,204,0.1)" : "rgba(255,255,255,0.02)",
                        borderColor: services.includes(s) ? "#00E5CC50" : "rgba(255,255,255,0.06)",
                        color: services.includes(s) ? "#00E5CC" : "#2A4060",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] tracking-widest text-[#3A5070] uppercase">Tell Us More</label>
                <textarea
                  rows={4}
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  value={fields.message}
                  onChange={e => setFields(p => ({ ...p, message: e.target.value }))}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-[#C0D8F0] text-sm placeholder-[#1E3050] outline-none focus:border-[#00E5CC]/40 focus:bg-[#00E5CC]/[0.02] transition-all duration-200 font-light resize-none"
                />
              </div>

              {/* File Attachment */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] tracking-widest text-[#3A5070] uppercase">
                  Project Proposal / Attachment{" "}
                  <span className="text-[#1E3050] normal-case tracking-normal font-sans">(optional)</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_EXTENSIONS}
                  onChange={onFileChange}
                  className="hidden"
                />

                {!attachment ? (
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-all duration-200 group"
                    style={{
                      borderColor: dragOver ? "#00E5CC60" : "rgba(255,255,255,0.07)",
                      background: dragOver ? "rgba(0,229,204,0.04)" : "rgba(255,255,255,0.015)",
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl grid place-items-center transition-all duration-200"
                      style={{
                        background: dragOver ? "rgba(0,229,204,0.15)" : "rgba(0,229,204,0.06)",
                        color: "#00E5CC",
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-[#4A6080] text-sm">
                        <span className="text-[#00E5CC] group-hover:underline">Click to upload</span> or drag &amp; drop
                      </p>
                      <p className="font-mono text-[10px] text-[#1E3050] tracking-wide mt-1">
                        PDF &middot; DOC &middot; DOCX &middot; PNG &middot; JPG &middot; WEBP &nbsp;&middot;&nbsp; Max 10 MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-[#00E5CC]/20 bg-[#00E5CC]/[0.04] px-4 py-3">
                    <div className="w-9 h-9 rounded-lg grid place-items-center flex-shrink-0 bg-[#00E5CC]/10 text-[#00E5CC]">
                      {attachment.type === "application/pdf" ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"/>
                        </svg>
                      ) : attachment.type.startsWith("image/") ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M8.5 13.5L11 16.5L14.5 12L19 18H5L8.5 13.5ZM21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19Z"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#C0D8F0] text-sm truncate">{attachment.name}</p>
                      <p className="font-mono text-[10px] text-[#2A4060] mt-0.5">{formatBytes(attachment.size)}</p>
                    </div>
                    <button
                      onClick={removeAttachment}
                      className="flex-shrink-0 w-7 h-7 rounded-lg grid place-items-center text-[#2A4060] hover:text-[#E05C5C] hover:bg-[#E05C5C]/10 transition-all duration-200"
                      title="Remove file"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                      </svg>
                    </button>
                  </div>
                )}

                {fileError && (
                  <p className="text-[#E05C5C] font-mono text-[10px] tracking-wide">{fileError}</p>
                )}
              </div>

              {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <p className="text-[#1E3050] font-mono text-[10px] tracking-wide">
                  🔒 Your details are kept confidential.
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-br from-[#00E5CC] to-[#7B61FF] text-white font-medium rounded-full text-sm px-8 py-3 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,229,204,0.25)] transition-all duration-200 cursor-pointer whitespace-nowrap w-full sm:w-auto text-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="w-16 h-16 rounded-full grid place-items-center border border-[#00E5CC]/30 bg-[#00E5CC]/10 text-2xl text-[#00E5CC] shadow-[0_0_30px_rgba(0,229,204,0.2)]">
                ✓
              </div>
              <h3 className="font-bold text-[#D0E8FF] text-xl">Message Received!</h3>
              <p className="text-[#3A5070] text-sm max-w-[300px]">
                We&apos;ll review your project and get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setFields({ name: "", email: "", whatsapp: "", message: "" });
                  setServices([]);
                  setAttachment(null);
                  setFileError("");
                }}
                className="font-mono text-xs text-[#00E5CC] border border-[#00E5CC]/25 px-5 py-2 rounded-full hover:bg-[#00E5CC] hover:text-[#030A10] transition-all duration-200 mt-2"
              >
                Send Another
              </button>
            </div>
          )}
        </div>

        {/* Info strip */}
        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700"
          style={{ opacity: formVisible ? 1 : 0, transitionDelay: "350ms" }}
        >
          {[
            { icon: "◎", label: "Response Time", value: "< 24 hours" },
            { icon: "◈", label: "First Call", value: "Free of charge" },
            { icon: "⬡", label: "NDA", value: "Signed on request" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3">
              <span className="text-[#00E5CC] text-lg">{item.icon}</span>
              <div>
                <div className="font-mono text-[10px] text-[#2A4060] tracking-widest uppercase">{item.label}</div>
                <div className="text-[#7A9ABE] text-sm">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div
          className="mt-10 transition-all duration-700"
          style={{ opacity: formVisible ? 1 : 0, transitionDelay: "500ms" }}
        >
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-8">
            <p className="font-mono text-[10px] tracking-widest text-[#2A4060] uppercase mb-5">Find Us On</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOCIALS.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 group hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span
                    className="w-9 h-9 rounded-lg grid place-items-center flex-shrink-0 transition-all duration-200"
                    style={{ color: social.color, background: `${social.color}15` }}
                  >
                    {social.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-widest text-[#2A4060] uppercase">{social.label}</div>
                    <div className="text-[#7A9ABE] text-sm truncate group-hover:text-[#C0D8F0] transition-colors duration-200">{social.value}</div>
                  </div>
                  <span className="ml-auto text-[#1E3050] group-hover:text-[#3A5070] text-xs transition-colors duration-200">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-20 sm:mt-28 border-t border-[#00E5CC]/[0.08] pt-8 text-center">
        <div className="flex items-center justify-center mb-3">
          <Image src={logo} alt="Ravana Tech Solutions" width={140} height={48} className="object-contain" />
        </div>
        <p className="text-[#1A2D40] font-mono text-[10px] tracking-widest">
          © {new Date().getFullYear()} Ravana Tech Solutions. All rights reserved.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Share+Tech+Mono&display=swap');
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
      `}</style>
    </section>
  );
}