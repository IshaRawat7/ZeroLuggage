import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
// @ts-ignore
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import "leaflet/dist/leaflet.css";

// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroLuggage",
  description: "A Luggage Management System with Advanced Features.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className="antialiased">
        {children}

        {/* ToastContainer for react-toastify */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
