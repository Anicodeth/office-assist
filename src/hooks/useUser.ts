import { root } from "postcss";
import { useState, useEffect } from "react";

interface User {
  role: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>({role:"user"});
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
