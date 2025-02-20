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

export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  duration: z.number().min(10, {
    message: "Duration must be at least 10 minutes",
  }),
  url: z
    .string()
    .min(3, { message: "URL must be at least 3 characters" })
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "URL can only contain letters, numbers, and -",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(500),
  videoCallSoftware: z
    .string()
    .min(1, { message: "Please select a valid video call software" }),
});
