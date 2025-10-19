import { useEffect, useState } from "react";
import Header from "../components/Header";
import logored from "../assets/logored.png";
import redbg from "../assets/redbg.png";
import borderImg from "../assets/border.png"; 
import { Camera } from "lucide-react"; 

export default function AccountPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("On Shipping");
  const [user, setUser] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPayload, setConfirmPayload] = useState(null);
  
  const [profilePic, setProfilePic] = useState(null);


  useEffect(() => {
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
      setProfilePic(savedImage);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (loggedInUser) {
      setUser(loggedInUser);
      const userOrders = allOrders.filter(
        (order) => order.userEmail === loggedInUser.email
      );
      setOrders(userOrders);
      setFilteredOrders(userOrders.filter((o) => o.status === "On Shipping"));
    }
  }, []);

  useEffect(() => {
    setFilteredOrders(orders.filter((o) => o.status === activeTab));
  }, [orders, activeTab]);

  const handleTabChange = (status) => {
    setActiveTab(status);
    setFilteredOrders(orders.filter((o) => o.status === status));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const requestStatusChange = (orderId, newStatus) => {
    if (newStatus === "Arrived") {
      setConfirmPayload({
        orderId,
        newStatus,
        question: "Has this product been delivered?",
      });
      setConfirmOpen(true);
    } else if (newStatus === "Canceled") {
      setConfirmPayload({
        orderId,
        newStatus,
        question: "Are you sure you want to cancel this order?",
      });
      setConfirmOpen(true);
    } else {
      applyStatusChange(orderId, newStatus);
    }
  };

  const applyStatusChange = (orderId, newStatus) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedAll = allOrders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    localStorage.setItem("orders", JSON.stringify(updatedAll));

    const updatedUserOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updatedUserOrders);
  };

  const cancelChange = () => {
    setConfirmOpen(false);
    setConfirmPayload(null);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-12">
      
        <div
          className="w-full h-40"
          style={{
            backgroundImage: `url(${redbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

      <div className="relative -mt-20 flex flex-col items-center text-center px-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
      
          <img
            src={borderImg}
            alt="Profile border"
            className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
          />

  
          <label htmlFor="profile-upload" className="cursor-pointer group">
            <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden z-0 shadow-md">
              <img
                src={profilePic || logored}
                alt="Profile"
                className="w-full h-full object-cover"
              />
          
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Camera className="text-white w-6 h-6" />
              </div>
            </div>
          </label>

          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <h2 className="mt-3 text-lg font-semibold text-gray-800">
          {user?.username || "User Name"}
        </h2>
        <p className="text-gray-500 text-sm">{user?.email || "No email found"}</p>
      </div>

  
        <div className="w-full max-w-md mt-8 px-4 overflow-x-auto">
        <div className="flex justify-between gap-2 min-w-[350px]">
            {["On Shipping", "Arrived", "Canceled"].map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            return (
                <button
                key={status}
                onClick={() => handleTabChange(status)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-medium transition-all shadow-sm whitespace-nowrap ${
                    activeTab === status
                    ? "bg-[#7A1818] text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
                >
                <span className="text-sm">{status}</span>
                <span
                    className={`text-xs font-semibold px-2 py-[1px] rounded-full ${
                    activeTab === status
                        ? "bg-white/30 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                >
                    {count}
                </span>
                </button>
            );
            })}
        </div>
        </div>

        <div className="w-full max-w-5xl mt-8 px-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow text-center text-gray-500">
              No orders found in this category.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b pb-3 mb-4">
                    <p className="font-medium text-gray-700 text-sm md:text-base">
                      Order ID: #{order.id}
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-semibold ${
                          order.status === "On Shipping"
                            ? "text-orange-600"
                            : order.status === "Arrived"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {order.status}
                      </span>

                      {order.status === "On Shipping" && (
                        <select
                          onChange={(e) => {
                            const target = e.target.value;
                            requestStatusChange(order.id, target);
                            e.target.value = "On Shipping";
                          }}
                          className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1818]"
                          defaultValue="On Shipping"
                        >
                          <option value="On Shipping">On Shipping</option>
                          <option value="Arrived">Arrived</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b last:border-none pb-3"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium text-right">
                          ₱{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 text-sm text-gray-600">
                    <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="font-semibold text-gray-800 text-base mt-2 sm:mt-0">
                      Total: ₱{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {confirmOpen && confirmPayload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Please confirm</h3>
              <p className="text-sm text-gray-600 mb-4">{confirmPayload.question}</p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelChange}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    applyStatusChange(
                      confirmPayload.orderId,
                      confirmPayload.newStatus
                    );
                    setConfirmOpen(false);
                    setConfirmPayload(null);
                  }}
                  className="px-4 py-2 rounded-md bg-[#7A1818] text-white hover:bg-[#a32626] transition"
                >
                  Yes,{" "}
                  {confirmPayload.newStatus === "Arrived"
                    ? "Mark as delivered"
                    : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
