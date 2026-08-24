type FieldError = {
  message: string;
  longMessage?: string;
} | null | undefined;

type ClerkHookErrors = {
  fields: Record<string, FieldError>;
  global: { message: string; longMessage?: string }[] | null;
};

export function clerkFieldMessage(
  errors: { fields: object },
  field: string,
): string | undefined {
  const value = (errors.fields as Record<string, FieldError>)[field];
  return value?.longMessage ?? value?.message;
}

export function clerkFormMessage(errors: { global: ClerkHookErrors["global"] }): string | undefined {
  const firstGlobal = errors.global?.[0];
  return firstGlobal?.longMessage ?? firstGlobal?.message;
}

export function clerkErrorMessage(
  error: { longMessage?: string | null; message?: string | null } | null | undefined,
): string | undefined {
  return error?.longMessage ?? error?.message ?? undefined;
}
