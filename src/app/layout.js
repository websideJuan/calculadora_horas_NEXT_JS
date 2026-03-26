import "./globals.css";

export const metadata = {
  title: "Control de horas trabajadas",
  description: "Aplicacion para realizar una revision de horas trabajadas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
