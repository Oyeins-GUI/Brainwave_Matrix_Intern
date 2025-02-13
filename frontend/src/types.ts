export type User = {
   id: string;
   email: string;
   username: string;
   currency: string;
};

export type AuthContextType = {
   user: User | null;
   login: (email: string, password: string) => Promise<void>;
   signup: (email: string, username: string, password: string) => Promise<void>;
   logout: () => void;
   updateUserData: (newUserData: Partial<User>) => void;
   authErr: string | null;
};

export type Theme = "light" | "dark";

export type ThemeContextType = {
   theme: Theme;
   toggleTheme: () => void;
};
