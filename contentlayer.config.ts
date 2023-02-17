import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Slide = defineDocumentType(() => ({
  name: "Slide",
  filePathPattern: `talks/**/*.mdx`,
  contentType: "mdx",
  fields: {
    cliFlair: {
      type: "string",
      description: "Path to use for terminal decoration on slide.",
      required: true
    },
    title: {
      type: "string",
      description: "Title of the slide. Will not show on slide.",
      required: true
    },
    order: {
      type: "number",
      description: "Position of the slide in the deck. First, second, third, etc.",
      required: true
    }
  },
  computedFields: {
    deck: {
      type: 'string',
      // The split is for handling the file structure
      // e.g. /talks/abc drops the "/talks/" to become "abc"
      resolve: (doc) => doc._raw.flattenedPath.split("/")[1]
    },
  },

}))

const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    summary: {
      type: "string",
      description: "A summary of the post to show on OGs and other key spots.",
      required: true
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      // The split is for handling the file structure
      // e.g. /blog/abc drops the "/blog/" to become "abc"
      resolve: (doc) => doc._raw.flattenedPath.split("/")[1],
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, Slide],
})
