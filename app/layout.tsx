import type { Metadata } from "next";
import siteContent from "@/content/site.json";
import "./globals.css";

const siteUrl = "https://johannamarie-star.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Johanna Marie Portfolio",
  description: siteContent.profile.siteDescription,
  alternates: { canonical: "/" },
  openGraph: { title: "Johanna Marie", description: siteContent.profile.professionalTitle, type: "website", url: siteUrl, images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Johanna Marie", description: siteContent.profile.professionalTitle, images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
