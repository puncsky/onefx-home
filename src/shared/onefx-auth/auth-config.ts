// @ts-ignore
import { logger } from "onefx/lib/integrated-gateways/logger";

let secret = process.env.AUTH_SECRET;
if (!secret) {
  logger.warn("no AUTH_SECRET in process.env");
  secret = "TODO this is not a secret";
}

export type AuthConfig = {
  cookieName: string;
  cookieOpts: {
    domain: string;
    secure: boolean;
    httpOnly: boolean;
    signed: boolean;
    expires?: Date; // dynamically generated by ttl
  };
  ttl: number; // days
  loginUrl: string;
  allowedLoginNext: Array<string>;
  allowedLogoutNext: Array<string>;
  secret: string;
  emailTokenTtl: number; // mins
  emailTokenLink: string;
  mailgun: {
    apiKey: string;
    domain: string;
    retryLimit: number;
  };
  emailTokenNext: string;
};

export const authConfig = {
  cookieName: "auth",
  cookieOpts: {
    domain:
      String(process.env.NODE_ENV).indexOf("production") === -1
        ? "localhost"
        : "example.com",
    secure: false,
    httpOnly: true,
    signed: false
  },
  ttl: 90, // days
  loginUrl: "/login",
  allowedLoginNext: ["/", "/settings/reset-password/"],
  allowedLogoutNext: ["/"],
  secret,
  emailTokenTtl: 5, // mins
  emailTokenLink:
    String(process.env.NODE_ENV).indexOf("production") === -1
      ? "http://localhost:4009/email-token/"
      : "https://example.com/email-token/",
  mailgun: {
    apiKey: "TODO",
    domain: "mail.example.com",
    retryLimit: 2
  },
  emailTokenNext: "/settings/reset-password/"
};

export function allowedLoginNext(next: string): string {
  if (
    authConfig.allowedLoginNext.find(prefix => String(next).startsWith(prefix))
  ) {
    return next;
  }
  return authConfig.allowedLoginNext[0];
}

export function allowedLogoutNext(next: string): string {
  if (
    authConfig.allowedLogoutNext.find(prefix => String(next).startsWith(prefix))
  ) {
    return next;
  }
  return authConfig.allowedLogoutNext[0];
}
