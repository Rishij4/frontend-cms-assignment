import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CMS Admin",
  description: "Dynamic Content Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}