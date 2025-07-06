"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  Globe,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  HeartHandshake,
  AlertCircle,
  Smile,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contactList = [
  {
    title: "Yayasan Sejahtera",
    desc: "Layanan konsultasi dan advokasi umum",
    detail: "Memberikan bantuan hukum dan konseling secara gratis.",
    phone: "(021) 9876 5432",
    email: "kontak@yayasansejahtera.org",
    web: "www.yayasansejahtera.org",
    hours: "Senin – Jumat, 08.00–17.00 WIB",
    icon: <ShieldCheck className="text-white w-5 h-5" />,
  },
  {
    title: "Pusat Peduli",
    desc: "Dukungan psikologis dan sosial untuk masyarakat.",
    detail: "Melayani konseling keluarga, remaja, dan individu.",
    phone: "(022) 8899 1122",
    email: "layanan@pusatpeduli.id",
    web: "www.pusatpeduli.id",
    hours: "Senin – Sabtu, 09.00–15.00 WIB",
    icon: <HeartHandshake className="text-white w-5 h-5" />,
  },
  {
    title: "Layanan Konten Aman",
    desc: "Adukan konten yang tidak sesuai secara online.",
    detail: "Menangani laporan konten berbahaya di media sosial.",
    phone: "(023) 3344 5566",
    email: "aduan@kontenaman.go.id",
    web: "www.kontenaman.go.id",
    hours: "Setiap Hari, 08.00–20.00 WIB",
    icon: <AlertCircle className="text-white w-5 h-5" />,
  },
  {
    title: "Forum Anak Nusantara",
    desc: "Pelaporan langsung terkait hak anak dan remaja.",
    detail: "Menyediakan pendampingan dan layanan pengaduan anak.",
    phone: "(024) 7788 9900",
    email: "support@forumanak.or.id",
    web: "www.forumanak.or.id",
    hours: "Senin – Jumat, 10.00–16.00 WIB",
    icon: <Smile className="text-white w-5 h-5" />,
  },
];

export default function Contact() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-scree py-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Get In Touch</h1>
        <p className="text-center text-gray-500 mb-10">
          Feel free to contact us, submit your queries here and we will get back to you as soon as possible
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info Kontak */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Info kontak</h2>
            <div className="space-y-4">
              {contactList.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4">
                  <div
                    className="flex justify-between items-start gap-4 cursor-pointer"
                    onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-[#2875D4] rounded-full w-9 h-9 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#2875D4]">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      {index === activeIndex ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {index === activeIndex && item.detail && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4 text-sm text-gray-700 space-y-2 pl-11"
                      >
                        <p>{item.detail}</p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#2875D4]" /> {item.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#2875D4]" /> {item.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-[#2875D4]" /> {item.web}
                        </div>
                        <p className="text-xs font-medium mt-2">
                          <strong>Jam Layanan:</strong> {item.hours}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            action="https://formspree.io/f/meokvpzg"
            method="POST"
            className="space-y-4 p-6 rounded-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light pb-2">Nama Depan</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="Nama depan"
                  className="w-full px-4 py-2 rounded-2xl bg-white focus:outline-none placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-light pb-2">Nama Belakang</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Nama Belakang"
                  className="w-full px-4 py-2 rounded-2xl bg-white focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light pb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Alamat email aktif"
                className="w-full px-4 py-2 rounded-2xl bg-white focus:outline-none placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-light pb-2">Perihal</label>
              <input
                type="text"
                name="subject"
                placeholder="Subyek pesan"
                className="w-full px-4 py-2 rounded-2xl bg-white focus:outline-none placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-light pb-2">Pesan</label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tulis pesan/keluhan kamu"
                className="w-full px-4 py-2 rounded-2xl bg-white focus:outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2875D4] text-white rounded-2xl hover:bg-blue-700 transition"
            >
              Kirim Pesan
            </button>
          </form>

        </div>
      </div>
    </motion.div>
  );
}
