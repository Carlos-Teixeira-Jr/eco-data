"use client";

import { Breadcrumb } from "./components/navigation/Breadcrumb";
import Footer from "./components/navigation/Footer";
import Header from "./components/navigation/Header";
import "./globals.css";
import ReduxProvider from "./redux/provider/ReduxProvider";
import "leaflet/dist/leaflet.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Breadcrumb />
          <div className="max-w-[1366px] w-full mx-auto">
            <Header />
            <main>{children}</main>
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
