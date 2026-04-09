import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import PhysicsToy from "@/components/PhysicsToy";
import { PhysicsProvider } from "@/components/PhysicsProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://ruddrakantaria.com"),
  title: {
    default: "Ruddra Kantaria",
    template: "%s · Ruddra Kantaria",
  },
  description:
    "Hey I'm Ruddra! Currently a computer science student at the University of Waterloo. Building at BlueDot. Interested in full-stack development, machine learning, and data systems.",
  authors: [{ name: "Ruddra Kantaria" }],
  openGraph: {
    title: "Ruddra Kantaria",
    description:
      "Personal site of Ruddra Kantaria — computer science student at the University of Waterloo.",
    url: "https://ruddrakantaria.com",
    type: "website",
  },
};

// Inline script that runs before paint to prevent theme flash.
const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
        <div aria-hidden="true" className="grain" />
        <ThemeProvider>
          <PhysicsProvider>
            <Nav />
            <main className="flex-1 flex flex-col">
              <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 pt-28">
                {children}
                <Footer />
              </div>
            </main>
            <Cursor />
            <PhysicsToy />
          </PhysicsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
