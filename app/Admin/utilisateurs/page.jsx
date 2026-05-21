"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const PageUsers = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur chargement users :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    if (!confirm("Voulez-vous supprimer cet utilisateur ?")) return;

    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  // ================= CHANGE ROLE =================
  const changeRole = async (id, role) => {
    try {
      await axios.put(`${API_URL}/api/users/${id}`, {
        role,
      });

      fetchUsers();
    } catch (error) {
      console.error("Erreur changement rôle :", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Chargement des utilisateurs...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#063c28] mb-6">
        Gestion des utilisateurs
      </h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Téléphone</th>
              <th className="p-3 text-left">Rôle</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">
                  {user.nom} {user.prenom}
                </td>

                <td className="p-3">{user.email}</td>

                <td className="p-3">{user.numero}</td>

                {/* ROLE */}
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      changeRole(user.id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value={user.role}>{user.role}</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="VENDEUR">VENDEUR</option>
                    <option value="CLIENT">CLIENT</option>
                  </select>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageUsers;