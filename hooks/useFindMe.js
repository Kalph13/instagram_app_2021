import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, isLoggedOutObj } from "../apollo";

const FIND_ME_QUERY = gql`
    query FindMe {
        findMe {
            id
            username
            avatar
        }
    }
`;

const useFindMe = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    
    const { data } = useQuery(FIND_ME_QUERY, {
        skip: !isLoggedIn
    })

    useEffect(() => {
        if (data?.findMe === null) {
            isLoggedOutObj();
        }
    }, [data]);

    return { data };
}

export default useFindMe;
