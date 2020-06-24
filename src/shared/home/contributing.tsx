import gql from "graphql-tag";
import React from "react";
import { Query, QueryResult } from "react-apollo";
import { Flex } from "../common/flex";
import { Preloader } from "../common/preloader";
import { Doc } from "./doc";

export const query = gql`
  query article($id: String) {
    article(id: $id) {
      title
      contentHTML
    }
  }
`;

export function Contributing(): JSX.Element {
  return (
    <>
      <div style={{ margin: "18px" }} />

      <Query
        query={query}
        variables={{
          id: "onefx-contri"
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
