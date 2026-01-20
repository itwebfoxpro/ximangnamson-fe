import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/dashboard/",
          "/account/",
          "/login/",
          "/register/",
          "/private/",
          "/category/",
          "/notification/",
        ],
      },
    ],
    sitemap: "https://namsonjsc.vn/sitemap.xml",
  };
}
