import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Vizualverse",
  description: "A premier 3D visualization agency based in Dubai",
  icons: {
    icon: "https://res.cloudinary.com/dxq0o9tgw/image/upload/vizualverse/footerlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
