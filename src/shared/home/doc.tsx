// @ts-ignore
// @ts-ignore
import window from "global";
// @ts-ignore
import { t } from "onefx/lib/iso-i18n";
// @ts-ignore
import Helmet from "onefx/lib/react-helmet";
// @ts-ignore
import { styled } from "onefx/lib/styletron-react";
import React from "react";
import { Flex } from "../common/flex";
import { ContentPadding } from "../common/styles/style-padding";

type PropType = {
  layout: string;
  title: string;
  date: string;
  comments: number;
  categories: string;
  contentHTML: string;
  allowDonate: boolean;
  visitorCount?: number;
  hasDrawIo?: boolean;
  updateDate?: string;
  references?: Array<string>;
};

export function Doc({
  title,
  date,
  contentHTML,
  visitorCount,
  hasDrawIo,
  updateDate,
  references
}: PropType): JSX.Element {
  if (window) {
    window.hasDrawIo = hasDrawIo;
  }
  return (
    <div style={{ width: "100%" }}>
      <ContentPadding>
        <Helmet
          title={`${title} - ${t("meta.title")}`}
          meta={[
            { property: "og:title", content: `${title} - ${t("meta.title")}` }
          ]}
          link={[
            {
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css",
              rel: "stylesheet"
            }
          ]}
        />

        <Flex width="100%" center={true} column={true}>
          <Article>
            <h1>{title}</h1>
            {visitorCount !== undefined && (
              <div className="fas fa-eye">{visitorCount}</div>
            )}{" "}
            {date && (
              <div className="far fa-calendar-alt">
                {date}
                {updateDate && ` (${t("last_updated", { updateDate })})`}
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
            {references && Array.isArray(references) && (
              <div>
                <h2>{t("original-post")}</h2>
                <ul>
                  {references.map((r, i) => (
                    <li key={i}>
                      <a
                        href={r}
                        target="_blank"
                        rel="noopener nofollower noreferrer"
                      >
                        {r}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Article>
        </Flex>
      </ContentPadding>
    </div>
  );
}

export const Article = styled("article", {
  maxWidth: "680px",
  width: "100%",
  color: "#404040!important"
});
