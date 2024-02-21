import { defineField, defineType } from "sanity";
export default defineType({
  name: "general",
  title: "General",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo image",
      type: "image",
      options: {
        hotspot: false,
      },
    }),
    defineField({
      name: "name",
      title: "Name image",
      type: "image",
      options: {
        hotspot: false,
      },
    }),
  ],
});
