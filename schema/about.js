import { defineField, defineType } from "sanity";
import {BlockContentIcon} from '@sanity/icons';

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Content Sections",
      type: "array",
      sortable: true,
      of: [{
        type: "object",
        icon: BlockContentIcon,
        fields: [
          {name: "sectionTitle", type: "string", title: "Section Title"},
          {name: "sectionText", type: "blockContent", title: "Section Text"},
        ]
      }]
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: {
        hotspot: false,
      },
      fields: [
        {name: "width", type: "number", title: "Image Width (pixels)"},
        {name: "height", type: "number", title: "Image Height (pixels)"},
      ]
    }),
  ],
  preview: {
		select: {
			title: "title",
		},
		prepare() {
			return {
				title: "About Page Content",
			};
		},
	},
});
