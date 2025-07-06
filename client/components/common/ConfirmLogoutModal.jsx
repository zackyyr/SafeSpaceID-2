"use client";

import React from "react";
import { X } from "lucide-react";

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Judul */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Keluar dari akun?</h3>

        {/* Deskripsi */}
        <p className="text-sm text-gray-600 mb-6">
          Yakin ingin logout sekarang? Kamu harus login ulang untuk mengakses akunmu kembali.
        </p>

        {/* Tombol aksi */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
