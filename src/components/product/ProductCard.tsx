import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistStore";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const addToCart = useCart((state) => state.addItem);
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      size: product.sizes[2] || product.sizes[0],
      color: product.colors[0],
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative image-hover-zoom rounded-lg overflow-hidden bg-secondary">
          <div className="aspect-[3/4]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium tracking-wide">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-3 py-1 bg-gold text-charcoal text-xs font-medium tracking-wide">
                BESTSELLER
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-charcoal text-ivory text-xs font-medium tracking-wide">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full transition-all ${
                inWishlist
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/90 hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-background text-foreground py-3 font-medium text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "text-gold" : "text-muted"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
