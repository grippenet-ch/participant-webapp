import React, { useEffect } from "react";
import { AppCore } from "@influenzanet/case-web-app-core";
import { useTranslation } from "react-i18next";

import { AppConfig } from '@influenzanet/case-web-app-core/build/types/appConfig';
import { FooterConfig } from '@influenzanet/case-web-app-core/build/types/footerConfig';
import { HeaderConfig } from '@influenzanet/case-web-app-core/build/types/headerConfig';
import { NavbarConfig } from '@influenzanet/case-web-app-core/build/types/navbarConfig';
import { PagesConfig } from '@influenzanet/case-web-app-core/build/types/pagesConfig';
import { Extension } from "@influenzanet/case-web-app-core/build/AppCore";

import * as appConfig from "./configs/appConfig.json";
import * as footerConfig from "./configs/footer.json";
import * as headerConfig from "./configs/header.json";
import * as navbarConfig from "./configs/navbar.json";
import * as pagesConfig from "./configs/pages.json";

import PrivacyPolicyChange from "./components/PrivacyPolicyChange";

import { fr, de, it } from 'date-fns/locale';

const App: React.FC = () => {

  const { i18n } = useTranslation();

  const dateLocales = [
    { code: "fr", locale: fr, format: "dd.MM.yyyy" },
    { code: "de", locale: de, format: "dd.MM.yyyy" },
    { code: "it", locale: it, format: "dd/MM/yyyy" },
  ];

const privacyPolicyChangeExtensions: Extension = {
    name: "privacy-policy-change",
    component: PrivacyPolicyChange
  };
  const extensions = [privacyPolicyChangeExtensions];

  useEffect(() => {
    if (!i18n.language) {
      i18n.changeLanguage(`${process.env.REACT_APP_DEFAULT_LANGUAGE}`);
    }
  }, [i18n, i18n.language]);

  return (
    <React.Fragment>
      <AppCore
        appConfig={appConfig as AppConfig}
        headerConfig={headerConfig as HeaderConfig}
        navbarConfig={navbarConfig as NavbarConfig}
        pagesConfig={pagesConfig as PagesConfig}
        footerConfig={footerConfig as FooterConfig}
        dateLocales={dateLocales}
        extensions={extensions}
      />
    </React.Fragment>
  );
};

export default App;
