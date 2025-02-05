import { useAxios } from "../api";

type User = { name: string; _id: string };

const useUser = () => {
  const [{ data }] = useAxios<{ user?: User; allUsers: User[] }>("/user");

  return data;
};

export default useUser;
