import { connect } from "react-redux";

import { App } from "./app";

type Props = {
  googleTid: string;
  locale: string;
};

export const AppContainer =
  // @ts-ignore
  connect<Props>(
    (state: object): Props => {
      return {
        // @ts-ignore
        googleTid: state.base.analytics.googleTid,
        // @ts-ignore
        locale: state.base.locale
      };
    }
  )(App);
