import "./globals.css";
import type { Metadata } from "next";
export const metadata:Metadata={title:"English Explorer | Pre-A1 Assessment",description:"A playful English assessment for young learners."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}