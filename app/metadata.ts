import { Metadata } from "next";
import { tagline } from "#/app/constants";

const baseMetadata: Metadata =
{
  metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://localhost:${process.env.PORT ?? 3000}`),
  title: {
    default: 'Anthony Shew',
    template: '%s | Anthony Shew',
  },
  robots: {
    index: true,
    follow: true,
  },
  description: tagline,
  openGraph: {
    title: 'Anthony Shew',
    description: tagline,
    url: encodeURI(`https://${process.env.VERCEL_URL}/api/og?title=Anthony Shew`),
    siteName: 'Anthony Shew',
    images: [
      {
        url: encodeURI(`https://${process.env.VERCEL_URL}/api/og?title=Anthony Shew`),
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: 'Anthony Shew',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

interface BuildMetaParams extends Metadata {
  title: string,
  description?: string
  ogImage?: NonNullable<NonNullable<Metadata["openGraph"]>["images"]>
}

export const buildMeta = async ({ title, description, ogImage, ...metadata }: BuildMetaParams): Promise<Metadata> => {

  baseMetadata.openGraph ? baseMetadata.openGraph.images = ogImage ?? [
    {
      url: encodeURI(`https://${process.env.VERCEL_URL}/api/og?title=${title ?? "Anthony Shew"}`),
      width: 1920,
      height: 1080,
    }
  ] : () => { }

  if (description) {
    baseMetadata.description = description
  }

  return { ...baseMetadata, title, ...metadata }
}

export default baseMetadata