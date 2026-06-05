import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Carletti Fit",
  description: "Elite Coaching SaaS",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Carletti Fit",
  },
  icons: {
    apple: "/icon-512.png",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add,add_shopping_cart,analytics,bolt,calendar_today,calendar_upcoming,calendar_view_week,cancel,chat,check_circle,chevron_right,close,dashboard,delete,edit,filter_list,fitness_center,group,home,layers,logout,menu_book,notifications,notifications_active,person_add,person_celebrate,play_arrow,play_circle,psychology,schedule,settings,shopping_bag,smartphone,star,store,trending_up,verified,visibility,warning" />
      </head>
      <body className={`${manrope.variable} ${inter.variable} font-sans antialiased text-white bg-[#0a0a0a]`}>
         <AuthProvider>
           {children}
         </AuthProvider>
      </body>
    </html>
  );
}
