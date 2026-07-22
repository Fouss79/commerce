"use client";

import { useEffect, useState, useRef } from "react";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Edit3,
  Shield,
  Calendar,
  LogOut,
  Camera,
  X,
  Check,
  Loader2,
} from "lucide-react";
import api from "../../../lib/api";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
    setImage(savedUser?.image || null);
    setFormData({
      nom: savedUser?.nom || "",
      prenom: savedUser?.prenom || "",
      email: savedUser?.email || "",
      numero: savedUser?.numero || "",
      adresse: savedUser?.adresse || "",
    });
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 3 Mo.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    setImage(newPreviewUrl);
    setImageFile(file);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImage(user.image || null);
    setFormData({
      nom: user.nom || "",
      prenom: user.prenom || "",
      email: user.email || "",
      numero: user.numero || "",
      adresse: user.adresse || "",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const form = new FormData();

      form.append(
        "user",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      if (imageFile) {
        form.append("file", imageFile);
      }

      const res = await api.put(`/api/users/${user.id}`, form);

      const updatedUser = res.data;
      setUser(updatedUser);
      setImage(updatedUser.image || null);
      setImageFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.error || "Erreur lors de la mise à jour du profil.";
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        Chargement du profil...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-3xl font-bold text-[#063c28]">
          Mon profil
        </p>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 hover:bg-gray-50"
          >
            <Edit3 size={18} />
            Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
            >
              <X size={18} />
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#063c28] text-white hover:bg-[#0a5c3d] disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Check size={18} />
              )}
              Enregistrer
            </button>
          </div>
        )}
      </div>

      {/* CARD PROFIL */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">

        {/* AVATAR */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-[#063c28] text-2xl font-bold overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {user.prenom?.charAt(0)}
                  {user.nom?.charAt(0)}
                </>
              )}
            </div>

            {isEditing && (
              <>
                <button
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 w-7 h-7 bg-[#063c28] rounded-full flex items-center justify-center text-white border-2 border-white hover:bg-[#0a5c3d] transition"
                  title="Changer la photo"
                >
                  <Camera size={14} />
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleFieldChange("prenom", e.target.value)}
                  placeholder="Prénom"
                  className="w-28 px-2 py-1 border border-gray-200 rounded-lg text-sm font-bold text-[#063c28]"
                />
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleFieldChange("nom", e.target.value)}
                  placeholder="Nom"
                  className="w-28 px-2 py-1 border border-gray-200 rounded-lg text-sm font-bold text-[#063c28]"
                />
              </div>
            ) : (
              <h2 className="text-xl font-bold text-[#063c28]">
                {user.prenom} {user.nom}
              </h2>
            )}

            <p className="text-gray-500 text-sm mt-1">
              {user.role === "VENDEUR"
                ? "Vendeur"
                : user.role === "ADMIN"
                ? "Administrateur"
                : "Client e-commerce"}
            </p>
          </div>
        </div>

        {/* INFOS */}
        <div className="grid md:grid-cols-2 gap-6">

          <Info
            icon={<Mail size={18} />}
            label="Email"
            value={formData.email}
            editing={isEditing}
            onChange={(v) => handleFieldChange("email", v)}
          />
          <Info
            icon={<Phone size={18} />}
            label="Téléphone"
            value={formData.numero}
            editing={isEditing}
            onChange={(v) => handleFieldChange("numero", v)}
          />
          <Info
            icon={<MapPin size={18} />}
            label="Adresse"
            value={formData.adresse}
            editing={isEditing}
            onChange={(v) => handleFieldChange("adresse", v)}
          />
          <Info icon={<Shield size={18} />} label="Rôle" value={user.role || "CLIENT"} />
        </div>

        {/* SECURITY SECTION */}
        <div className="mt-10 bg-green-50 rounded-2xl p-4 text-sm text-green-700">
          🔒 Votre compte est sécurisé. Toutes vos informations sont protégées.
        </div>

        {/* LOGOUT */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENT ================= */
function Info({ icon, label, value, editing = false, onChange }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
      <div className="text-[#063c28]">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        {editing && onChange ? (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg px-2 py-1 mt-1"
          />
        ) : (
          <p className="font-semibold text-gray-800">
            {value || "Non renseigné"}
          </p>
        )}
      </div>
    </div>
  );
}