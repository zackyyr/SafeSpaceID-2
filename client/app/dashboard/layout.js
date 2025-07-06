import NavbarDashboard from "@/components/common/NavbarDashboard";

export const metadata = {
  title: "SafeSpaceID – Ruang Aman Digital untuk Kesehatan Mental",
  description: "Halaman utama dashboard SafeSpaceID untuk pengguna terdaftar",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarDashboard />

      <main className="w-full max-w-[1200px] mx-auto">
        {children}
      </main>
    </div>
  );
}
