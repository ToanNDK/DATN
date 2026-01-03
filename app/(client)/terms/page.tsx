"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Điều khoản sử dụng
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng website của chúng tôi.
        </p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              1. Chấp nhận điều khoản
            </h2>
            <p>
              Khi truy cập và sử dụng website bán điện thoại của chúng tôi, bạn
              đồng ý tuân thủ toàn bộ các điều khoản và điều kiện được nêu trong
              văn bản này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui
              lòng ngừng sử dụng website.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              2. Phạm vi sử dụng website
            </h2>
            <p>
              Website được sử dụng nhằm mục đích cung cấp thông tin và bán các
              sản phẩm điện thoại di động, phụ kiện đi kèm. Người dùng không
              được sử dụng website cho các mục đích trái pháp luật, gian lận
              hoặc gây ảnh hưởng đến quyền lợi của bên thứ ba.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              3. Tài khoản người dùng
            </h2>
            <p>
              Khi đăng ký tài khoản, bạn có trách nhiệm cung cấp thông tin chính
              xác và bảo mật thông tin đăng nhập. Mọi hoạt động phát sinh từ tài
              khoản của bạn đều được xem là do bạn thực hiện.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              4. Thông tin sản phẩm và giá cả
            </h2>
            <p>
              Chúng tôi cam kết cung cấp thông tin sản phẩm và giá bán chính xác
              nhất có thể. Tuy nhiên, trong một số trường hợp có thể xảy ra sai
              sót, chúng tôi có quyền điều chỉnh hoặc hủy đơn hàng nếu phát hiện
              thông tin không chính xác.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              5. Đặt hàng và thanh toán
            </h2>
            <p>
              Khi đặt hàng trên website, bạn xác nhận thông tin đơn hàng là
              chính xác và đồng ý với các hình thức thanh toán được cung cấp.
              Đơn hàng chỉ được xử lý sau khi hệ thống xác nhận thanh toán thành
              công (nếu có).
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              6. Giao hàng và đổi trả
            </h2>
            <p>
              Thời gian giao hàng và chính sách đổi trả được công bố rõ ràng trên
              website. Chúng tôi không chịu trách nhiệm đối với các trường hợp
              giao hàng chậm do nguyên nhân khách quan ngoài tầm kiểm soát.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              7. Quyền sở hữu trí tuệ
            </h2>
            <p>
              Toàn bộ nội dung trên website, bao gồm hình ảnh, logo, văn bản và
              mã nguồn, đều thuộc quyền sở hữu của chúng tôi hoặc đối tác liên
              kết. Nghiêm cấm sao chép, sử dụng lại khi chưa có sự đồng ý bằng
              văn bản.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              8. Giới hạn trách nhiệm
            </h2>
            <p>
              Chúng tôi không chịu trách nhiệm đối với các thiệt hại phát sinh do
              việc sử dụng hoặc không thể sử dụng website, bao gồm nhưng không
              giới hạn các thiệt hại gián tiếp hoặc mất mát dữ liệu.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              9. Thay đổi điều khoản
            </h2>
            <p>
              Chúng tôi có quyền thay đổi nội dung điều khoản sử dụng bất kỳ lúc
              nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên
              website. Việc bạn tiếp tục sử dụng website đồng nghĩa với việc
              chấp nhận các điều khoản đã được cập nhật.
            </p>
          </div>
        </div>

        <p className="mt-12 text-sm text-center text-gray-500 dark:text-gray-400">
          Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
        </p>
      </motion.div>
    </section>
  );
}
