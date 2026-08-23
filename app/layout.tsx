import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Johanna Marie Portfolio",
  description: "Johanna Marie is a marketing specialist and content writer creating thoughtful, audience-focused work.",
  openGraph: { title: "Johanna Marie", description: "Marketing Specialist / Content Writer", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Johanna Marie", description: "Marketing Specialist / Content Writer", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
