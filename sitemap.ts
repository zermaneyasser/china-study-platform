import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const locales = ["en", "ar"] as const;

type Locale = (typeof locales)[number];

function urlFor(locale: Locale, path: string) {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}/${locale}${cleaned === "/" ? "" : cleaned}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [universities, posts] = await Promise.all([
    prisma.university.findMany({
      where: { deletedAt: null },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 5000,
    }),
    prisma.blogPost.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 5000,
    }),
  ]);

  const staticPaths = [
    "/",
    "/about",
    "/universities",
    "/programs",
    "/services",
    "/blog",
    "/contact",
    "/apply",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      entries.push({
        url: urlFor(locale, p),
        lastModified: now,
        changeFrequency: "weekly",
        priority: p === "/" ? 1 : 0.7,
      });
    }

    for (const u of universities) {
      entries.push({
        url: urlFor(locale, `/universities/${u.slug}`),
        lastModified: u.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }

    for (const post of posts) {
      entries.push({
        url: urlFor(locale, `/blog/${post.slug}`),
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
