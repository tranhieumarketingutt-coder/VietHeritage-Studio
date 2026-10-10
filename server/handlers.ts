import {
  getGeminiStatus,
  handleGeminiChat,
  handleGeminiStyling,
  handleGeminiVirtualTryOn,
  type StylingInput,
  type TryOnInput,
} from "./geminiService.ts";

export interface HandlerResult {
  statusCode: number;
  data: unknown;
}

/**
 * In-memory sliding window rate limiter tracking request frequencies per client.
 */
export class RateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly timestampsMap: Map<string, number[]>;

  constructor(maxRequests: number = 60, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.timestampsMap = new Map();
  }

  /**
   * Checks whether a request for a specific client identifier is permitted within the sliding window.
   */
  public isAllowed(identifier: string = "global"): boolean {
    const now = Date.now();
    const timestamps = this.timestampsMap.get(identifier) || [];
    const validTimestamps = timestamps.filter((timestamp) => now - timestamp < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      this.timestampsMap.set(identifier, validTimestamps);
      return false;
    }

    validTimestamps.push(now);
    this.timestampsMap.set(identifier, validTimestamps);

    if (this.timestampsMap.size > 5000) {
      for (const [key, list] of this.timestampsMap.entries()) {
        const active = list.filter((t) => now - t < this.windowMs);
        if (active.length === 0) {
          this.timestampsMap.delete(key);
        } else {
          this.timestampsMap.set(key, active);
        }
      }
    }

    return true;
  }

  /**
   * Clears all tracked rate limit records.
   */
  public reset(): void {
    this.timestampsMap.clear();
  }
}

/**
 * Shared in-memory rate limiter instance for API operations.
 */
export const rateLimiter = new RateLimiter(60, 60000);

/**
 * Alias of the shared rate limiter instance.
 */
export const apiRateLimiter = rateLimiter;

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
export async function executeChatHandler(
  payload: unknown,
  identifier: string = "global"
): Promise<HandlerResult> {
  if (!rateLimiter.isAllowed(identifier)) {
    return {
      statusCode: 429,
      data: { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau giây lát." },
    };
  }

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
export async function executeStylingHandler(
  payload: unknown,
  identifier: string = "global"
): Promise<HandlerResult> {
  if (!rateLimiter.isAllowed(identifier)) {
    return {
      statusCode: 429,
      data: { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau giây lát." },
    };
  }

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
export async function executeTryOnHandler(
  payload: unknown,
  identifier: string = "global"
): Promise<HandlerResult> {
  if (!rateLimiter.isAllowed(identifier)) {
    return {
      statusCode: 429,
      data: { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau giây lát." },
    };
  }

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
