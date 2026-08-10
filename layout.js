// app/layout.js
import "./globals.css";

export const metadata = {
  title: "TailorApply — Match your resume to the job in 30 seconds",
  description:
    "Paste your resume and a job link. TailorApply rewrites your bullets to match the posting and drafts a cover letter — in under 30 seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
