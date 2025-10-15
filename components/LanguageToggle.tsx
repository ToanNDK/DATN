
"use client";

import { Globe } from "lucide-react";
import React, { useState } from "react";

// Tạm thời mô phỏng logic chuyển đổi ngôn ngữ bằng state cục bộ
// Trong thực tế, bạn sẽ dùng Context hoặc hook i18n của Next.js
const LanguageToggle = () => {
  // Giả sử trang mặc định là tiếng Anh (en) và nút này chuyển sang tiếng Việt (vi)
  const [isVi, setIsVi] = useState(true);

  const handleToggle = () => {
    // ⚠️ CHÚ Ý: Logic thực tế phải kích hoạt thư viện i18n hoặc thay đổi URL
    // Tạm thời chỉ thay đổi icon và console log
    setIsVi(!isVi);
    
    // Nếu bạn đang dùng Next.js i18n, logic sẽ là:
    // router.push(router.pathname, router.asPath, { locale: isVi ? 'en' : 'vi' })
    
    console.log(`Chuyển sang ngôn ngữ: ${isVi ? 'English' : 'Tiếng Việt'}`);
    alert(`Chuyển sang ${isVi ? 'English' : 'Tiếng Việt'}. (Cần triển khai i18n thực tế)`);
  };

  return (
    <button
      onClick={handleToggle}
      className="group relative hover:text-shop_light_green hoverEffect flex items-center gap-1"
      aria-label={isVi ? "Switch to English" : "Chuyển sang Tiếng Việt"}
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-semibold hidden lg:inline">
        {isVi ? "EN" : "VI"}
      </span>
    </button>
  );
};

export default LanguageToggle;