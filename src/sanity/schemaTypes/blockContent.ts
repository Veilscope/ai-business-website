import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Article body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              return parent?.asset && !value
                ? "Alt text is required when an image is used."
                : true;
            }),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        defineField({
          name: "tone",
          title: "Tone",
          type: "string",
          initialValue: "note",
          options: {
            list: [
              { title: "Note", value: "note" },
              { title: "Practical tip", value: "tip" },
              { title: "Caution", value: "caution" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {
          title: "title",
          subtitle: "body",
        },
        prepare({ title, subtitle }) {
          return {
            title: title || "Callout",
            subtitle,
          };
        },
      },
    }),
  ],
});
