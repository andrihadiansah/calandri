import type { Metadata } from "next";
import "./globals.css";
import { fontMono, fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = {
  title: {
    default: `CalAndri`,
    template: `%s | CalAndri`,
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} min-h-screen font-mono antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
