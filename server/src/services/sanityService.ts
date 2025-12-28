import axios from "axios";

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;

const sanityBaseUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${SANITY_DATASET}`;

export const sanityService = {
  // 📌 Tạo sản phẩm trên Sanity
  async createProduct(product: any) {
    try {
      await axios.post(
        sanityBaseUrl,
        {
          mutations: [
            {
              createOrReplace: {
                _id: `product.${product._id}`,
                _type: "product",
                name: product.name,
                slug: { _type: "slug", current: product.slug },
                images: product.images?.map((url: string) => ({
                  _type: "image",
                  asset: { _type: "reference", _ref: url },
                })),
                description: product.description,
                price: product.price,
                discount: product.discount,
                categories: product.categories,
                stock: product.stock,
                brand: product.brand,
                status: product.status,
                variant: product.variant,
                isFeatured: product.isFeatured,
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SANITY_TOKEN}`,
          },
        }
      );
    } catch (error) {
      console.error("❌ Lỗi khi đồng bộ tạo sản phẩm lên Sanity:", error);
    }
  },

  // 📌 Cập nhật sản phẩm
  async updateProduct(product: any) {
    return this.createProduct(product); // vì createOrReplace tự động cập nhật
  },

  // 📌 Xoá sản phẩm trên Sanity
  async deleteProduct(productId: string) {
    try {
      await axios.post(
        sanityBaseUrl,
        {
          mutations: [{ delete: { id: `product.${productId}` } }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SANITY_TOKEN}`,
          },
        }
      );
    } catch (error) {
      console.error("❌ Lỗi khi xoá sản phẩm trên Sanity:", error);
    }
  },
};
