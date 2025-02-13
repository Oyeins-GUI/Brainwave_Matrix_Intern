import { createContext } from "react";
import { AuthContextType, ThemeContextType } from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(
   undefined
);

export const ThemeContext = createContext<ThemeContextType | undefined>(
   undefined
);

export type CurrencyType = "NGN";

export const currencies = {
   NGN: "₦",
};
