import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { inter } from "./ui/fonts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NavbarItems } from "./ui/homePage/NavbarItems";
import { hours } from "./lib/hours";

config.autoAddCss = false;
hours.init();



export const metadata = {
  title: "Control de horas trabajadas",
  description: "Aplicacion para realizar una revision de horas trabajadas",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`bg-zinc-950 ${inter.className} antialiased`} >
        <NavbarItems />
        {children}
      </body>
    </html>
  );
}
