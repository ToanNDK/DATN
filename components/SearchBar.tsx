"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 🧩 Kiểu sản phẩm
interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  slug?: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch kết quả
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
        setShowDropdown(true);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div ref={containerRef} className="relative">
      {/* Nút Search + Input */}
      <div
        className={`flex items-center gap-2 border rounded-full bg-white transition-all duration-300 overflow-hidden ${
          expanded ? "w-64 px-3 py-2" : "w-10 p-2 cursor-pointer"
        }`}
        onClick={() => setExpanded(true)}
      >
        <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
        {expanded && (
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="outline-none text-sm w-full"
            autoFocus
          />
        )}
      </div>

      {/* Dropdown kết quả */}
      {showDropdown && expanded && (
        <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md mt-2 z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
          ) : results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug}`}
                className="flex items-center gap-3 p-2 hover:bg-gray-100"
              >
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">${product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
