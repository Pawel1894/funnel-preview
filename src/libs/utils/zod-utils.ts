import { z } from "zod";

type FormatZodErrorsOptions = {
  prefix?: string;
  formatter?: (err: z.ZodIssue, path?: string) => string;
  includePath?: boolean;
};

const defaultFormatter = (err: z.ZodIssue, path?: string) => {
  return path ? `Field "${path}": ${err.message}` : err.message;
};

export function formatZodErrors(error: z.ZodError, options: FormatZodErrorsOptions = {}): string[] {
  const { prefix = "", formatter = defaultFormatter, includePath = true } = options;

  const formattedErrors = error.errors.map((err) => {
    const path = includePath ? err.path.join(" -> ") : undefined;
    const formattedMessage = formatter(err, path);
    return prefix ? `${prefix}${formattedMessage}` : formattedMessage;
  });

  return formattedErrors;
}
