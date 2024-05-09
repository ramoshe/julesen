import { defineField, defineType } from "sanity";
import {ExpandIcon} from '@sanity/icons'

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
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
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
    defineField({
      name: "orderRank",
      title: "Order",
      type: "string",
      hidden: true,
    }),
  ],
});
