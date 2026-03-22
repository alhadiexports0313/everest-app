export default function sitemap() {
  const baseUrl = "https://everestorganicshilajet.com";
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/products/premium-shilajet-resin",
    "/authenticity-quality",
    "/knowledge-hub",
    "/knowledge-hub/benefits",
    "/knowledge-hub/usage",
    "/knowledge-hub/environmental-respect",
    "/knowledge/understanding-shilajet",
    "/knowledge/usage-guide",
    "/knowledge/wellness-lifestyle",
    "/knowledge/nature-respect",
    "/benefits",
    "/usage",
    "/environmental-respect",
    "/contact",
  ];

  const now = new Date();
  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
