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
import { Flex } from "../common/flex";
import { colors } from "../common/styles/style-color";
import { ContentPadding } from "../common/styles/style-padding";

export class Home extends PureComponent {
  public render(): JSX.Element {
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
                <Button
                  type="primary"
                  size="large"
                  href="https://github.com/puncsky/web-onefx-boilerplate"
                >
                  {t("home.get_started")}
                </Button>
              </Col>
              <Col md={12} xs={24}>
                <Flex center={true} width="100%">
                  <Img
                    src={assetURL("/building-website.svg")}
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
                    src={assetURL("/startup.svg")}
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
      </Layout>
    );
  }
}

const Img = styled("img", {
  width: "100%",
  maxHeight: "450px"
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
  fontSize: "18px"
});
