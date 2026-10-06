"use client";

import { company } from "@/lib/data";

/** Opens a WhatsApp chat with Mayank Dhiman, pre-filled with a short
 *  message. Shown site-wide as a round, icon-only button at the bottom-right. */
export default function WhatsAppButton() {
  const mayank = company.contacts.find((c) => c.name === "Mayank Dhiman") ?? company.contacts[1];
  const phone = mayank.phone.replace(/\D/g, ""); // digits only, e.g. 917719650621
  const text = encodeURIComponent(
    "Hi, I'd like to know more about Shree Balaji Industries."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${mayank.name} on WhatsApp`}
      title={`WhatsApp ${mayank.name}`}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center h-14 w-14 bg-[#25D366] text-white shadow-lg shadow-black/30 hover:bg-[#1ebe5a] transition-colors rounded-full"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39c1.45.79 3.08 1.21 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.78 14.1c-.24.68-1.4 1.3-1.93 1.37-.49.07-1.1.1-1.78-.11a16.3 16.3 0 01-1.62-.6c-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.74-2.08 1-2.37c.26-.28.56-.35.75-.35h.54c.17 0 .4-.02.62.48.24.56.8 1.95.87 2.09.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.29.3-.12.58.17.28.74 1.22 1.59 1.98 1.1.98 2.02 1.28 2.3 1.43.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
      </svg>
    </a>
  );
}
