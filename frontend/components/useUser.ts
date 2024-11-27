import { useEffect, useState } from "react";

type User = { name: string; _id: string };

const useUser = () => {
  const [user, setUser] = useState<
    { user?: User; allUsers: User[] } | undefined
  >(undefined);

  useEffect(() => {
    fetch("http://localhost:5001/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return user;
};

export default useUser;
