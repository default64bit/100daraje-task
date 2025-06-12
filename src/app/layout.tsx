import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Simple Login",
    description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="dark">
                <Provider>
                    <main className="flex flex-col items-center justify-center gap-2 h-screen">{children}</main>
                </Provider>
            </body>
        </html>
    );
}
