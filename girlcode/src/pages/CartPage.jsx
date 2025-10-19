import { useState, useEffect } from "react";
import { Trash2, PackageCheck, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmCheckout, setShowConfirmCheckout] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [orderData, setOrderData] = useState(null);


  useEffect(() => {
    setSelectedItems((prev) =>
      prev.filter((sel) =>
        cartItems.some((item) => item.id === sel.id && item.size === sel.size)
      )
    );
  }, [cartItems]);

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSelectItem = (item) => {
    const exists = selectedItems.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (exists) {
      setSelectedItems((prev) =>
        prev.filter((i) => !(i.id === item.id && i.size === item.size))
      );
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...cartItems]);
    }
    setSelectAll(!selectAll);
  };

  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const confirmRemove = () => {
    if (selectedItem) removeFromCart(selectedItem.id, selectedItem.size);
    setShowPopup(false);
    setSelectedItem(null);
  };

  const cancelRemove = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  const handleCheckoutClick = () => {
    if (selectedItems.length === 0) return;
    setShowConfirmCheckout(true);
  };

  const confirmCheckout = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please log in first.");
      window.location.href = "/login";
      return;
    }

    const newOrder = {
      id: Date.now(),
      userEmail: loggedInUser.email,
      items: selectedItems,
      total,
      status: "On Shipping",
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    // ✅ Keep unselected items in cart
    const remainingItems = cartItems.filter(
      (cartItem) =>
        !selectedItems.some(
          (sel) => sel.id === cartItem.id && sel.size === cartItem.size
        )
    );
    localStorage.setItem("cart", JSON.stringify(remainingItems));

    setOrderData(newOrder);
    setShowConfirmCheckout(false);
    setShowOrderConfirm(true);
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto mt-12 px-4 flex flex-col lg:flex-row gap-8">
        {/* === LEFT SIDE === */}
        <div className="flex-1">
          <p className="text-[#8C1C13] font-semibold tracking-wide text-sm mb-1">
            GET IT NOW
          </p>
          <h1 className="text-3xl font-bold text-[#8C1C13] mb-6">Check Out</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 mb-2">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-[#8C1C13] transition-all duration-200"
                  />
                  <Check
                    size={14}
                    className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  />
                </label>
                <label className="text-sm text-gray-700">
                  {selectAll ? "Deselect All" : "Select All"}
                </label>
              </div>

              {/* === Desktop Table === */}
              <table className="w-full border-collapse hidden md:table">
                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th></th>
                    <th className="text-left pb-3">PRODUCT</th>
                    <th className="text-left pb-3">PRICE</th>
                    <th className="text-left pb-3">QUANTITY</th>
                    <th className="text-left pb-3">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const isChecked = selectedItems.some(
                      (i) => i.id === item.id && i.size === item.size
                    );
                    return (
                      <tr key={`${item.id}-${item.size}`} className="border-b">
                        <td>
                          <label className="relative flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleSelectItem(item)}
                              className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-[#8C1C13] transition-all duration-200"
                            />
                            <Check
                              size={14}
                              className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                            />
                          </label>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-28 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Size:{" "}
                                <span className="font-semibold">{item.size}</span>
                              </p>
                              <button
                                onClick={() => handleRemoveClick(item)}
                                className="text-[#8C1C13] hover:text-red-700 transition-transform duration-150 hover:scale-110"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>₱{item.price.toLocaleString()}</td>
                        <td>
                          <div className="inline-flex items-center border border-gray-300 rounded-lg px-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="px-2 text-gray-600 disabled:opacity-40"
                            >
                              −
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="px-2 text-gray-600"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="font-semibold text-gray-800">
                          ₱{(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* === Mobile Cards === */}
              <div className="md:hidden flex flex-col gap-4 mt-4">
                {cartItems.map((item) => {
                  const isChecked = selectedItems.some(
                    (i) => i.id === item.id && i.size === item.size
                  );
                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="bg-white shadow-sm rounded-lg p-3 border"
                    >
                      <div className="flex items-start gap-3">
                        <label className="relative flex items-center cursor-pointer mt-1">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectItem(item)}
                            className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-[#8C1C13] transition-all duration-200"
                          />
                          <Check
                            size={14}
                            className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                          />
                        </label>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Size: <span className="font-semibold">{item.size}</span>
                          </p>
                          <p className="font-semibold mt-1 text-gray-800">
                            ₱{item.price.toLocaleString()}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-gray-300 rounded-lg px-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className="px-2 text-gray-600 disabled:opacity-40"
                              >
                                −
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 text-gray-600"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveClick(item)}
                              className="text-[#8C1C13] hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* === RIGHT SIDE SUMMARY === */}
        {cartItems.length > 0 && (
          <div className="flex-1 max-w-sm border rounded-xl bg-white shadow-md h-fit p-5">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2 text-sm">
              <span>Items Selected</span>
              <span>{selectedItems.length}</span>
            </div>

            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>₱{total.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-2 text-sm">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between border-t pt-2 font-bold text-base">
              <span>Total</span>
              <span>₱{total.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckoutClick}
              disabled={selectedItems.length === 0}
              className={`w-full mt-4 py-2.5 rounded-lg font-semibold transition-transform ${
                selectedItems.length === 0
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-[#8C1C13] text-white hover:bg-[#A32018]"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* === POPUPS === */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50"
          onClick={cancelRemove}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-11/12 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-36 h-52 object-cover rounded-lg mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold text-[#8C1C13] mb-1">
              {selectedItem.name}
            </h3>
            <p className="text-gray-600 mb-5">Remove this item from your cart?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelRemove}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="bg-[#8C1C13] text-white px-4 py-2 rounded-lg hover:bg-[#A32018]"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === CONFIRM CHECKOUT === */}
      {showConfirmCheckout && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50"
          onClick={() => setShowConfirmCheckout(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-11/12 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900">Confirm Your Order</h2>
            <p className="text-gray-600 mb-5">
              You are about to place an order for{" "}
              <span className="text-[#8C1C13] font-semibold">
                {selectedItems.length}
              </span>{" "}
              item(s). Proceed?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirmCheckout(false)}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmCheckout}
                className="bg-[#8C1C13] text-white px-4 py-2 rounded-lg hover:bg-[#A32018]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === ORDER CONFIRMATION === */}
      {showOrderConfirm && orderData && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50"
          onClick={() => setShowOrderConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-11/12 max-w-md text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#FBE9E7] text-[#8C1C13] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
              <PackageCheck size={40} />
            </div>

            <h2 className="text-2xl font-bold mb-2">Order Confirmed</h2>
            <p className="text-gray-600 mb-4">
              Hello{" "}
              <span className="text-[#8C1C13] font-semibold">
                {orderData.userEmail.split("@")[0]}
              </span>
              , your order has been confirmed and will be shipped soon.
            </p>

            <div className="text-sm text-gray-700 mb-4">
              <p>
                <strong>Order Number:</strong> #{orderData.id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(orderData.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-5 overflow-x-auto">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 min-w-[180px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-20 object-cover rounded-md"
                  />
                  <div className="text-left">
                    <p className="text-[#8C1C13] font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.size} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-semibold text-gray-800 mb-3">
              Total: ₱{orderData.total.toLocaleString()}
            </p>

            <button
              onClick={() => {
                setShowOrderConfirm(false);
                window.location.href = "/account";
              }}
              className="bg-[#8C1C13] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#A32018] transition-transform hover:-translate-y-0.5"
            >
              Track your orders
            </button>
          </div>
        </div>
      )}
    </>
  );
}
