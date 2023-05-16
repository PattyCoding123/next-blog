import { z } from "zod";

export const fileTreeSchema = z.object({
  tree: z.array(z.object({ path: z.string() })),
});

export type FileTree = z.infer<typeof fileTreeSchema>;
