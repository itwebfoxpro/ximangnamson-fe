const fs = require("fs");
const path = require("path");

const files = ["src/data/products.ts", "src/data/posts.ts"];
const targetSlug = "xi-mang-binh-duong"; // 👈 slug cần cập nhật
const now = new Date().toISOString();

files.forEach((relativePath) => {
  const filePath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(filePath)) {
    console.log("❌ Không tìm thấy:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Regex tìm object có slug tương ứng
  const regex = new RegExp(
    `(\\{[\\s\\S]*?slug:\\s*["']${targetSlug}["'][\\s\\S]*?\\})`,
    "g"
  );

  const match = content.match(regex);
  if (!match) {
    console.log(`⚠️ Không tìm thấy bài có slug: ${targetSlug}`);
    return;
  }

  const updatedBlock = match[0].replace(
    /updatedAt:\s*["'][^"']*["']/,
    `updatedAt: "${now}"`
  );

  content = content.replace(match[0], updatedBlock);

  fs.writeFileSync(filePath, content);
  console.log(`✅ Đã cập nhật updatedAt cho bài: ${targetSlug}`);
});

console.log("🎉 Hoàn tất!");
