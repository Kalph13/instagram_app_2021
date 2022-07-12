import { ApolloClient, InMemoryCache, makeVar, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Offset-based Pagination: https://www.apollographql.com/docs/react/pagination/offset-based */
import { offsetLimitPagination } from "@apollo/client/utilities";

/* Replaced by graphql-ws */
/* Subscription (subscription-transport-ws): https://www.apollographql.com/docs/react/data/subscriptions/#the-older-subscriptions-transport-ws-library */
/* import { WebSocketLink } from "@apollo/client/link/ws"; */
/* import { SubscriptionClient } from "subscriptions-transport-ws"; */

/* Subscription in Apollo 3 w/graphql-ws (Requires Apollo Client > v3.5.10, Requires > v3.6.4 for Expo, Requires v3.4.17 for GraphQL Upload) */
/* - Doc: https://www.apollographql.com/docs/react/data/subscriptions/#2-initialize-a-graphqlwslink */
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

/* Subscription (getMainDefinition for split): https://www.apollographql.com/docs/react/data/subscriptions/#3-split-communication-by-operation-recommended */
import { getMainDefinition } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const isLoggedInObj = async (token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const isLoggedOutObj = async (token) => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
};

/* Replaced by createUploadLink */
/* const httpLink = createHttpLink({
    / Use the IP Address Instead of Localhost When Using Actual Smartphone Devices
    uri: "http://172.30.1.37:4000/graphql"

    // Or Use Local Tunnel (https://github.com/localtunnel/localtunnel)
    // Ref: https://kibua20.tistory.com/151
}); */

const uploadHttpLink = createUploadLink({
    uri: "https://project-instagram-2021.herokuapp.com/graphql"
    /* uri: "http://172.30.1.48:4000/graphql/" */
});

const authLink = setContext((_, { headers }) => {
    console.log("tokenVar:", tokenVar());
    return {
        headers: {
            ...headers,
            authorization: tokenVar()
        }
    }
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log("GraphQL Error", graphQLErrors);
    }
    if (networkError) {
        console.log("Network Error", networkError);
    }
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

/* Replaced by graphql-ws */
/* const wsLink = new WebSocketLink(
    new SubscriptionClient("ws://172.30.1.48:4000/graphql/", {
        connectionParams: {
            authorization: tokenVar()
        }
    })
); */

/* Subscription in Apollo 3 w/graphql-ws (Requires Apollo Client > v3.5.10, Requires > v3.6.4 for Expo, Requires v3.4.17 for GraphQL Upload) */
/* - Doc: https://www.apollographql.com/docs/react/data/subscriptions/#2-initialize-a-graphqlwslink */

const wsLink = new GraphQLWsLink(createClient({
    url: "wss://project-instagram-2021.herokuapp.com/graphql",
    /* url: "ws://172.30.1.48:4000/graphql/", */
    connectionParams: {
        Authorization: tokenVar()
    }
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLinks
);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                seeFeed: offsetLimitPagination()
            }
        }
    }
});

const client = new ApolloClient({
    link: splitLink,
    cache
});

export default client;
