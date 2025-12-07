import { useState } from "react";
import { useSettingsModal } from "@/hooks/useSettingsModal";
import { useAuthStore } from "@/stores/authStore"; // Assuming this path based on your snippet
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/UI/separator";
import { 
  X, 
  User, 
  Monitor, 
  ShieldCheck, 
  Bell, 
  Moon, 
  LogOut 
} from "lucide-react";
import clsx from "clsx";

type Tab = "profile" | "appearance" | "notifications" | "security";

export default function SettingsModal() {
  const { isOpened, onToggle } = useSettingsModal();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Prevent rendering if not open
  if (!isOpened) return null;

  // Tabs Configuration
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Monitor },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onToggle} // Click backdrop to close
    >
      {/* Modal Container */}
      <div 
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-neutral-900">Settings</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle} 
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4 text-neutral-500" />
          </Button>
        </div>

        {/* Body Layout */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar Navigation */}
          <aside className="w-64 bg-neutral-50 border-r flex flex-col p-4 space-y-1 hidden md:flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  className={clsx(
                    "w-full justify-start gap-3 px-3",
                    activeTab === tab.id ? "bg-white shadow-sm font-medium text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                  )}
                  onClick={() => setActiveTab(tab.id as Tab)}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </aside>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-xl space-y-8">
              
              {/* Profile Section */}
              {activeTab === "profile" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900">Profile</h3>
                    <p className="text-sm text-muted-foreground">Manage your public profile information.</p>
                  </div>
                  <Separator />
                  
                  {/* Avatar Section */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                       {user?.firstname?.[0]}{user?.lastname?.[0]}
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">Change Avatar</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.firstname}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.lastname}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email} 
                        disabled
                        className="flex h-10 w-full rounded-md border border-input bg-neutral-100 px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Section */}
              {activeTab === "appearance" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900">Appearance</h3>
                    <p className="text-sm text-muted-foreground">Customize the look and feel of the application.</p>
                  </div>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">Dark Mode</label>
                        <p className="text-sm text-muted-foreground">Adjust the interface to reduce eye strain.</p>
                      </div>
                      <Moon className="h-5 w-5 text-neutral-500" />
                      {/* Add Toggle Switch Component here if available */}
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section (Placeholder) */}
              {activeTab === "security" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900">Security</h3>
                    <p className="text-sm text-muted-foreground">Update your password and security settings.</p>
                  </div>
                  <Separator />
                  
                  <div className="rounded-md border border-red-200 bg-red-50 p-4">
                    <h4 className="text-sm font-medium text-red-900 mb-2 flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Danger Zone
                    </h4>
                    <p className="text-sm text-red-700 mb-4">
                      Deleting your account is irreversible. All your data will be removed.
                    </p>
                    <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      Delete Account
                    </Button>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
        
        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 p-4 border-t bg-neutral-50/50">
          <Button variant="ghost" onClick={onToggle}>Cancel</Button>
          <Button className="bg-neutral-900 text-white hover:bg-neutral-800">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}