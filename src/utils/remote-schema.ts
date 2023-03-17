import { Executor } from "@graphql-tools/utils";
import { print } from "graphql";
import fetch from "node-fetch";

export const makeRemoteExecutor = (url: string): Executor => {
  return async (r) => {
    const query = typeof document === "string" ? document : print(r.document);
    const fetchResult = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: r.variables }),
    });
    if (fetchResult.ok) {
      return fetchResult.json();
    } else {
      throw new Error(
        `Unable to contact remote GraphQL server at ${url}. Got status ${fetchResult.status}`
      );
    }
  };
};
