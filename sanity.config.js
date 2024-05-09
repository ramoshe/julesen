// Different environments use different variables
const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET ||
  import.meta.env.PUBLIC_SANITY_DATASET;
// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2,
    )}`,
  );
}
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema";
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list';
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {ComposeIcon} from '@sanity/icons';

export default defineConfig({
  name: "julesen",
  title: "Julesen",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("General")
              .icon()
              .child(
                S.document()
                  .schemaType("general")
                  .documentId("general")
              ),
            S.listItem()
              .title("About")
              .icon()
              .child(
                S.document()
                  .schemaType("about")
                  .documentId("about")
              ),
            orderableDocumentListDeskItem({
              type: "art",
              title: "Art",
              icon: ComposeIcon,
              menuItems: [],
              S,
              context,
            }),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                ![
                  "general",
                  "about",
                  "art",
                ].includes(listItem.getId() ?? "default")
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  }
});
