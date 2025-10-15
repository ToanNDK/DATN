import { NextResponse } from "next/server";
import { createClient } from '@sanity/client';

// -----------------------------------------------------------
// HẰNG SỐ CẤU HÌNH
// -----------------------------------------------------------
// Giả định tỷ giá để chuyển đổi USD sang VNĐ cho mục đích tìm kiếm Sanity
const USD_TO_VND_RATE = 25000; 

// SANITY CLIENT INITIALIZATION (V3)
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', 
    apiVersion: '2022-03-07', 
    useCdn: true,
});
// -----------------------------------------------------------


export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message)
      return NextResponse.json({ error: "No message" }, { status: 400 });

  
    
    // 1. Tìm kiếm Sản phẩm từ Sanity (Ưu tiên 1)
    const products = await searchSanityProducts(message);
    
    if (products.length > 0) {
      // ✅ Xây dựng câu trả lời từ dữ liệu sản phẩm
      const productList = products.map(p => 
        `- ${p.name} (Giá: ${p.price.toLocaleString('vi-VN')}$) - Xem: /product/${p.slug}` 
      ).join('\n');
      
      const productAnswer = products.length === 1 
        ? `Tôi tìm thấy sản phẩm này: ${productList}. Bạn cần mình hỗ trợ thêm không?`
        : `Tôi đã tìm thấy ${products.length} sản phẩm phù hợp:\n${productList}\nBạn quan tâm đến sản phẩm nào ạ?`;
      
      return NextResponse.json({ answer: productAnswer });
    }

    // 2. Xử lý khi không có API Key (Ưu tiên 2)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
    if (!GEMINI_API_KEY) {
      const fallback = `Mình chưa có thông tin chính xác. Gợi ý: ${generateShortSuggestion(
        message
      )}`;
      return NextResponse.json({ answer: fallback });
    }

    // 3. Gọi API Gemini (Ưu tiên 3 - Fallback)
    // Gọi Gemini chỉ khi không tìm thấy sản phẩm trong Sanity
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const geminiRes = await fetch(geminiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Bạn là trợ lý bán hàng cho cửa hàng điện thoại. Dữ liệu sản phẩm không có kết quả tìm kiếm. Vui lòng trả lời ngắn gọn, thân thiện, bằng tiếng Việt và đề xuất người dùng cung cấp thông tin chi tiết hơn hoặc hỏi các câu hỏi chung chung khác.\n\nCâu hỏi: ${message}`,
              },
            ],
          },
        ],
      }),
    });

    if (!geminiRes.ok) {
      console.error(await geminiRes.text());
      return NextResponse.json({
        answer: "Xin lỗi, không thể kết nối dịch vụ Gemini.",
      });
    }

    const data = await geminiRes.json();
    const aiAnswer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Xin lỗi, mình chưa có thông tin cụ thể.";

    return NextResponse.json({ answer: aiAnswer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// -----------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------



interface Product {
  name: string;
  slug: string; 
  price: number;
}

// Hàm lấy dữ liệu sản phẩm từ Sanity
async function searchSanityProducts(query: string): Promise<Product[]> {
    const q = query.toLowerCase().trim();
    if (!q) return []; 

    // 1. PHÂN TÍCH CÚ PHÁP TÌM KIẾM GIÁ ($)
    let priceFilter = '';
    let searchQuery = q;
    let priceParams = {};

    // Regex đơn giản hơn để bắt [từ khóa] [giá]$
    // Bắt: (dưới|trên|từ|khoảng) [số]$ hoặc chỉ [số]$
    const priceRegex = /(dưới|bé hơn|less than|trên|lớn hơn|more than|từ|khoảng)\s*(\d+(\.\d+)?)\s*\$|(\d+(\.\d+)?)\s*\$/;
    const match = query.match(priceRegex);

    if (match) {
        let operator = '';
        let priceUSD = 0;
        let priceKey = 'priceFilter';
        
        // Match[2] là giá trị số của nhóm 1 (dưới/trên), Match[4] là giá trị số của nhóm 2 (chỉ số)
        if (match[2]) { // Bắt các trường hợp có từ khóa (dưới/trên/...)
            const keyword = match[1];
            priceUSD = parseFloat(match[2]);

            if (/(dưới|bé hơn|less than)/.test(keyword)) {
                operator = '<';
            } else if (/(trên|lớn hơn|more than)/.test(keyword)) {
                operator = '>';
            } else if (/(từ|khoảng)/.test(keyword)) {
                operator = 'range'; // Giả định là "khoảng $X"
            }
        } else if (match[4]) { // Bắt trường hợp chỉ có số và $ (ví dụ: 1000$)
            operator = 'range';
            priceUSD = parseFloat(match[4]);
        }
        
        if (priceUSD > 0) {
            const priceVND = priceUSD * USD_TO_VND_RATE;

            if (operator === '<') {
                priceFilter = `&& price < $${priceKey}`;
                priceParams = { [priceKey]: priceVND };
            } else if (operator === '>') {
                priceFilter = `&& price > $${priceKey}`;
                priceParams = { [priceKey]: priceVND };
            } else if (operator === 'range' || operator === '==') { 
                // Xử lý "khoảng X$" hoặc "X$" (tìm trong khoảng 90% đến 110%)
                priceFilter = `&& price >= $${priceKey}Min && price <= $${priceKey}Max`;
                priceParams = {
                    [`${priceKey}Min`]: priceVND * 0.9,
                    [`${priceKey}Max`]: priceVND * 1.1,
                };
            }

            // Loại bỏ cụm từ giá ra khỏi truy vấn tìm kiếm văn bản
            searchQuery = q.replace(priceRegex, '').trim();
        }
    }
    
    // 2. XÂY DỰNG TRUY VẤN GROQ
    
    let textFilter = '';
    // ✅ Đã sửa: Chỉ tìm kiếm văn bản nếu còn từ khóa (lớn hơn 2 ký tự)
    if (searchQuery.length > 2) { 
        textFilter = `&& (name match $textQ || description match $textQ)`;
    } 
    // Nếu chỉ có priceFilter và textFilter rỗng, GROQ vẫn hợp lệ: `*[_type == "product" && price < $priceFilter]`

    // Khởi đầu truy vấn luôn là `*[_type == "product"`
    const GROQ_QUERY = `*[_type == "product" ${textFilter} ${priceFilter}][0..4]{
      name, 
      "slug": slug.current, 
      price
    }`;

    const queryParams = { 
        textQ: searchQuery.length > 2 ? `*${searchQuery}*` : undefined, 
        ...priceParams, 
    };

    // 3. KIỂM TRA ĐIỀU KIỆN CUỐI CÙNG TRƯỚC KHI FETCH
    // Nếu không có cả priceFilter và textFilter, tức là query rỗng hoặc không có ý nghĩa
    if (textFilter === '' && priceFilter === '') {
        return [];
    }

    try {
        // ... (Logic fetch giữ nguyên) ...
        const products = await client.fetch(GROQ_QUERY, queryParams);
        
        return products.map((p: any) => ({
            ...p,
            price: Number(p.price) || 0,
        })) as Product[];
    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Sanity:", error);
        return []; 
    }
}


function generateShortSuggestion(query: string) {
    if (/giá|bao nhiêu|price/i.test(query))
        return "Vui lòng cho biết model bạn quan tâm (vd: iPhone 15 Pro) hoặc khoảng giá ($).";
    if (/bảo hành|bh/i.test(query))
        return "Bạn có câu hỏi nào khác về sản phẩm không? Mình chỉ hỗ trợ tìm kiếm sản phẩm và trả lời bằng AI thôi ạ.";
    return "Bạn có thể cung cấp model, hãng, hoặc khoảng giá ($) để mình hỗ trợ tìm kiếm sản phẩm chi tiết hơn.";
}