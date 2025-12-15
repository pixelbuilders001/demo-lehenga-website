import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/store/cartStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

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

  if (items.length === 0) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-luxury">
            <div className="max-w-md mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
                <h1 className="font-serif text-3xl font-bold mb-4">
                  Your Cart is Empty
                </h1>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link to="/collection" className="btn-luxury inline-flex items-center gap-2">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">
              Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 p-4 bg-secondary rounded-lg"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-32 md:w-32 md:h-40 object-cover rounded"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-semibold text-lg hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.size, item.color)
                          }
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-muted-foreground text-sm mb-4">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border bg-background">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          {item.product.originalPrice && (
                            <p className="text-muted-foreground text-sm line-through">
                              {formatPrice(
                                item.product.originalPrice * item.quantity
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <Link
                    to="/collection"
                    className="text-primary font-medium hover:underline"
                  >
                    ← Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 rounded-lg sticky top-32">
                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    {subtotal < 50000 && (
                      <p className="text-sm text-primary">
                        Add {formatPrice(50000 - subtotal)} more for free shipping!
                      </p>
                    )}
                  </div>

                  {/* Coupon */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 border border-border bg-background rounded focus:outline-none focus:border-primary"
                      />
                      <button className="px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-maroon-dark transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">{formatPrice(total)}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      Including all taxes
                    </p>
                  </div>

                  <Link
                    to="/checkout"
                    className="btn-luxury w-full text-center flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <div className="mt-4 text-center">
                    <p className="text-muted-foreground text-sm">
                      Secure checkout with SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
