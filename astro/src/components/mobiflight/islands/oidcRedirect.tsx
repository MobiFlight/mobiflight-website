import { useEffect, useState } from "react";
import { getAuth } from "@/lib/auth/oidc.config";
type CallbackState = {
  returnTo?: string;
  itemId?: string;
};

export default function OidcRedirect() {
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    (async () => {
      try {
        const auth = getAuth();
        const user = await auth.signinCallback();

        const state = (user?.state ?? {}) as CallbackState;
        const returnTo =
          typeof state.returnTo === "string" && state.returnTo.length > 0
            ? state.returnTo
            : "/roadmap";

        const itemId =
          typeof state.itemId === "string" && state.itemId.length > 0
            ? state.itemId
            : null;

        const next = new URL(returnTo, window.location.origin);
        if (itemId) next.searchParams.set("voteItem", itemId);

        window.location.replace(next.toString());
      } catch (error) {
        console.error("OIDC callback failed:", error);
        setMessage("Login failed. Redirecting…");
        window.location.replace("/roadmap?auth=error");
      }
    })();
  }, []);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <p>{message}</p>
    </main>
  );
}