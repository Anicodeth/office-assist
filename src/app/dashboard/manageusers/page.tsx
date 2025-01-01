"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUsers, deleteUser, updateUser } from "@/service/userService";
import { toast } from "sonner";
import { Hourglass } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ManageUsers() {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery(["users"], getUsers);

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      alert("User deleted successfully.");
    },
    onError: () => {
      alert("Failed to delete user.");
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-red-500">{(error as Error).message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border">Name</th>
            <th className="px-4 py-2 text-left border">Email</th>
            <th className="px-4 py-2 text-left border">Role</th>
            <th className="px-4 py-2 text-left border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">
                <button
                  className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 mr-2"
                  onClick={() => handleDelete(user._id)}
                >
                  {deleteUserMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
                <EditUserDialog user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditUserDialog({ user }: { user: any }) {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries("users");
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  function handleUpdate() {
    updateUserMutation.mutateAsync({
      _id: user._id,
      name,
      email,
      password: user.password,
      role,
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col items-center w-full justify-center">
            <div>
              <Label>Name</Label>
              <Input
                defaultValue={user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                defaultValue={user.role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdate}>
                {updateUserMutation.isLoading ? "Updating..." : "Update"}
              </Button>

              <Button>Cancel</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
