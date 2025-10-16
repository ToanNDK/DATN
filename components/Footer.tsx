"use client";

import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-gray-50 to-white border-t">
      <Container>
        <FooterTop />

        {/* Nội dung chính của Footer */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Cột 1: Thương hiệu */}
          <div className="space-y-5">
            <Logo className="text-2xl" />
            <SubText className="text-gray-600 leading-relaxed">
              Khám phá bộ sưu tập nội thất tinh tế tại{" "}
              <span className="font-semibold text-shop_light_green">
                NDKStore
              </span>
              , nơi phong cách và sự thoải mái hòa quyện để tôn lên không gian sống của bạn.
            </SubText>

            <div className="pt-2">
              <SocialMedia
                className="text-gray-500 flex gap-3"
                iconClassName="border-gray-400/40 hover:border-shop_light_green hover:text-shop_light_green transition-all duration-300"
                tooltipClassName="bg-darkColor text-white"
              />
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <SubTitle className="text-lg font-semibold mb-4 text-darkColor">
              Liên kết nhanh
            </SubTitle>
            <ul className="space-y-3">
              {quickLinksData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-shop_light_green transition-colors duration-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Danh mục sản phẩm */}
          <div>
            <SubTitle className="text-lg font-semibold mb-4 text-darkColor">
              Danh mục
            </SubTitle>
            <ul className="space-y-3">
              {categoriesData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={`/category/${item.href}`}
                    className="text-gray-600 hover:text-shop_light_green transition-colors duration-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận tin */}
          <div className="space-y-5">
            <SubTitle className="text-lg font-semibold text-darkColor">
              Đăng ký nhận tin
            </SubTitle>
            <SubText className="text-gray-600">
              Đăng ký nhận bản tin để cập nhật sớm nhất về sản phẩm mới, ưu đãi
              và tin tức từ{" "}
              <span className="font-semibold text-shop_light_green">
                Shopcartyt
              </span>.
            </SubText>
            
          </div>
        </div>

        {/* Đường kẻ phân tách */}
        <div className="border-t border-gray-200"></div>

        {/* Phần cuối Footer */}
        <div className="py-6 text-center text-gray-500 text-sm flex flex-col sm:flex-row items-center justify-between">
          <div>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-darkColor">
              NDKStore
            </span>
            . Mọi quyền được bảo lưu.
          </div>

          <div className="mt-3 sm:mt-0 space-x-4">
            <Link
              href="/privacy-policy"
              className="hover:text-shop_light_green transition"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/terms"
              className="hover:text-shop_light_green transition"
            >
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
