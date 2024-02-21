import { defineField, defineType } from "sanity";
export default defineType({
  name: "art",
  title: "Art",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
			name: "altImages",
			title: "Alternate Images",
			type: "array",
			options: { layout: "grid" },
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							type: "number",
							name: "width",
							title: "Width (in pixels)",
						},
						{
							type: "number",
							name: "height",
							title: "Height (in pixels)",
						},
					],
				},
			],
		}),
  ],
});
