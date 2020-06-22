import Button from "antd/lib/button";
import Col from "antd/lib/grid/col";
import Row from "antd/lib/grid/row";
import Layout from "antd/lib/layout";
// @ts-ignore
import { assetURL } from "onefx/lib/asset-url";
// @ts-ignore
import { t } from "onefx/lib/iso-i18n";
// @ts-ignore
import { styled } from "onefx/lib/styletron-react";
import React from "react";
import { PureComponent } from "react";
import { withRouter } from "onefx/lib/react-router";
import { CommonMargin } from "../common/common-margin";
import { Flex } from "../common/flex";
import { colors } from "../common/styles/style-color";
import { ContentPadding } from "../common/styles/style-padding";

// @ts-ignore
@withRouter
class Home extends PureComponent {
  public render(): JSX.Element {
    // @ts-ignore
    const { history } = this.props;
    return (
      <Layout tagName={"main"}>
        <Layout.Content
          tagName={"main"}
          style={{ backgroundColor: colors.nav01 }}
        >
          <ContentPadding>
            <Row style={{ margin: "80px 0" }}>
              <Col md={12} xs={24}>
                <HeroH1>{t("home.title")}</HeroH1>
                <HeroP>{t("home.desc")}</HeroP>
                <Flex justifyContent="flex-start!important">
                  <Button
                    type="primary"
                    size="large"
                    href="/doc.html"
                    onClick={e => {
                      e.preventDefault();
                      history.push("/doc.html");
                    }}
                  >
                    {t("home.get_started")}
                  </Button>

                  <CommonMargin />

                  <Button
                    size="large"
                    target="_blank"
                    href="https://github.com/puncsky/web-onefx-boilerplate"
                  >
                    Fork me on Github
                  </Button>
                </Flex>
              </Col>
              <Col md={12} xs={24}>
                <Flex center={true} width="100%">
                  <Img
                    src={assetURL("building-website.svg")}
                    alt="building apps with OneFx"
                  />
                </Flex>
              </Col>
            </Row>
          </ContentPadding>
        </Layout.Content>

        <Layout.Content tagName={"main"}>
          <ContentPadding>
            <Row style={{ margin: "80px 0" }}>
              <Col md={12} xs={24}>
                <Flex center={true} width="100%">
                  <Img
                    src={assetURL("startup.svg")}
                    alt="building apps with OneFx"
                  />
                </Flex>
              </Col>

              <Col md={12} xs={24}>
                <H2>{t("home.section1.title")}</H2>
                <P
                  dangerouslySetInnerHTML={{ __html: t("home.section1.desc") }}
                />
              </Col>
            </Row>
          </ContentPadding>
        </Layout.Content>

        <UsedBy />
      </Layout>
    );
  }
}

function UsedBy(): JSX.Element {
  return (
    <Layout.Content tagName={"main"} style={{ backgroundColor: colors.white }}>
      <ContentPadding>
        <Row style={{ margin: "80px 0" }}>
          <Col>
            <TextCenter>
              <H2>{t("home.who_s_using?")}</H2>
              <P>{t("home.we_are_building")}</P>
              <Row
                type="flex"
                gutter={16}
                justify="space-around"
                align="middle"
              >
                <Col span={8}>
                  <a
                    href="https://cocusocial.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Img2 src="/cocusocial.png" />
                    <P>
                      CocuSocial: Discover a different cooking class experience
                    </P>
                  </a>
                </Col>
                <Col span={8}>
                  <a
                    href="https://member.iotex.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Img2 src="/iotex.svg" />
                    <P>IoTeX Member Portal</P>
                  </a>
                </Col>
                <Col span={8}>
                  <a
                    href="https://tianpan.co/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Img2 src="/tianpanco.svg" />
                    <P>TianPan.co: Startup Engineering</P>
                  </a>
                </Col>
              </Row>
            </TextCenter>
          </Col>
        </Row>
      </ContentPadding>
    </Layout.Content>
  );
}

export { Home };

const Img = styled("img", {
  width: "100%",
  maxHeight: "450px"
});

const Img2 = styled("img", {
  width: "100%",
  maxHeight: "120px"
});

const TextCenter = styled("div", {
  textAlign: "center"
});

const HeroH1 = styled("h1", {
  color: colors.white,
  fontSize: "48px",
  margin: 0
});

const HeroP = styled("p", {
  color: colors.white,
  fontSize: "18px",
  margin: "36px 0"
});

const H2 = styled("h2", {
  fontSize: "34px"
});

const P = styled("div", {
  fontSize: "18px",
  margin: "8px 0"
});
