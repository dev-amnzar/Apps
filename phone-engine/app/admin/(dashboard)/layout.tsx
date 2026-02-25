"use client";

import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <AdminSidebar />
        <div className="lg:ps-64">
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
