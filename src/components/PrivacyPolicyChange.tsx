import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { userAPI, coreReduxActions } from "@influenzanet/case-web-app-core";
import { RootState } from "@influenzanet/case-web-app-core/build/store/rootReducer";
import { Profile } from "@influenzanet/case-web-app-core/build/api/types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MarkdownLoader } from "@influenzanet/case-web-ui";
import { useTranslation } from "react-i18next";
import clsx from 'clsx';

const YES_VALUE = "yes";
const NO_VALUE = "no";

const selectMainProfile = createSelector(
  [(state: RootState) => state.user.currentUser.profiles],
  (profilesState) => {
    const mainProfile = profilesState.find(
      (profile) => profile.mainProfile === true
    );

    return mainProfile ? mainProfile : undefined;
  }
);

const PrivacyPolicyChange: React.FC = () => {
  const dispatch = useDispatch();

  const { i18n, t } = useTranslation(["privacy-policy-change"]);

  const mainProfile = useSelector(selectMainProfile);

  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(
    !(mainProfile as any).acceptedPolicyChange
  );

  const setAcceptedPolicyChangeAsync = useCallback(
    async (acceptedPolicyChange: string) => {
      const user = await userAPI.saveProfileReq({
        ...mainProfile,
        acceptedPolicyChange: acceptedPolicyChange,
      } as Profile);

      // await renewToken();

      // const user = (await userAPI.getUserReq()).data;

      dispatch(coreReduxActions.userActions.setUser(user.data));

      setIsAccordionOpen(false);
    },
    [mainProfile, dispatch]
  );

  const accepted = (mainProfile as any).acceptedPolicyChange === YES_VALUE;

  return (
    <React.Fragment>
      <div className={clsx("card", "border-primary", "mb-3", accepted && !isAccordionOpen && "bg-success-light", !accepted && !isAccordionOpen && "bg-warning-light")}>
        <div
          className={clsx("card-header", "d-flex", "justify-content-between", "align-items-center", isAccordionOpen && "border-primary") }
          id="heading"
        >
          {isAccordionOpen && (
            <h5 className="mb-0">
              <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="me-1" />{" "}
              {t("privacyPolicyUpdates")}
            </h5>
          )}
          {!isAccordionOpen && (
            <React.Fragment>
              <h5 className="mb-0">
                {t("privacyPolicyUpdates")}:{" "}
                <strong>{accepted
                  ? t("accepted")
                  : t("notAccepted")}</strong>
              </h5>
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={() => setIsAccordionOpen(true)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </React.Fragment>
          )}
        </div>
        {isAccordionOpen && (
          <div className="card-body">
            <MarkdownLoader
              markdownUrl={`/locales/${i18n.language}/markdowns/policy-change-panel.md`}
            ></MarkdownLoader>
            <div className="d-flex flex-wrap">
              <button
                type="button"
                className="mt-2 me-2 btn btn-primary"
                onClick={() => setAcceptedPolicyChangeAsync(YES_VALUE)}
              >
                {t("yes")}
              </button>
              <button
                type="button"
                className="mt-2 me-2 btn btn-outline-primary"
                onClick={() => setAcceptedPolicyChangeAsync(NO_VALUE)}
              >
                {t("no")}
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PrivacyPolicyChange;
