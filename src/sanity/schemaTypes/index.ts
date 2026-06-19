import { articleType } from "@/sanity/schemaTypes/article";
import { authorType } from "@/sanity/schemaTypes/author";
import { blockContentType } from "@/sanity/schemaTypes/blockContent";
import { categoryType } from "@/sanity/schemaTypes/category";

export const schemaTypes = [
  articleType,
  categoryType,
  authorType,
  blockContentType,
];
