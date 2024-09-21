import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--fira-code",
});

export const metadata: Metadata = {
	title: "Countries Population App",
	description: "A simple app to show countries population information",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${firaCode.className} antialiased`}>{children}</body>
		</html>
	);
}
