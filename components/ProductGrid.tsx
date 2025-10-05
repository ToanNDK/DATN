"use client";
import React, { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [columns, setColumns] = useState(3); // 👉 số cột mặc định

  const query = `*[_type == "product" && variant == $variant] | order(name asc){
    ...,
    "categories": categories[]->title
  }`;

  const params = { variant: selectedTab.toLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 👉 Offline mode
        if (!navigator.onLine) {
          const cached = localStorage.getItem(`products_${params.variant}`);
          if (cached) {
            setProducts(JSON.parse(cached));
            console.log("📦 Loaded from localStorage (offline mode)");
            return;
          }
        }

        // 👉 Online fetch
        const response = await client.fetch(query, params);
        setProducts(response);

        // 👉 Cache lại
        localStorage.setItem(`products_${params.variant}`, JSON.stringify(response));
        console.log("✅ Data fetched from Sanity and cached");
      } catch (error) {
        console.error("❌ Fetching Error:", error);
        const cached = localStorage.getItem(`products_${params.variant}`);
        if (cached) setProducts(JSON.parse(cached));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

        <div className="flex items-center gap-2 md:ml-auto">
          <span className="text-sm text-gray-500 hidden sm:inline">View</span>
          <div className="flex border rounded-lg overflow-hidden">
            {[2, 3, 5].map((num) => (
              <button
                key={num}
                onClick={() => setColumns(num)}
                className={`px-3 py-1 text-sm transition-colors ${
                  columns === num
                    ? "bg-green-600 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Grid sản phẩm --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
          <div className="space-x-2 flex items-center text-green-600">
            <Loader2 className="w-5 h-6 animate-spin" />
            <span>Loading Product...</span>
          </div>
        </div>
      ) : products?.length ? (
        <div
          className={`grid mt-10 gap-3 sm:gap-4 transition-all duration-300
            ${
              columns === 2
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                : columns === 3
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            }`}
        >
          {products.map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
