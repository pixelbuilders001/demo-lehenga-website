import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";
import heroImage from "@/assets/hero-lehenga.jpg";

const Index = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Priya Mehta",
      location: "Mumbai",
      rating: 5,
      text: "Absolutely stunning lehenga! The craftsmanship is impeccable and it fit perfectly. Received so many compliments at my sister's wedding.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    },
    {
      name: "Ananya Sharma",
      location: "Delhi",
      rating: 5,
      text: "VANYA exceeded all my expectations. The attention to detail and quality of embroidery is worth every penny. Thank you for making my wedding day special!",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    },
    {
      name: "Sneha Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "From the ordering process to delivery, everything was seamless. The lehenga looks even more beautiful in person than in photos!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="VANYA Bridal Collection"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/30 to-transparent" />
        </div>
        
        <div className="relative h-full container-luxury flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-ivory"
          >
            <span className="inline-block text-gold font-medium tracking-widest text-sm mb-4">
              BRIDAL COLLECTION 2024
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
              Timeless
              <br />
              <span className="text-gold">Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-ivory/90 mb-8 leading-relaxed">
              Discover exquisite handcrafted lehengas that celebrate the beauty of Indian tradition with contemporary sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/collection" className="btn-gold inline-flex items-center gap-2">
                Explore Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/collection?category=bridal" className="btn-luxury-outline text-ivory border-ivory hover:bg-ivory hover:text-charcoal">
                Bridal Lehengas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Shop by Occasion</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find the perfect lehenga for every celebration in your life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/collection?category=${category.id}`}
                  className="group block p-6 bg-background rounded-lg hover-lift text-center"
                >
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{category.count} Styles</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium tracking-widest text-sm mb-2 block">
                JUST IN
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">New Arrivals</h2>
            </motion.div>
            <Link
              to="/collection?filter=new"
              className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter((p) => p.isNew).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/collection?filter=new"
              className="inline-flex items-center gap-2 text-primary font-medium"
            >
              View All New Arrivals
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section className="section-padding bg-charcoal text-ivory overflow-hidden">
        <div className="container-luxury">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-medium tracking-widest text-sm mb-2 block">
                CUSTOMER FAVORITES
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Best Sellers</h2>
            </motion.div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-3 border border-ivory/30 hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-3 border border-ivory/30 hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 md:px-8"
        >
          {products.filter((p) => p.isBestSeller).map((product) => (
            <div key={product.id} className="flex-shrink-0 w-72 md:w-80">
              <Link to={`/product/${product.id}`} className="group block">
                <div className="relative image-hover-zoom rounded-lg overflow-hidden">
                  <div className="aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-ivory group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gold font-semibold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="py-8 bg-gradient-luxury">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="py-8"
          >
            <span className="text-gold font-medium tracking-widest text-sm mb-3 block">
              LIMITED TIME OFFER
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-ivory mb-4">
              Flat 40% Off
            </h2>
            <p className="text-ivory/80 text-lg mb-6">
              On select bridal collection pieces. Use code: VANYA40
            </p>
            <Link to="/collection" className="btn-gold">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium tracking-widest text-sm mb-2 block">
              CURATED FOR YOU
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Trending Now</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/collection" className="btn-luxury inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium tracking-widest text-sm mb-2 block">
              TESTIMONIALS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">What Our Brides Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-8 rounded-lg relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 leading-relaxed">{review.text}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-muted-foreground text-sm">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Stay in the Loop
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Subscribe for exclusive previews, styling tips, and special offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/30 rounded text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-gold"
                />
                <button className="btn-gold">Subscribe</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
