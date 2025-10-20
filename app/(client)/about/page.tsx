"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-[var(--color-shop_light_bg)] text-[var(--color-darkColor)] font-[var(--font-poppins)]">
      {/* HERO */}
      <section className="relative bg-[var(--color-shop_dark_green)] text-white py-24">
        <div className="max-w-6xl mx-auto text-center px-6">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Giới thiệu về{" "}
            <span className="text-[var(--color-shop_orange)]">NDKStore</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[var(--color-shop_light_text)] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            NDKStore – cửa hàng điện thoại chính hãng, nơi bạn tìm thấy công nghệ
            tiên tiến và dịch vụ tận tâm nhất.
          </motion.p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-5 text-[var(--color-shop_dark_green)]">
            Câu chuyện của chúng tôi
          </h2>
          <p className="text-[var(--color-lightColor)] leading-relaxed mb-4">
            <strong>NDKStore</strong> được thành lập với sứ mệnh mang công nghệ
            đến gần hơn với người Việt. Từ một cửa hàng nhỏ, chúng tôi đã không
            ngừng phát triển để trở thành một trong những thương hiệu uy tín trong
            lĩnh vực bán lẻ điện thoại di động.
          </p>
          <p className="text-[var(--color-lightColor)] leading-relaxed">
            Với phương châm “Khách hàng là trọng tâm”, NDKStore luôn nỗ lực mang
            đến trải nghiệm mua sắm hiện đại, minh bạch và chuyên nghiệp nhất.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          {/* <Image
            src="/images/about-store.jpg"
            alt="NDKStore showroom"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          /> */}
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-bold text-[var(--color-shop_dark_green)] mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Sứ mệnh & Tầm nhìn
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            <motion.div
              className="p-8 bg-[var(--color-shop_light_bg)] rounded-2xl shadow hover:shadow-lg transition"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shop_light_green)]">
                🎯 Sứ mệnh
              </h3>
              <p className="text-[var(--color-shop_light_text)] leading-relaxed">
                Cung cấp sản phẩm công nghệ chất lượng, giúp người Việt tiếp cận
                những xu hướng mới nhất của thế giới với mức giá hợp lý nhất.
              </p>
            </motion.div>
            <motion.div
              className="p-8 bg-[var(--color-shop_light_bg)] rounded-2xl shadow hover:shadow-lg transition"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-shop_light_green)]">
                🚀 Tầm nhìn
              </h3>
              <p className="text-[var(--color-shop_light_text)] leading-relaxed">
                Trở thành hệ thống bán lẻ điện thoại đáng tin cậy hàng đầu Việt
                Nam, được yêu mến bởi chất lượng và phong cách phục vụ khác biệt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-[var(--color-shop_dark_green)] mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Cam kết của chúng tôi
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Hàng chính hãng 100%",
              desc: "NDKStore chỉ cung cấp sản phẩm có nguồn gốc rõ ràng, bảo hành đầy đủ.",
              icon: "📱",
            },
            {
              title: "Hỗ trợ tận tâm",
              desc: "Đội ngũ tư vấn và kỹ thuật viên sẵn sàng hỗ trợ 24/7.",
              icon: "🤝",
            },
            {
              title: "Giá tốt – Ưu đãi thật",
              desc: "Chính sách giá cạnh tranh, khuyến mãi hấp dẫn quanh năm.",
              icon: "💰",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4 text-[var(--color-shop_light_green)]">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-[var(--color-shop_light_text)]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-shop_dark_green)] text-white py-20 text-center">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hãy đến với{" "}
          <span className="text-[var(--color-shop_orange)]">NDKStore</span> ngay hôm nay!
        </motion.h2>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Khám phá những sản phẩm điện thoại mới nhất, nhận ưu đãi độc quyền và
          tận hưởng dịch vụ hậu mãi chu đáo nhất tại NDKStore.
        </motion.p>
        <motion.a
          href="/shop"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-[var(--color-shop_orange)] text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-orange-500 transition"
        >
          Mua sắm ngay
        </motion.a>
      </section>

      {/* SEO Text */}
      <section className="max-w-4xl mx-auto text-center py-16 px-6 text-[var(--color-shop_light_text)] leading-relaxed">
        <p>
          NDKStore – cửa hàng điện thoại chính hãng hàng đầu Việt Nam, chuyên cung
          cấp iPhone, Samsung, Xiaomi, Oppo và nhiều thương hiệu nổi tiếng khác.
          Với đội ngũ tận tâm và dịch vụ chuyên nghiệp, NDKStore là điểm đến tin
          cậy cho mọi tín đồ công nghệ.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
