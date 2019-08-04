// @ts-ignore
// @ts-ignore
import window from "global";
// @ts-ignore
import loadScript from "load-script";
// @ts-ignore
import { t } from "onefx/lib/iso-i18n";
// @ts-ignore
import Helmet from "onefx/lib/react-helmet";
// @ts-ignore
import { styled } from "onefx/lib/styletron-react";
import React, { PureComponent } from "react";
import { Flex } from "../common/flex";
import { colors } from "../common/styles/style-color";
import { fullOnPalm, media } from "../common/styles/style-media";
import { ContentPadding } from "../common/styles/style-padding";

const DOC_STYLES = `
h2, h3, h4, h5 {
  padding: 52px 0 8px;
  margin: -52px 0 0 !important;
  -webkit-background-clip: content-box;
  background-clip: content-box;
}
h1 > a.markdownIt-Anchor > span, h2 > a.markdownIt-Anchor > span, h3 > a.markdownIt-Anchor > span, h4 > a.markdownIt-Anchor > span, h5 > a.markdownIt-Anchor > span {
  color: transparent;}

h1:hover > a.markdownIt-Anchor > span, h2:hover > a.markdownIt-Anchor > span, h3:hover > a.markdownIt-Anchor > span, h4:hover > a.markdownIt-Anchor > span, h5:hover > a.markdownIt-Anchor > span {
  color: #dfe3e6; }

h1:hover > a.markdownIt-Anchor:hover > span, h2:hover > a.markdownIt-Anchor:hover > span, h3:hover > a.markdownIt-Anchor:hover > span, h4:hover > a.markdownIt-Anchor:hover > span, h5:hover > a.markdownIt-Anchor:hover > span {
  color: ${colors.primary}; }

h1:focus > a.markdownIt-Anchor:focus > span, h2:focus > a.markdownIt-Anchor:focus > span, h3:focus > a.markdownIt-Anchor:focus > span, h4:focus > a.markdownIt-Anchor:focus > span, h5:focus > a.markdownIt-Anchor:focus > span {
  color: ${colors.primary}; }

h2:before {
  content: "\\A";
  width: 8px;
  height: 20px;
  background: ${colors.primary};
  display: inline-block;
  margin: 0 10px 0 0; }

p {   word-wrap: break-word; }

.top-bar-fixed-top {position: fixed !important;top: 52px;}

.markdownIt-Link-Anchor::before {
  content: "#";
}
`;

function ArticleHeader({
  title,
  enableToc
}: {
  title: string;
  enableToc?: boolean;
}): JSX.Element {
  return (
    <>
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
      {enableToc && (
        <Helmet>
          <style type="text/css">{DOC_STYLES}</style>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.css"
          />
        </Helmet>
      )}
    </>
  );
}

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
  enableToc?: boolean;
};

export class Doc extends PureComponent<PropType> {
  public static defaultProps: { enableToc: boolean } = {
    enableToc: true
  };

  public componentDidMount(): void {
    if (!this.props.enableToc) {
      return;
    }

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.min.js",
      () => {
        window.tocbot.init({
          // Where to render the table of contents.
          tocSelector: ".js-toc",
          // Where to grab the headings to build the table of contents.
          contentSelector: "article",
          // Which headings to grab inside of the contentSelector element.
          headingSelector: "h1, h2, h3",
          collapseDepth: 2
        });
      }
    );
  }

  public render(): JSX.Element {
    const {
      title,
      date,
      contentHTML,
      visitorCount,
      hasDrawIo,
      updateDate,
      references,
      enableToc
    } = this.props;
    if (window) {
      window.hasDrawIo = hasDrawIo;
    }

    const articleColWidth = enableToc ? "68%" : "auto";

    return (
      <div style={{ width: "100%" }}>
        <ArticleHeader title={title} enableToc={enableToc} />

        <ContentPadding>
          <Flex center={true}>
            <Flex
              width={articleColWidth}
              alignContent="flex-end!important"
              media={fullOnPalm}
              column={true}
            >
              <Article2>
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
              </Article2>
            </Flex>

            {enableToc && (
              <Flex width="32%" media={{ [media.palm]: { display: "none" } }}>
                <nav
                  style={{ maxWidth: "300px", padding: "8px" }}
                  className="toc toc-right js-toc relative z-1 transition--300 absolute pa4 top-bar-fixed-top"
                >
                  <div className="js-toc" />
                </nav>
              </Flex>
            )}
          </Flex>
        </ContentPadding>
      </div>
    );
  }
}

export const Article2 = styled("article", {
  maxWidth: "680px",
  width: "100%",
  color: "#404040!important"
});
