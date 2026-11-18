import type { CookieConsentConfig } from "vanilla-cookieconsent"

export const config: CookieConsentConfig = {
  cookie: {
    name: "mf_cookie_consent",
    expiresAfterDays: 365,
  },

  // block the page until the visitor has made a choice
  disablePageInteraction: true,

  guiOptions: {
    consentModal: {
      layout: "box",
      position: "middle center",
      equalWeightButtons: true,
    },
    preferencesModal: {
      layout: "box",
      equalWeightButtons: true,
    },
  },

  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {
      autoClear: {
        cookies: [{ name: /^_ga/ }, { name: "_gid" }],
        // scripts can't be unloaded: reload when consent is withdrawn
        reloadPage: true,
      },
    },
    newsletter: {
      autoClear: {
        cookies: [{ name: /^mailerlite_/ }],
        reloadPage: true,
      },
    },
  },

  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "We use cookies",
          description:
            "We use cookies to understand how our website is used and to show you our newsletter sign-up. These are only set if you agree. You can change your choice at any time via “Cookie settings” in the footer.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer: '<a href="/privacy-policy">Privacy Policy</a> · <a href="/imprint">Imprint</a>',
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          sections: [
            {
              description:
                'Choose which cookies you allow. You can change these settings at any time. More details in our <a href="/privacy-policy">Privacy Policy</a>.',
            },
            {
              title: "Strictly necessary",
              description:
                "Required for the website to work, for example to remember your cookie choice and your MobiFlight Club login. These can't be turned off.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics",
              description:
                "Google Analytics helps us understand how visitors use our website so we can improve it.",
              linkedCategory: "analytics",
            },
            {
              title: "Newsletter",
              description:
                "MailerLite shows our newsletter sign-up pop-up and remembers whether you've already seen or closed it.",
              linkedCategory: "newsletter",
            },
          ],
        },
      },

      de: {
        consentModal: {
          title: "Wir verwenden Cookies",
          description:
            "Wir verwenden Cookies, um zu verstehen, wie unsere Website genutzt wird, und um dir die Anmeldung zu unserem Newsletter anzuzeigen. Diese werden nur mit deiner Zustimmung gesetzt. Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          showPreferencesBtn: "Einstellungen verwalten",
          footer: '<a href="/privacy-policy">Datenschutzerklärung</a> · <a href="/imprint">Impressum</a>',
        },
        preferencesModal: {
          title: "Cookie-Einstellungen",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          savePreferencesBtn: "Auswahl speichern",
          closeIconLabel: "Schließen",
          sections: [
            {
              description:
                'Wähle aus, welche Cookies du erlaubst. Du kannst diese Einstellungen jederzeit ändern. Mehr dazu in unserer <a href="/privacy-policy">Datenschutzerklärung</a>.',
            },
            {
              title: "Unbedingt erforderlich",
              description:
                "Notwendig, damit die Website funktioniert, z. B. um deine Cookie-Auswahl und deinen MobiFlight-Club-Login zu speichern. Diese können nicht deaktiviert werden.",
              linkedCategory: "necessary",
            },
            {
              title: "Statistik",
              description:
                "Google Analytics hilft uns zu verstehen, wie Besucher unsere Website nutzen, damit wir sie verbessern können.",
              linkedCategory: "analytics",
            },
            {
              title: "Newsletter",
              description:
                "MailerLite zeigt das Pop-up zur Newsletter-Anmeldung an und merkt sich, ob du es bereits gesehen oder geschlossen hast.",
              linkedCategory: "newsletter",
            },
          ],
        },
      },

      es: {
        consentModal: {
          title: "Usamos cookies",
          description:
            "Usamos cookies para entender cómo se utiliza nuestro sitio web y para mostrarte la suscripción a nuestro boletín. Solo se activan si das tu consentimiento. Puedes cambiar tu elección en cualquier momento desde «Configuración de cookies» en el pie de página.",
          acceptAllBtn: "Aceptar todas",
          acceptNecessaryBtn: "Rechazar todas",
          showPreferencesBtn: "Gestionar preferencias",
          footer: '<a href="/privacy-policy">Política de privacidad</a> · <a href="/imprint">Aviso legal</a>',
        },
        preferencesModal: {
          title: "Preferencias de cookies",
          acceptAllBtn: "Aceptar todas",
          acceptNecessaryBtn: "Rechazar todas",
          savePreferencesBtn: "Guardar preferencias",
          closeIconLabel: "Cerrar",
          sections: [
            {
              description:
                'Elige qué cookies permites. Puedes cambiar esta configuración en cualquier momento. Más información en nuestra <a href="/privacy-policy">Política de privacidad</a>.',
            },
            {
              title: "Estrictamente necesarias",
              description:
                "Necesarias para que el sitio web funcione, por ejemplo para recordar tu elección de cookies y tu inicio de sesión en MobiFlight Club. No se pueden desactivar.",
              linkedCategory: "necessary",
            },
            {
              title: "Analítica",
              description:
                "Google Analytics nos ayuda a entender cómo usan los visitantes nuestro sitio web para poder mejorarlo.",
              linkedCategory: "analytics",
            },
            {
              title: "Boletín",
              description:
                "MailerLite muestra la ventana emergente de suscripción al boletín y recuerda si ya la has visto o cerrado.",
              linkedCategory: "newsletter",
            },
          ],
        },
      },
    },
  },
}
