// App entry point (owned by this repo, never touched by copier update).
// Shared boot logic: @influenzanet/participant-webapp-kit renderParticipantApp().
import { renderParticipantApp } from "@influenzanet/participant-webapp-kit";
import { fr, de, it } from "date-fns/locale";

import "./index.scss";

import * as appConfig from "./configs/appConfig.json";
import * as footerConfig from "./configs/footer.json";
import * as headerConfig from "./configs/header.json";
import * as navbarConfig from "./configs/navbar.json";
import * as pagesConfig from "./configs/pages.json";

renderParticipantApp({
  appConfig,
  footerConfig,
  headerConfig,
  navbarConfig,
  pagesConfig,
  dateLocales: [
    { code: "fr", locale: fr, format: "dd.MM.yyyy" },
    { code: "de", locale: de, format: "dd.MM.yyyy" },
    { code: "it", locale: it, format: "dd/MM/yyyy" },
  ],
  // country-only extensions: [{ name: "myWidget", component: MyWidget }]
  // (kit extensions iframeEmbed and blogPosts are registered by default)
  extensions: [],
});
