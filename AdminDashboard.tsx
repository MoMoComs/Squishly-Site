/* ============================================================
   SQUISHLY Admin Dashboard – View preorders and manage inventory
   Protected page for admin users
   ============================================================ */

import { useEffect, useState } from "react";
import { Download, BarChart3, Users, Edit2, Save, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Preorder {
  id: number;
  name: string;
  email: string;
  box: string;
  quantity: string;
  status: string;
  trackingNumber: string | null | undefined;
  createdAt: Date;
}

interface InventoryItem {
  box: string;
  totalSpots: number;
  reservedSpots: number;
  availableSpots: number;
}

export default function AdminDashboard() {
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editTracking, setEditTracking] = useState("");

  // Fetch preorders
  const preordersQuery = trpc.preorder.list.useQuery();
  const inventoryQuery = trpc.preorder.getInventory.useQuery();
  const updateStatusMutation = trpc.preorder.updateStatus.useMutation();

  useEffect(() => {
    if (preordersQuery.data) {
      setPreorders(preordersQuery.data);
    }
    if (inventoryQuery.data) {
      setInventory(inventoryQuery.data);
    }
    if (!preordersQuery.isLoading && !inventoryQuery.isLoading) {
      setLoading(false);
    }
  }, [preordersQuery.data, inventoryQuery.data, preordersQuery.isLoading, inventoryQuery.isLoading]);

  const downloadCSV = () => {
    if (preorders.length === 0) return;

    const headers = ["Name", "Email", "Box Type", "Quantity", "Status", "Tracking", "Date"];
    const rows = preorders.map((p) => [
      p.name,
      p.email,
      p.box,
      p.quantity,
      p.status,
      p.trackingNumber || "N/A",
      new Date(p.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `squishly-preorders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleEditStart = (preorder: Preorder) => {
    setEditingId(preorder.id);
    setEditStatus(preorder.status);
    setEditTracking(preorder.trackingNumber || "");
  };

  const handleSaveStatus = async (preorderId: number) => {
    try {
      await updateStatusMutation.mutateAsync({
        preorderId,
        status: editStatus as any,
        trackingNumber: editTracking || undefined,
      });
      
      // Update local state
      setPreorders(preorders.map(p => 
        p.id === preorderId 
          ? { ...p, status: editStatus, trackingNumber: editTracking }
          : p
      ));
      
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const totalReserved = inventory.reduce((sum, item) => sum + item.reservedSpots, 0);
  const totalAvailable = inventory.reduce((sum, item) => sum + item.availableSpots, 0);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      packed: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black font-nunito text-[#3d2a5e]">Squishly Admin</h1>
            <p className="text-sm text-[#9b7ec8] font-dm-sans">Preorder Management Dashboard</p>
          </div>
          <button
            onClick={downloadCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c9a7ff] hover:bg-[#b89aff] text-[#3d2a5e] font-bold font-nunito transition-all"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="squish-glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9b7ec8] font-nunito mb-1">Total Preorders</p>
                <p className="text-4xl font-black text-[#3d2a5e]">{preorders.length}</p>
              </div>
              <Users size={40} className="text-[#c9a7ff] opacity-50" />
            </div>
          </div>

          <div className="squish-glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9b7ec8] font-nunito mb-1">Spots Reserved</p>
                <p className="text-4xl font-black text-[#3d2a5e]">{totalReserved}</p>
              </div>
              <BarChart3 size={40} className="text-[#f5a8e8] opacity-50" />
            </div>
          </div>

          <div className="squish-glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9b7ec8] font-nunito mb-1">Available Spots</p>
                <p className="text-4xl font-black text-[#3d2a5e]">{totalAvailable}</p>
              </div>
              <BarChart3 size={40} className="text-[#a7d8ff] opacity-50" />
            </div>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="squish-glass rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-black font-nunito text-[#3d2a5e] mb-6">Inventory Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inventory.map((item) => (
              <div key={item.box} className="bg-white/50 rounded-xl p-4 border border-[#c9a7ff]/20">
                <h3 className="text-lg font-bold font-nunito text-[#3d2a5e] mb-3 capitalize">
                  {item.box === "mini" && "🌸"} {item.box === "medium" && "💜"} {item.box === "mega" && "🌟"} {item.box} Box
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9b7ec8]">Total Spots:</span>
                    <span className="font-bold text-[#3d2a5e]">{item.totalSpots}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9b7ec8]">Reserved:</span>
                    <span className="font-bold text-[#3d2a5e]">{item.reservedSpots}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9b7ec8]">Available:</span>
                    <span className="font-bold text-[#3d2a5e]">{item.availableSpots}</span>
                  </div>
                  <div className="mt-3 bg-[#e0d4f7] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c9a7ff] to-[#f5a8e8]"
                      style={{ width: `${(item.reservedSpots / item.totalSpots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preorders Table */}
        <div className="squish-glass rounded-2xl p-8">
          <h2 className="text-2xl font-black font-nunito text-[#3d2a5e] mb-6">Order Management</h2>
          
          {loading ? (
            <p className="text-center text-[#9b7ec8] py-8">Loading preorders...</p>
          ) : preorders.length === 0 ? (
            <p className="text-center text-[#9b7ec8] py-8">No preorders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#c9a7ff]/20">
                    <th className="text-left py-3 px-4 font-bold font-nunito text-[#3d2a5e]">Name</th>
                    <th className="text-left py-3 px-4 font-bold font-nunito text-[#3d2a5e]">Email</th>
                    <th className="text-left py-3 px-4 font-bold font-nunito text-[#3d2a5e]">Box</th>
                    <th className="text-left py-3 px-4 font-bold font-nunito text-[#3d2a5e]">Qty</th>
                    <th className="text-left py-3 px-4 font-bold font-nunito text-[#3d2a5e]">Status</th>
                    <th className="text-left py-3 px-4 font-bold font-nunito text-[#3d2a5e]">Tracking</th>
                    <th className="text-left py-3 px-4 font-bold font-nunito text-[#3d2a5e]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {preorders.map((preorder) => (
                    <tr key={preorder.id} className="border-b border-[#e0d4f7] hover:bg-white/30 transition-colors">
                      <td className="py-3 px-4 text-[#3d2a5e]">{preorder.name}</td>
                      <td className="py-3 px-4 text-[#9b7ec8] text-xs">{preorder.email}</td>
                      <td className="py-3 px-4">
                        <span className="capitalize inline-block px-3 py-1 rounded-full bg-[#c9a7ff]/20 text-[#3d2a5e] font-bold text-xs">
                          {preorder.box}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#3d2a5e]">{preorder.quantity}</td>
                      <td className="py-3 px-4">
                        {editingId === preorder.id ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="px-2 py-1 rounded border border-[#c9a7ff] bg-white text-[#3d2a5e] text-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="packed">Packed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        ) : (
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(preorder.status)}`}>
                            {preorder.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editingId === preorder.id ? (
                          <input
                            type="text"
                            placeholder="Tracking #"
                            value={editTracking}
                            onChange={(e) => setEditTracking(e.target.value)}
                            className="px-2 py-1 rounded border border-[#c9a7ff] bg-white text-[#3d2a5e] text-xs w-24"
                          />
                        ) : (
                          <span className="text-[#9b7ec8] text-xs font-mono">{preorder.trackingNumber || "—"}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editingId === preorder.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveStatus(preorder.id)}
                              className="p-1 rounded bg-green-500 text-white hover:bg-green-600"
                              title="Save"
                            >
                              <Save size={16} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 rounded bg-gray-400 text-white hover:bg-gray-500"
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditStart(preorder)}
                            className="p-1 rounded bg-[#c9a7ff] text-white hover:bg-[#b89aff]"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
