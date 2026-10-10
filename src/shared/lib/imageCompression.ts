export interface CompressedImageResult {
  dataUrl: string;
  base64: string;
  mimeType: string;
}

/**
 * Compresses an image file on the client using an HTMLCanvasElement.
 *
 * @param file The original image file to compress.
 * @param maxDimension The maximum allowed width or height in pixels. Defaults to 1024.
 * @param quality The JPEG compression quality between 0 and 1. Defaults to 0.82.
 * @returns A promise resolving to an object containing the compressed dataUrl, base64 payload, and mimeType.
 */
export async function compressImage(
  file: File,
  maxDimension: number = 1024,
  quality: number = 0.82
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width >= height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Không thể khởi tạo Canvas 2D context để xử lý hình ảnh."));
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mimeType = "image/jpeg";
      const dataUrl = canvas.toDataURL(mimeType, quality);
      const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;

      resolve({
        dataUrl,
        base64,
        mimeType,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Không thể tải tập tin hình ảnh."));
    };

    img.src = objectUrl;
  });
}
