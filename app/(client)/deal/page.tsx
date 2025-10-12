import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";
import React from "react";
import Link from "next/link"; // nếu bạn muốn link tới trang khác

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Ưu đãi hot trong tuần
        </Title>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {products?.map((product) => (
            //@ts-ignore
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>

        {/* Nút xem thêm */}
        <div className="flex justify-center">
          <Link
            href="/shop" // có thể đổi link nếu muốn
            className="px-6 py-2 bg-black text-white rounded-md font-medium transition-colors hover:bg-blue-600"
          >
            View All
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
