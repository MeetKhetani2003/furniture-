import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, MessageSquare, Tag, Image as ImageIcon } from "lucide-react";
import AdminLogin from "@/components/admin/AdminLogin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Check if they are admin via Credentials provider or via Google email match
  const isAdmin = session?.user?.role === "admin" || session?.user?.email === process.env.ADMIN_EMAIL;

  if (!session || !isAdmin) {
    return <AdminLogin />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-primary text-white flex flex-col">
        <div className="p-6">
          <Link href="/admin">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Admin Panel</h2>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <MessageSquare size={20} />
            <span>Inquiries</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Tag size={20} />
            <span>Coupons</span>
          </Link>
          <Link href="/admin/banners" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <ImageIcon size={20} />
            <span>Banners</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Package size={20} />
            <span>Categories</span>
          </Link>
          <Link href="/admin/attributes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Settings size={20} />
            <span>Attributes</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Users size={16} />
            </div>
            <div className="text-sm overflow-hidden">
              <p className="truncate font-medium">{session.user.name}</p>
              <p className="truncate text-xs opacity-70">{session.user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
