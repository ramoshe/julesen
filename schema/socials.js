import { defineField, defineType } from "sanity";
export default defineType({
  name: "socials",
  title: "Socials",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      layout: "dropdown",
      list: [
        {title: "TikTok", value: "tiktok"},
        {title: "Kick", value: "kick"},
        {title: "Instagram", value: "instagram"},
        {title: "YouTube", value: "youtube"},
        {title: "Discord", value: "discord"},
        {title: "PayPal", value: "paypal"},
        {title: "CashApp", value: "cashapp"}
      ]
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "string",
      hidden: true,
    }),
  ],
});
