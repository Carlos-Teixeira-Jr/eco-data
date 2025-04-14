"use client";

import { Breadcrumb } from "./components/navigation/Breadcrumb";
import Footer from "./components/navigation/Footer";
import Header from "./components/navigation/Header";
import "./globals.css";
import ReduxProvider from "./redux/provider/ReduxProvider";
import 'leaflet/dist/leaflet.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          {<Breadcrumb />}
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
