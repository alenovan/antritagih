import { revalidatePath } from "next/cache";
import { locales } from "@/config";

/**
 * Revalidate path for all supported locales
 * @param path - The path to revalidate (without locale prefix)
 * @param type - The revalidation type (optional)
 */
export function revalidateLocalizedPath(
  path: string,
  type?: "layout" | "page"
): void {
  locales.forEach((locale) => {
    const localizedPath = `/${locale}${
      path.startsWith("/") ? path : `/${path}`
    }`;
    revalidatePath(localizedPath, type);
  });

  revalidatePath(path, type);
}

/**
 * Revalidate multiple paths for all locales
 * @param paths - Array of paths to revalidate
 * @param type - The revalidation type (optional)
 */
export function revalidateMultipleLocalizedPaths(
  paths: string[],
  type?: "layout" | "page"
): void {
  paths.forEach((path) => revalidateLocalizedPath(path, type));
}
