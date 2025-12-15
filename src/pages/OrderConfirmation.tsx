import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const OrderConfirmation = () => {
  const location = useLocation();
  const orderData = location.state || {
    orderId: "VAN123456789",
    total: 45999,
    shippingInfo: {
      firstName: "Guest",
      email: "guest@example.com",
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for shopping with VANYA. Your order has been placed successfully.
            </p>

            <div className="bg-secondary p-8 rounded-lg text-left mb-8">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <Package className="w-10 h-10 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-semibold text-lg">{orderData.orderId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Total</p>
                  <p className="font-semibold text-lg">
                    {formatPrice(orderData.total)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Confirmation Email
                  </p>
                  <p className="font-medium">{orderData.shippingInfo?.email}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Estimated Delivery
                </p>
                <p className="font-semibold text-lg">
                  {new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/orders"
                className="btn-luxury inline-flex items-center gap-2"
              >
                Track Order
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/collection" className="btn-luxury-outline">
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderConfirmation;
