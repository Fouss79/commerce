import ClientSidebar from "./component/ClientSidebar";

export default function CompteLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <ClientSidebar />

        <main className="bg-white rounded-3xl shadow-xl p-6 md:p-8 min-h-[600px]">
          {children}
        </main>
      </div>
    </div>
  );
}