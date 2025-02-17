import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const onboardingSchemas = z.object({
  fullName: z.string().min(3).max(150),
  userName: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contain letters, numbers, and -",
    }),
});

export function onboardingSchemasValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    fullName: z.string().min(3).max(150),
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can only contain letters, numbers, and -",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already taken",
              });
            }
          });
        })
      ),
  });
}

// export const profileSchemas = z.object({
//   fullName: z.string().min(3).max(150),
//   userName: z
//     .string()
//     .min(3)
//     .max(150)
//     .regex(/^[a-zA-Z0-9-]+$/, {
//       message: "Username can only contain letters, numbers, and -",
//     }),
//   profileImage: z.string(),
// });

export function profileSchemas(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    fullName: z.string().min(3).max(150),
    profileImage: z.string(),
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can only contain letters, numbers, and -",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already taken",
              });
            }
          });
        })
      ),
  });
}
