import React from "react";
import { Query, QueryResult } from "react-apollo";
import { Flex } from "../common/flex";
import { Preloader } from "../common/preloader";
import { query } from "./contributing";
import { Doc } from "./doc";

export function DocPage(): JSX.Element {
  return (
    <>
      <div style={{ margin: "18px" }} />

      <Query
        query={query}
        variables={{
          id: "onefx"
        }}
      >
        {({
          data,
          error,
          loading
        }: QueryResult<{
          article: { title: string; contentHTML: string };
        }>) => {
          if (loading || error || !data) {
            return (
              <Flex width="100%" center={true}>
                <Preloader />
              </Flex>
            );
          }

          return (
            <>
              {/*
      // @ts-ignore */}
              <Doc
                contentHTML={data.article.contentHTML}
                title={data.article.title}
              />
            </>
          );
        }}
      </Query>
    </>
  );
}
