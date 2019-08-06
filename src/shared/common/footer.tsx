import { assetURL } from "onefx/lib/asset-url";
import { t } from "onefx/lib/iso-i18n";
import { styled } from "onefx/lib/styletron-react";
import React from "react";
import { Flex } from "./flex";
import { colors } from "./styles/style-color";
import { contentPadding } from "./styles/style-padding";
import { TOP_BAR_HEIGHT } from "./top-bar";

export const FOOTER_HEIGHT = 89;

export const FOOTER_ABOVE = {
  minHeight: `calc(100vh - ${FOOTER_HEIGHT + TOP_BAR_HEIGHT}px)`
};

export function Footer(): JSX.Element {
  return (
    <Align>
      <Flex>{`Copyright © ${new Date().getFullYear()}`}</Flex>
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: t("footer.built_with_love") }}
        />{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://onefx.js.org"
        >
          <img
            alt="built with onefx"
            style={{ height: "20px" }}
            src={assetURL("/built-with-onefx.svg")}
          />
        </a>
      </div>
    </Align>
  );
}

const Align = styled("div", (_: React.CSSProperties) => ({
  ...contentPadding,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "32px",
  paddingBottom: "32px",
  height: `${FOOTER_HEIGHT}px`,
  backgroundColor: colors.nav02,
  color: colors.white
}));
