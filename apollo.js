import { ApolloClient, InMemoryCache, makeVar, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Offset-based Pagination: https://www.apollographql.com/docs/react/pagination/offset-based */
import { offsetLimitPagination } from "@apollo/client/utilities";

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

const httpLink = createHttpLink({
    /* Use the IP Address Instead of Localhost When Using Actual Smartphone Devices */
    uri: "http://172.30.1.37:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: tokenVar(),
        }
    }
});

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
    link: authLink.concat(httpLink),
    cache,
});

export default client;
