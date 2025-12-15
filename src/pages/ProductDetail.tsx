import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Ruler,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistStore";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "size" | "care">("details");
  
  const addToCart = useCart((state) => state.addItem);
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const inWishlist = product ? isInWishlist(product.id) : false;
  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <Link to="/collection" className="text-primary mt-4 inline-block">
            Back to Collection
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "Choose your color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeItem(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addItem(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-luxury">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/collection" className="text-muted-foreground hover:text-primary">
              Collection
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[product.image, product.image, product.image, product.image].map(
                  (img, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden bg-secondary cursor-pointer hover:ring-2 ring-primary transition-all"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Badges */}
              <div className="flex items-center gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium tracking-wide">
                    NEW ARRIVAL
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 bg-gold text-charcoal text-xs font-medium tracking-wide">
                    BESTSELLER
                  </span>
                )}
              </div>

              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-gold fill-current"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-sm font-medium">
                        {Math.round(
                          (1 - product.price / product.originalPrice) * 100
                        )}
                        % OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">
                  Color: <span className="font-normal">{selectedColor || "Select"}</span>
                </h3>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">
                    Size: <span className="font-normal">{selectedSize || "Select"}</span>
                  </h3>
                  <button className="text-primary text-sm flex items-center gap-1 hover:underline">
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={handleAddToCart} className="flex-1 btn-luxury">
                  Add to Cart
                </button>
                <Link to="/checkout" className="flex-1 btn-gold text-center">
                  Buy Now
                </Link>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 border transition-colors ${
                    inWishlist
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                </button>
                <button className="p-4 border border-border hover:border-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Easy Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Authentic</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="pt-6 border-t border-border">
                <div className="flex gap-8 border-b border-border">
                  {(["details", "size", "care"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-medium capitalize transition-colors relative ${
                        activeTab === tab
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab === "size" ? "Size Chart" : tab === "care" ? "Care Instructions" : "Fabric Details"}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="py-6">
                  {activeTab === "details" && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Fabric:</strong> {product.fabric}
                      </p>
                      <p className="text-muted-foreground">{product.description}</p>
                    </div>
                  )}
                  {activeTab === "size" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="py-2 text-left">Size</th>
                            <th className="py-2 text-left">Bust</th>
                            <th className="py-2 text-left">Waist</th>
                            <th className="py-2 text-left">Hip</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2">XS</td>
                            <td className="py-2">32"</td>
                            <td className="py-2">26"</td>
                            <td className="py-2">35"</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">S</td>
                            <td className="py-2">34"</td>
                            <td className="py-2">28"</td>
                            <td className="py-2">37"</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">M</td>
                            <td className="py-2">36"</td>
                            <td className="py-2">30"</td>
                            <td className="py-2">39"</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">L</td>
                            <td className="py-2">38"</td>
                            <td className="py-2">32"</td>
                            <td className="py-2">41"</td>
                          </tr>
                          <tr>
                            <td className="py-2">XL</td>
                            <td className="py-2">40"</td>
                            <td className="py-2">34"</td>
                            <td className="py-2">43"</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {activeTab === "care" && (
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
