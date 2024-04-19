import { defineField, defineType } from "sanity";
export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "portrait",
      title: "Portrait image",
      type: "image",
      options: {
        hotspot: false,
      },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],
});
