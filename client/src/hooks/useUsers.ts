import UserService, { User } from "@/services/userService";
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await UserService.getAllUsers();
        setUsers(data);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (user: Omit<User, "id">): Promise<User> => {
    console.log(user);
    const response = await UserService.createUser({ ...user, id: 0 });
    return response;
  };

  const updateUser = async (userid: number, userData: Partial<User>) => {
    try {
      const updatedUser = await UserService.updateUser({
        ...userData,
        id: userid,
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        role: userData.role || "",
        password: userData.password || "",
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userid ? updatedUser : user))
      );
    } catch (error: Error | any) {
      setError(error.message);
    }
  };

  const deleteUser = async (userid: number) => {
    try {
      await UserService.deleteUser(userid);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userid));
    } catch (error: Error | any) {
      setError(error.message);
    }
  };

  return { users, loading, error, createUser, updateUser, deleteUser };
};
