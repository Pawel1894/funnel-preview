import { formatZodErrors } from "@/libs/utils";
import { Funnel, FunnelSchema } from "../domain/funnel";

export type FunnelParseResult =
  | {
      success: true;
      data: Funnel;
    }
  | {
      success: false;
      error: {
        message: string;
        issues: string[];
      };
    };

export function parseFunnelJson(jsonString: string): FunnelParseResult {
  try {
    const json = JSON.parse(jsonString);
    const result = FunnelSchema.safeParse(json);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    const issues = formatZodErrors(result.error, {
      prefix: "Validation error: ",
    });

    return {
      success: false,
      error: {
        message: "Invalid funnel format",
        issues,
      },
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: {
          message: "Invalid JSON format",
          issues: [error.message],
        },
      };
    }

    throw error;
  }
}
