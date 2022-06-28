import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const isLoggedInObj = async (token) => {
    await AsyncStorage.multiSet([
        [ "token", token ],
        [ "loggedIn", "yes" ]
    ]);

    isLoggedInVar(true);
    tokenVar(token);
};

const client = new ApolloClient({
    /* Use the IP Address Instead of Localhost When Using Actual Smartphone Devices */
    uri: "http://172.30.1.37:4000/graphql",
    cache: new InMemoryCache(),
});

export default client;
