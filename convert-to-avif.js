// convert-to-avif.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = "./download"; // thư mục ảnh gốc
const outputDir = "./public-avif"; // thư mục mới

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const validExt = [".jpg", ".jpeg", ".png", ".webp", ".svg"];

function convertFolder(dir, outDir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const outPath = path.join(outDir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);
      convertFolder(fullPath, outPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (validExt.includes(ext)) {
        const outputFile = outPath.replace(ext, ".avif");

        sharp(fullPath)
          .avif({ quality: 80 })
          .toFile(outputFile)
          .then(() => console.log("✔", outputFile))
          .catch(console.error);
      }
    }
  });
}

convertFolder(inputDir, outputDir);
