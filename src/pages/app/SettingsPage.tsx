import { useState } from 'react';
import { Settings, User, Building2, Bell, Shield, Palette, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/shared/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/mode-toggle';

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and platform preferences"
        icon={<Settings className="size-5" />}
        actions={
          <Button size="sm" onClick={handleSave} className="gap-1.5">
            <Save className="size-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        }
      />

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile"><User className="size-4 mr-1.5" />Profile</TabsTrigger>
          <TabsTrigger value="company"><Building2 className="size-4 mr-1.5" />Company</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="size-4 mr-1.5" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="size-4 mr-1.5" />Security</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="size-4 mr-1.5" />Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.name} />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-1.5">
                  <Label>Department</Label>
                  <Input defaultValue={user?.department} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input defaultValue={user?.phone} />
                </div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Select defaultValue={user?.role}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company Settings</CardTitle>
              <CardDescription>Configure your organization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label>Company Name</Label>
                  <Input defaultValue={user?.company} />
                </div>
                <div className="space-y-1.5">
                  <Label>Industry</Label>
                  <Select defaultValue="medical">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Technology</SelectItem>
                      <SelectItem value="semiconductor">Semiconductor</SelectItem>
                      <SelectItem value="research">Research & Academia</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Country</Label>
                  <Input defaultValue="Germany" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Configure when and how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Critical Risk Alerts', desc: 'Immediate notification for assets with risk score >80', defaultChecked: true },
                { label: 'High Risk Alerts', desc: 'Alerts for assets with risk score 60-79', defaultChecked: true },
                { label: 'Maintenance Due Reminders', desc: '7 days before scheduled maintenance', defaultChecked: true },
                { label: 'New Ticket Assignments', desc: 'When a ticket is assigned to you', defaultChecked: true },
                { label: 'Ticket Status Updates', desc: 'When tickets you\'re watching change status', defaultChecked: false },
                { label: 'AI Analysis Completion', desc: 'When automated AI analysis finishes', defaultChecked: true },
                { label: 'Weekly Summary Report', desc: 'Monday morning digest email', defaultChecked: false },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                  <Separator className="mt-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button variant="outline" size="sm">Update Password</Button>
              </div>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Active Sessions</p>
                <div className="space-y-2">
                  {[
                    { device: 'Chrome on macOS', location: 'Munich, Germany', current: true },
                    { device: 'Safari on iPhone', location: 'Munich, Germany', current: false },
                  ].map((s) => (
                    <div key={s.device} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60">
                      <div>
                        <p className="text-sm font-medium text-foreground">{s.device}</p>
                        <p className="text-xs text-muted-foreground">{s.location}</p>
                      </div>
                      {s.current
                        ? <span className="text-xs text-success font-medium">Current session</span>
                        : <Button variant="ghost" size="xs" className="text-destructive">Revoke</Button>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your workspace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Theme</p>
                <div className="flex items-center gap-3">
                  <ModeToggle />
                  <span className="text-sm text-muted-foreground">Toggle between light and dark mode</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Language</p>
                <Select defaultValue="en">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Density</p>
                <div className="flex gap-3">
                  {['Comfortable', 'Compact', 'Spacious'].map((d, i) => (
                    <Button key={d} variant={i === 0 ? 'default' : 'outline'} size="sm">{d}</Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
