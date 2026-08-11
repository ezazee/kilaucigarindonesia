import { ReactNode } from "react";
import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | Kilau Cigar Indonesia",
    template: "%s | Admin Panel KCI",
  },
  description: "Dashboard admin Kilau Cigar Indonesia.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0b0b0c", color: "#f5f5f5" }}>
        {children}
      </body>
    </html>
  );
}
