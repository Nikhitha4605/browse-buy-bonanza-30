
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const StoreSettings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "BrowseBuyBonanza",
    email: "contact@example.com",
    phone: "+1 123-456-7890",
    address: "123 E-Commerce St, Online City, 12345",
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Store settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Store Settings</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={storeSettings.storeName}
              onChange={(e) =>
                setStoreSettings({
                  ...storeSettings,
                  storeName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={storeSettings.email}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              value={storeSettings.phone}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, phone: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="address">Store Address</Label>
            <Textarea
              id="address"
              value={storeSettings.address}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, address: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-brand hover:bg-brand/90">
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreSettings;
