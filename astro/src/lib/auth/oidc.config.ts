// src/lib/auth/oidc.config.ts
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

let authInstance: UserManager | null = null;

export function getAuth() {
  if (typeof window === "undefined") {
    throw new Error("OIDC can only be used in the browser.");
  }

  if (authInstance) {
    return authInstance;
  }

  authInstance = new UserManager({
    authority: "https://mobiflightids.ciamlogin.com/7af08b0b-58c9-4b14-a50b-a2fe8fa7bcb3/v2.0",
    client_id: "f63fa3f7-2c98-466e-b8e5-840ace8854a9",
    redirect_uri: `${window.location.origin}/auth/callback/login`,
    post_logout_redirect_uri: `${window.location.origin}/auth/callback/logout`,
    response_type: "code",
    scope: "openid profile email",
    automaticSilentRenew: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  });

  return authInstance;
}