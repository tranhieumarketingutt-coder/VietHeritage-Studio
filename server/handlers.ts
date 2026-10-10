import {
  getGeminiStatus,
  handleGeminiChat,
  handleGeminiStyling,
  handleGeminiVirtualTryOn,
  type StylingInput,
  type TryOnInput,
} from "./geminiService";

export interface HandlerResult {
  statusCode: number;
  data: unknown;
}

/**
 * Executes health check and capability status inquiry.
 */
export async function executeStatusHandler(): Promise<HandlerResult> {
  const status = getGeminiStatus();
  return {
    statusCode: 200,
    data: status,
  };
}

/**
 * Validates and executes conversational consultation requests.
 */
export async function executeChatHandler(payload: unknown): Promise<HandlerResult> {
  if (!payload || typeof payload !== "object") {
    return {
      statusCode: 400,
      data: { error: "Yêu cầu không hợp lệ: Thiếu phần thân dữ liệu." },
    };
  }

  const record = payload as Record<string, unknown>;
  const rawMessage = record.message;

  if (typeof rawMessage !== "string" || !rawMessage.trim()) {
    return {
      statusCode: 400,
      data: { error: "Yêu cầu không hợp lệ: Trường 'message' phải là chuỗi văn bản không rỗng." },
    };
  }

  const message = rawMessage.trim().slice(0, 4000);
  const lang = record.lang === "en" ? "en" : "vi";

  try {
    const result = await handleGeminiChat(message, lang);
    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    console.error("Execute Chat Handler Error:", error);
    return {
      statusCode: 500,
      data: { error: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu trò chuyện." },
    };
  }
}

/**
 * Validates and executes styling evaluation requests.
 */
export async function executeStylingHandler(payload: unknown): Promise<HandlerResult> {
  if (!payload || typeof payload !== "object") {
    return {
      statusCode: 400,
      data: { error: "Yêu cầu không hợp lệ: Thiếu phần thân dữ liệu." },
    };
  }

  const record = payload as Record<string, unknown>;
  const costumeName = typeof record.costumeName === "string" ? record.costumeName.slice(0, 100) : "Áo Ngũ Thân";
  const season = typeof record.season === "string" ? record.season.slice(0, 100) : "Mùa Thu";
  const undertone = typeof record.undertone === "string" ? record.undertone.slice(0, 50) : "warm";
  const destination = typeof record.destination === "string" ? record.destination.slice(0, 100) : "Hoàng Thành Thăng Long";
  const weather = typeof record.weather === "string" ? record.weather.slice(0, 100) : "Mát mẻ";
  const colorHex = typeof record.colorHex === "string" ? record.colorHex.slice(0, 20) : "#8B0000";
  const bodyShape = typeof record.bodyShape === "string" ? record.bodyShape.slice(0, 50) : "Cân đối";

  const stylingInput: StylingInput = {
    costumeName,
    season,
    undertone,
    destination,
    weather,
    colorHex,
    bodyShape,
  };

  try {
    const result = await handleGeminiStyling(stylingInput);
    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    console.error("Execute Styling Handler Error:", error);
    return {
      statusCode: 500,
      data: { error: "Đã xảy ra lỗi trong quá trình xử lý tư vấn phối đồ." },
    };
  }
}

/**
 * Validates and executes virtual try-on generation requests.
 */
export async function executeTryOnHandler(payload: unknown): Promise<HandlerResult> {
  if (!payload || typeof payload !== "object") {
    return {
      statusCode: 400,
      data: { error: "Yêu cầu không hợp lệ: Thiếu phần thân dữ liệu." },
    };
  }

  const record = payload as Record<string, unknown>;
  const costumeId = typeof record.costumeId === "string" && record.costumeId.trim() ? record.costumeId.trim() : "ngu-than";

  let userPhotoBase64: string | undefined;
  if (typeof record.userPhotoBase64 === "string" && record.userPhotoBase64.length > 0) {
    if (record.userPhotoBase64.length > 15 * 1024 * 1024) {
      return {
        statusCode: 413,
        data: { error: "Kích thước ảnh vượt quá giới hạn tối đa cho phép (10MB)." },
      };
    }
    userPhotoBase64 = record.userPhotoBase64;
  }

  const userPhotoMimeType = typeof record.userPhotoMimeType === "string" ? record.userPhotoMimeType : undefined;
  const costumeName = typeof record.costumeName === "string" ? record.costumeName.slice(0, 100) : undefined;
  const colorHex = typeof record.colorHex === "string" ? record.colorHex.slice(0, 20) : undefined;
  const colorName = typeof record.colorName === "string" ? record.colorName.slice(0, 50) : undefined;
  const destinationId = typeof record.destinationId === "string" ? record.destinationId.slice(0, 50) : undefined;
  const gender = typeof record.gender === "string" ? record.gender.slice(0, 20) : undefined;

  const tryOnInput: TryOnInput = {
    costumeId,
    userPhotoBase64,
    userPhotoMimeType,
    costumeName,
    colorHex,
    colorName,
    destinationId,
    gender,
  };

  try {
    const result = await handleGeminiVirtualTryOn(tryOnInput);
    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    console.error("Execute Try-On Handler Error:", error);
    return {
      statusCode: 500,
      data: { error: "Đã xảy ra lỗi trong quá trình thực hiện thử đồ trực tuyến." },
    };
  }
}
