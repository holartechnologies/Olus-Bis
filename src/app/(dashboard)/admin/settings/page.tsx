import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany();

  const settingsMap = settings.reduce<Record<string, string>>((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-500">Manage system settings and configuration</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue={settingsMap.site_name || "OLUS-BIS Immigration Services"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteEmail">Site Email</Label>
              <Input id="siteEmail" type="email" defaultValue={settingsMap.site_email || "info@olus-bis.com"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sitePhone">Phone Number</Label>
              <Input id="sitePhone" defaultValue={settingsMap.site_phone || "+1 (234) 567-890"} />
            </div>
            <Button className="bg-[#0B3AA8]">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Node Version</span>
              <span className="text-sm font-mono">{process.version}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Environment</span>
              <span className="text-sm font-medium capitalize">{process.env.NODE_ENV || "development"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium">MySQL</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm font-medium">Local (Namecheap)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
