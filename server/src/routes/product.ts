import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Product, { IProduct } from "../models/Product";
import { sanityService } from "../services/sanityService";

const router = express.Router();

/**
 * 📌 Lấy tất cả sản phẩm
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
  }
});

/**
 * 📌 Lấy 1 sản phẩm theo slug
 */
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
  }
});

/**
 * 📌 Tạo mới sản phẩm
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    // Đồng bộ lên Sanity (tuỳ chọn)
    await sanityService.createProduct(savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("❌ Lỗi khi tạo sản phẩm:", error);
    res.status(500).json({ message: "Lỗi khi tạo sản phẩm", error });
  }
});

/**
 * 📌 Cập nhật sản phẩm
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate<IProduct>(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    }

    // Đồng bộ cập nhật lên Sanity
    await sanityService.updateProduct(updatedProduct);

    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
  }
});

/**
 * 📌 Xoá sản phẩm
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete<IProduct>(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để xoá" });
    }

    // Ép kiểu _id sang ObjectId rồi chuyển thành string
    const productId = (deletedProduct._id as mongoose.Types.ObjectId).toString();

    // Đồng bộ xoá bên Sanity
    await sanityService.deleteProduct(productId);

    res.json({ message: "Đã xoá sản phẩm thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi xoá sản phẩm:", error);
    res.status(500).json({ message: "Lỗi khi xoá sản phẩm", error });
  }
});

export default router;
