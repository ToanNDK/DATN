"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--color-shop_light_bg)] text-[var(--color-darkColor)] font-[var(--font-poppins)]">
      
      {/* HERO */}
      <section className="bg-[var(--color-shop_dark_green)] text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Chính sách bảo mật
          </motion.h1>
          <motion.p
            className="text-[var(--color-shop_light_text)] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            NDKStore cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
            khi truy cập và mua sắm trên website.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto py-20 px-6 space-y-12">

        {/* 1 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-[var(--color-shop_dark_green)]">
            1. Mục đích thu thập thông tin
          </h2>
          <p className="text-[var(--color-shop_light_text)] leading-relaxed">
            Chúng tôi thu thập thông tin cá nhân của khách hàng nhằm phục vụ cho
            việc xử lý đơn hàng, hỗ trợ khách hàng, cung cấp thông tin sản phẩm,
            chương trình khuyến mãi và nâng cao chất lượng dịch vụ.
          </p>
        </motion.div>

        {/* 2 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-[var(--color-shop_dark_green)]">
            2. Phạm vi thu thập thông tin
          </h2>
          <p className="text-[var(--color-shop_light_text)] leading-relaxed">
            Các thông tin cá nhân có thể được thu thập bao gồm: họ tên, địa chỉ
            email, số điện thoại, địa chỉ giao hàng và thông tin thanh toán
            (không bao gồm thông tin thẻ ngân hàng).
          </p>
        </motion.div>

        {/* 3 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-[var(--color-shop_dark_green)]">
            3. Phạm vi sử dụng thông tin
          </h2>
          <p className="text-[var(--color-shop_light_text)] leading-relaxed">
            Thông tin cá nhân của khách hàng chỉ được sử dụng trong nội bộ
            NDKStore hoặc chia sẻ với các đối tác vận chuyển, thanh toán để
            hoàn tất đơn hàng. Chúng tôi không bán hoặc chia sẻ thông tin cá
            nhân cho bên thứ ba vì mục đích thương mại.
          </p>
        </motion.div>

        {/* 4 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-[var(--color-shop_dark_green)]">
            4. Thời gian lưu trữ thông tin
          </h2>
          <p className="text-[var(--color-shop_light_text)] leading-relaxed">
            Thông tin cá nhân của khách hàng được lưu trữ cho đến khi khách hàng
            yêu cầu hủy bỏ hoặc website ngừng hoạt động, trừ trường hợp pháp
            luật có quy định khác.
          </p>
        </motion.div>

        {/* 5 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-[var(--color-shop_dark_green)]">
            5. Bảo mật thông tin
          </h2>
          <p className="text-[var(--color-shop_light_text)] leading-relaxed">
            Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý phù hợp nhằm bảo
            vệ thông tin cá nhân của khách hàng khỏi truy cập trái phép, mất mát
            hoặc tiết lộ không mong muốn.
          </p>
        </motion.div>

        {/* 6 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-[var(--color-shop_dark_green)]">
            6. Quyền của khách hàng
          </h2>
          <p className="text-[var(--color-shop_light_text)] leading-relaxed">
            Khách hàng có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá
            nhân của mình bằng cách liên hệ với chúng tôi thông qua các kênh hỗ
            trợ được cung cấp trên website.
          </p>
        </motion.div>

        {/* 7 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-[var(--color-shop_dark_green)]">
            7. Thay đổi chính sách bảo mật
          </h2>
          <p className="text-[var(--color-shop_light_text)] leading-relaxed">
            NDKStore có quyền thay đổi nội dung Chính sách bảo mật bất kỳ lúc
            nào. Mọi thay đổi sẽ được cập nhật trực tiếp trên website và có
            hiệu lực ngay khi đăng tải.
          </p>
        </motion.div>
      </section>

      {/* FOOTER NOTE */}
      <section className="text-center py-12 text-sm text-[var(--color-shop_light_text)]">
        Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
      </section>
    </div>
  );
}
