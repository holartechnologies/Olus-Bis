import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Calendar,
  UserCircle,
  FileText,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    totalLeads,
    totalConsultations,
    totalClients,
    totalDocuments,
    recentLeads,
    pendingConsultations,
    totalUsers,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.consultation.count(),
    prisma.client.count(),
    prisma.document.count(),
    prisma.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    prisma.consultation.count({ where: { status: "PENDING" } }),
    prisma.user.count({ where: { role: { not: "SUPER_ADMIN" } } }),
  ]);

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads,
      change: "+12.5%",
      trend: "up",
      icon: UserCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Consultations",
      value: totalConsultations,
      change: pendingConsultations + " pending",
      trend: "up",
      icon: Calendar,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Active Clients",
      value: totalClients,
      change: "+" + (totalClients > 0 ? ((recentLeads / totalClients) * 100).toFixed(1) : 0) + "%",
      trend: "up",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Documents",
      value: totalDocuments,
      change: "Total uploads",
      trend: "up",
      icon: FileText,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your immigration practice</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction href="/admin/leads" label="View Leads" />
              <QuickAction href="/admin/consultations" label="Consultations" />
              <QuickAction href="/admin/clients" label="Manage Clients" />
              <QuickAction href="/admin/documents" label="Documents" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">System Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-600">Total Users</span>
                <span className="text-sm font-semibold">{totalUsers}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-600">Recent Leads (7 days)</span>
                <span className="text-sm font-semibold">{recentLeads}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-600">Pending Consultations</span>
                <span className="text-sm font-semibold text-yellow-600">{pendingConsultations}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Total Documents</span>
                <span className="text-sm font-semibold">{totalDocuments}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-4 text-sm font-medium text-gray-600 hover:border-[#0B3AA8] hover:text-[#0B3AA8] transition-colors"
    >
      <TrendingUp className="mr-2 h-4 w-4" />
      {label}
    </a>
  );
}
