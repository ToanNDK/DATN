import { defineType, defineField } from 'sanity';

export const voucherType = defineType({
  name: "voucher",
  type: "document",
  title: "Voucher",

  fields: [
    defineField({
      name: "code",
      title: "Voucher Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "quantity",
      title: "Quantity Available",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "discountPercent",
      title: "Discount (%)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),

    defineField({
      name: "products",
      title: "Applicable Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "expireAt",
      title: "Expiration Date",
      type: "datetime",
    }),
  ],
});
