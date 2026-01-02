// resizeimg.js
// Resize toàn bộ ảnh trong thư mục thành 304x356 (AVIF)

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ===== CẤU HÌNH =====
const INPUT_DIR = "./download"; // Thư mục ảnh gốc
const OUTPUT_DIR = "./public-avif"; // Thư mục xuất ảnh
const WIDTH = 304;
const HEIGHT = 356;
const QUALITY = 70;

// =====================

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function resizeImages(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir);

  files.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(
      outputDir,
      file.replace(path.extname(file), ".avif")
    );

    if (fs.statSync(inputPath).isDirectory()) {
      const newDir = path.join(outputDir, file);
      if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);
      resizeImages(inputPath, newDir);
      return;
    }

    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

    sharp(inputPath)
      .resize(WIDTH, HEIGHT, {
        fit: "cover",
        position: "center",
      })
      .avif({ quality: QUALITY })
      .toFile(outputPath)
      .then(() => console.log("✔ Resized:", outputPath))
      .catch((err) => console.error("❌ Error:", err));
  });
}

resizeImages(INPUT_DIR, OUTPUT_DIR);
