import { Archivo } from "next/font/google";

// One variable family; the width axis gives the condensed headings and wide labels.
// latin-ext covers Turkish letters (ğ, ş, ı, İ).
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
