import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, Grid, LayoutGrid } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, colors, sizes, priceRanges } from "@/data/products";

const Collection = () => {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: string[];
    colors: string[];
    sizes: string[];
    priceRange: { min: number; max: number } | null;
  }>({
    categories: [],
    colors: [],
    sizes: [],
    priceRange: null,
  });

  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply URL params
    if (categoryParam) {
      result = result.filter(
        (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    if (filterParam === "new") {
      result = result.filter((p) => p.isNew);
    }

    // Apply selected filters
    if (selectedFilters.categories.length > 0) {
      result = result.filter((p) =>
        selectedFilters.categories.includes(p.category.toLowerCase())
      );
    }

    if (selectedFilters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedFilters.colors.includes(c))
      );
    }

    if (selectedFilters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedFilters.sizes.includes(s))
      );
    }

    if (selectedFilters.priceRange) {
      result = result.filter(
        (p) =>
          p.price >= selectedFilters.priceRange!.min &&
          p.price <= selectedFilters.priceRange!.max
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
    }

    return result;
  }, [categoryParam, filterParam, selectedFilters, sortBy]);

  const toggleFilter = (
    type: "categories" | "colors" | "sizes",
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      colors: [],
      sizes: [],
      priceRange: null,
    });
  };

  const hasActiveFilters =
    selectedFilters.categories.length > 0 ||
    selectedFilters.colors.length > 0 ||
    selectedFilters.sizes.length > 0 ||
    selectedFilters.priceRange !== null;

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {categoryParam
                ? categories.find((c) => c.id === categoryParam)?.name || "Collection"
                : filterParam === "new"
                ? "New Arrivals"
                : "All Lehengas"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {filteredProducts.length} exquisite pieces for your special occasions
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border hover:border-primary transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {selectedFilters.categories.length +
                      selectedFilters.colors.length +
                      selectedFilters.sizes.length +
                      (selectedFilters.priceRange ? 1 : 0)}
                  </span>
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border bg-background focus:outline-none focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex-shrink-0 overflow-hidden"
                >
                  <div className="w-[280px] space-y-6">
                    {/* Categories */}
                    <div>
                      <h3 className="font-semibold mb-4">Category</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label
                            key={category.id}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={selectedFilters.categories.includes(
                                category.id
                              )}
                              onChange={() =>
                                toggleFilter("categories", category.id)
                              }
                              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="text-foreground/80 group-hover:text-primary transition-colors">
                              {category.name}
                            </span>
                            <span className="text-muted-foreground text-sm ml-auto">
                              ({category.count})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div>
                      <h3 className="font-semibold mb-4">Color</h3>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => toggleFilter("colors", color.name)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              selectedFilters.colors.includes(color.name)
                                ? "border-primary scale-110"
                                : "border-transparent hover:scale-110"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <h3 className="font-semibold mb-4">Size</h3>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleFilter("sizes", size)}
                            className={`px-4 py-2 border transition-colors ${
                              selectedFilters.sizes.includes(size)
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-semibold mb-4">Price Range</h3>
                      <div className="space-y-2">
                        {priceRanges.map((range) => (
                          <label
                            key={range.label}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="radio"
                              name="priceRange"
                              checked={
                                selectedFilters.priceRange?.min === range.min &&
                                selectedFilters.priceRange?.max === range.max
                              }
                              onChange={() =>
                                setSelectedFilters((prev) => ({
                                  ...prev,
                                  priceRange: { min: range.min, max: range.max },
                                }))
                              }
                              className="w-4 h-4 border-border text-primary focus:ring-primary"
                            />
                            <span className="text-foreground/80 group-hover:text-primary transition-colors">
                              {range.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No products match your filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-primary font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Collection;
