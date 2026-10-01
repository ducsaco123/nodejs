import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Tên sản phẩm không được để trống" }),
  price: z.number().positive(),
  detailDesc: z
    .string()
    .trim()
    .min(1, { message: "Mô tả chi tiết không được để trống" }),
  shortDesc: z
    .string()
    .trim()
    .min(1, { message: "Mô tả ngắn không được để trống" }),
  quantity: z.number().positive().min(1, { message: "Số lượng không hợp lệ" }),
  factory: z
    .string()
    .trim()
    .min(1, { message: "Tên nhà sản xuất không được để trống" }),
  target: z
    .string()
    .trim()
    .min(1, { message: "Đối tượng sử dụng không được để trống" }),
});

export type TProductSchecma = z.infer<typeof ProductSchema>;
