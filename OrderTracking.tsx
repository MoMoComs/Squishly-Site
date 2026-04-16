/* ============================================================
   SQUISHLY Order Tracking – Customer can track their preorder
   ============================================================ */

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function OrderTracking() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [orderEmail, setOrderEmail] = useState("");

  const ordersQuery = trpc.preorder.getByEmail.useQuery(
    { email: orderEmail },
    { enabled: !!orderEmail }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setOrderEmail(email);
      setSearched(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-[#9b7ec8]" />;
      case "confirmed":
        return <CheckCircle2 className="w-5 h-5 text-[#c9a7ff]" />;
      case "packed":
        return <Package className="w-5 h-5 text-[#f5a8e8]" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-[#a7d8ff]" />;
      case "delivered":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Order Received",
      confirmed: "Order Confirmed",
      packed: "Packed & Ready",
      shipped: "On the Way",
      delivered: "Delivered",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-[#e0d4f7]",
      confirmed: "bg-[#c9a7ff]/20",
      packed: "bg-[#f5a8e8]/20",
      shipped: "bg-[#a7d8ff]/20",
      delivered: "bg-green-100",
    };
    return colors[status] || "bg-gray-100";
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-black font-nunito text-[#3d2a5e]">Track Your Order</h1>
          <p className="text-sm text-[#9b7ec8] font-dm-sans">Enter your email to see your preorder status</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <div className="squish-glass rounded-2xl p-8 mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white/50 border border-[#c9a7ff]/20 focus:outline-none focus:ring-2 focus:ring-[#c9a7ff] text-[#3d2a5e] placeholder-[#b09ec8]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#c9a7ff] to-[#f5a8e8] hover:shadow-lg text-white font-bold font-nunito transition-all flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <>
            {ordersQuery.isLoading && (
              <div className="text-center py-12">
                <p className="text-[#9b7ec8] font-dm-sans">Searching for your orders...</p>
              </div>
            )}

            {ordersQuery.data && ordersQuery.data.length === 0 && (
              <div className="squish-glass rounded-2xl p-12 text-center">
                <p className="text-[#9b7ec8] font-dm-sans mb-2">No orders found for this email.</p>
                <p className="text-sm text-[#b09ec8] font-dm-sans">Make sure you entered the correct email address.</p>
              </div>
            )}

            {ordersQuery.data && ordersQuery.data.length > 0 && (
              <div className="space-y-6">
                {ordersQuery.data.map((order: any) => (
                  <div key={order.id} className="squish-glass rounded-2xl p-8">
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#c9a7ff]/20">
                      <div>
                        <h3 className="text-2xl font-black font-nunito text-[#3d2a5e] mb-1">
                          {order.box === "mini" && "🌸"} {order.box === "medium" && "💜"} {order.box === "mega" && "🌟"} {" "}
                          {order.box.charAt(0).toUpperCase() + order.box.slice(1)} Box
                        </h3>
                        <p className="text-sm text-[#9b7ec8] font-dm-sans">Order #{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#9b7ec8] font-dm-sans">Quantity</p>
                        <p className="text-2xl font-black text-[#3d2a5e]">{order.quantity}x</p>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="mb-6">
                      <p className="text-sm font-bold font-nunito text-[#3d2a5e] mb-4">Order Status</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-12 h-12 rounded-full ${getStatusColor("pending")} flex items-center justify-center mb-2`}>
                            {getStatusIcon("pending")}
                          </div>
                          <p className="text-xs font-nunito text-[#9b7ec8]">Received</p>
                        </div>

                        <div className={`flex-1 h-1 ${order.status !== "pending" ? "bg-gradient-to-r from-[#c9a7ff] to-[#f5a8e8]" : "bg-[#e0d4f7]"}`} />

                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-12 h-12 rounded-full ${["confirmed", "packed", "shipped", "delivered"].includes(order.status) ? getStatusColor("confirmed") : "bg-[#e0d4f7]"} flex items-center justify-center mb-2`}>
                            {getStatusIcon("confirmed")}
                          </div>
                          <p className="text-xs font-nunito text-[#9b7ec8]">Confirmed</p>
                        </div>

                        <div className={`flex-1 h-1 ${["packed", "shipped", "delivered"].includes(order.status) ? "bg-gradient-to-r from-[#c9a7ff] to-[#f5a8e8]" : "bg-[#e0d4f7]"}`} />

                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-12 h-12 rounded-full ${["packed", "shipped", "delivered"].includes(order.status) ? getStatusColor("packed") : "bg-[#e0d4f7]"} flex items-center justify-center mb-2`}>
                            {getStatusIcon("packed")}
                          </div>
                          <p className="text-xs font-nunito text-[#9b7ec8]">Packed</p>
                        </div>

                        <div className={`flex-1 h-1 ${["shipped", "delivered"].includes(order.status) ? "bg-gradient-to-r from-[#c9a7ff] to-[#f5a8e8]" : "bg-[#e0d4f7]"}`} />

                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-12 h-12 rounded-full ${["shipped", "delivered"].includes(order.status) ? getStatusColor("shipped") : "bg-[#e0d4f7]"} flex items-center justify-center mb-2`}>
                            {getStatusIcon("shipped")}
                          </div>
                          <p className="text-xs font-nunito text-[#9b7ec8]">Shipped</p>
                        </div>

                        <div className={`flex-1 h-1 ${order.status === "delivered" ? "bg-gradient-to-r from-[#c9a7ff] to-[#f5a8e8]" : "bg-[#e0d4f7]"}`} />

                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-12 h-12 rounded-full ${order.status === "delivered" ? getStatusColor("delivered") : "bg-[#e0d4f7]"} flex items-center justify-center mb-2`}>
                            {getStatusIcon("delivered")}
                          </div>
                          <p className="text-xs font-nunito text-[#9b7ec8]">Delivered</p>
                        </div>
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className={`${getStatusColor(order.status)} rounded-xl p-4 mb-6`}>
                      <p className="font-bold font-nunito text-[#3d2a5e] flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </p>
                      {order.status === "shipped" && order.trackingNumber && (
                        <p className="text-sm text-[#9b7ec8] font-dm-sans mt-2">
                          Tracking: <span className="font-mono font-bold">{order.trackingNumber}</span>
                        </p>
                      )}
                      {order.estimatedShipDate && (
                        <p className="text-sm text-[#9b7ec8] font-dm-sans mt-1">
                          Est. Ship: {new Date(order.estimatedShipDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/30 rounded-lg p-4">
                        <p className="text-xs text-[#9b7ec8] font-nunito mb-1">Order Date</p>
                        <p className="font-bold text-[#3d2a5e]">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      {order.deliveredDate && (
                        <div className="bg-white/30 rounded-lg p-4">
                          <p className="text-xs text-[#9b7ec8] font-nunito mb-1">Delivered</p>
                          <p className="font-bold text-[#3d2a5e]">{new Date(order.deliveredDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!searched && (
          <div className="squish-glass rounded-2xl p-12 text-center">
            <p className="text-[#9b7ec8] font-dm-sans text-lg">
              Enter your email address above to track your Squishly preorder and see its status in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
