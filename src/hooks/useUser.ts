import { root } from "postcss";
import { useState, useEffect } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  orders: string[];
  coins: number;
  role: "customer" | "admin";
}

export function useUser() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
}
