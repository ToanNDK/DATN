"use client";

import { motion } from "framer-motion";
import React from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <div className="bg-[var(--color-shop_light_bg)] text-[var(--color-darkColor)] font-[var(--font-poppins)] overflow-hidden">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[var(--color-shop_dark_green)] to-[var(--color-shop_btn_dark_green)] text-white py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nâng tầm trải nghiệm<br />
            <span className="text-[var(--color-shop_orange)]">
              mua sắm điện thoại
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[var(--color-shop_light_text)] max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            NDKStore – cửa hàng điện thoại chính hãng, kết hợp công nghệ hiện đại
            và dịch vụ tận tâm dành cho người Việt.
          </motion.p>

          <motion.a
            href="/shop"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[var(--color-shop_orange)] px-10 py-4 rounded-xl font-semibold shadow-xl hover:opacity-90 transition"
          >
            Khám phá sản phẩm
          </motion.a>
        </div>
      </section>

      {/* VALUE */}
      <section className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: "📱",
            title: "Chính hãng 100%",
            desc: "Sản phẩm có nguồn gốc rõ ràng, bảo hành đầy đủ.",
          },
          {
            icon: "⚡",
            title: "Luôn cập nhật",
            desc: "Các mẫu điện thoại mới nhất trên thị trường.",
          },
          {
            icon: "🤝",
            title: "Hỗ trợ tận tâm",
            desc: "Đội ngũ tư vấn chuyên nghiệp, sẵn sàng hỗ trợ.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4 text-[var(--color-shop_light_green)]">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-[var(--color-shop_light_text)]">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* STORY */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-5 text-[var(--color-shop_dark_green)]">
              Hành trình của NDKStore
            </h2>
            <p className="text-[var(--color-shop_light_text)] mb-4 leading-relaxed">
              NDKStore được thành lập với mong muốn mang những sản phẩm công nghệ
              chính hãng đến gần hơn với người Việt.
            </p>
            <p className="text-[var(--color-shop_light_text)] leading-relaxed">
              Chúng tôi lấy sự minh bạch và trải nghiệm khách hàng làm kim chỉ nam
              trong mọi hoạt động.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-64 rounded-3xl bg-gradient-to-tr from-[var(--color-shop_light_green)] to-[var(--color-shop_orange)] shadow-xl"
          />
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-10">
        {[
          {
            title: "🎯 Sứ mệnh",
            desc: "Cung cấp sản phẩm công nghệ chất lượng với mức giá hợp lý cho mọi khách hàng.",
          },
          {
            title: "🚀 Tầm nhìn",
            desc: "Trở thành hệ thống bán lẻ điện thoại uy tín hàng đầu Việt Nam.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[var(--color-shop_lighter_bg)] p-10 rounded-2xl shadow hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-shop_dark_green)]">
              {item.title}
            </h3>
            <p className="text-[var(--color-shop_light_text)] leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--color-shop_dark_green)] py-24 text-center text-white">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Sẵn sàng nâng cấp chiếc điện thoại của bạn?
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-[var(--color-shop_light_text)] mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trải nghiệm mua sắm an tâm, sản phẩm chính hãng và dịch vụ tận tâm
          chỉ có tại NDKStore.
        </motion.p>
        <motion.a
          href="/shop"
          whileHover={{ scale: 1.08 }}
          className="inline-block bg-[var(--color-shop_orange)] px-12 py-4 rounded-xl font-semibold shadow-xl hover:opacity-90 transition"
        >
          Bắt đầu mua sắm
        </motion.a>
      </section>
    </div>
  );
};

export default AboutPage;
