import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Learnnova ? ???? ??????? ?????? ????",
  description: "AI-powered student assistant with study, sleep, habits, and chat",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mr" className="dark">
      <body>
        <header className="border-b border-blueSoft/40 bg-blueDeep/60">
          <div className="container-page flex items-center justify-between py-4 gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gold text-black grid place-items-center font-extrabold">L</div>
              <div>
                <div className="text-lg font-semibold tracking-wide">Learnnova</div>
                <div className="text-xs text-gray-300">???? ??????? ?????? ????</div>
              </div>
            </Link>
            <nav className="flex gap-2 text-sm">
              <Link className="btn btn-secondary" href="/study">??????</Link>
              <Link className="btn btn-secondary" href="/sleep">???</Link>
              <Link className="btn btn-secondary" href="/habits">????</Link>
              <Link className="btn btn-primary" href="/chat">AI ???</Link>
              <Link className="btn btn-secondary" href="/settings">????????</Link>
            </nav>
          </div>
        </header>
        <main className="container-page">{children}</main>
        <footer className="container-page text-center text-xs text-gray-400 py-10">? {new Date().getFullYear()} Learnnova</footer>
      </body>
    </html>
  );
}
