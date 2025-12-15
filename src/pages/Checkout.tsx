import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, CreditCard, Smartphone, Truck, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been confirmed.",
    });

    navigate("/order-confirmation", {
      state: {
        orderId: `VAN${Date.now()}`,
        items,
        total,
        shippingInfo,
      },
    });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <section className="section-padding text-center">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <Link to="/collection" className="text-primary">
            Continue Shopping
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-luxury">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/cart" className="text-muted-foreground hover:text-primary">
              Cart
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>
              Shipping
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>
              Payment
            </span>
          </nav>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {step === 1 && (
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-8">
                      Shipping Information
                    </h2>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={shippingInfo.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={shippingInfo.pincode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      {/* Delivery Options */}
                      <div className="pt-6 border-t border-border">
                        <h3 className="font-semibold text-lg mb-4">Delivery Options</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-4 p-4 border border-primary bg-primary/5 rounded cursor-pointer">
                            <input
                              type="radio"
                              name="delivery"
                              defaultChecked
                              className="w-4 h-4 text-primary"
                            />
                            <Truck className="w-5 h-5 text-primary" />
                            <div className="flex-1">
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-muted-foreground">
                                5-7 business days
                              </p>
                            </div>
                            <span className="font-medium">
                              {shipping === 0 ? "Free" : formatPrice(shipping)}
                            </span>
                          </label>
                          <label className="flex items-center gap-4 p-4 border border-border rounded cursor-pointer hover:border-primary transition-colors">
                            <input
                              type="radio"
                              name="delivery"
                              className="w-4 h-4 text-primary"
                            />
                            <Truck className="w-5 h-5" />
                            <div className="flex-1">
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-muted-foreground">
                                2-3 business days
                              </p>
                            </div>
                            <span className="font-medium">{formatPrice(1500)}</span>
                          </label>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-luxury w-full md:w-auto"
                      >
                        Continue to Payment
                      </button>
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-8">
                      Payment Method
                    </h2>

                    <div className="space-y-4 mb-8">
                      <label
                        className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 text-primary"
                        />
                        <CreditCard className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-sm text-muted-foreground">
                            Visa, Mastercard, Rupay
                          </p>
                        </div>
                      </label>

                      <label
                        className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="w-4 h-4 text-primary"
                        />
                        <Smartphone className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium">UPI</p>
                          <p className="text-sm text-muted-foreground">
                            PhonePe, Google Pay, Paytm
                          </p>
                        </div>
                      </label>

                      <label
                        className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${
                          paymentMethod === "cod"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="w-4 h-4 text-primary"
                        />
                        <Truck className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Pay when you receive
                          </p>
                        </div>
                      </label>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 mb-8 p-6 bg-secondary rounded-lg">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-border rounded bg-background focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-border rounded bg-background focus:outline-none focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-3 border border-border rounded bg-background focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn-luxury-outline"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className="btn-gold flex-1 flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          "Processing..."
                        ) : (
                          <>
                            Place Order - {formatPrice(total)}
                            <Check className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 rounded-lg sticky top-32">
                <h3 className="font-serif text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.size} / {item.color} × {item.quantity}
                        </p>
                        <p className="font-medium text-sm mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
