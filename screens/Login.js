import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { AuthInput } from "../components/auth/AuthShared";
import { isLoggedInObj } from "../apollo";

const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            loginSucceed
            loginError
            loginToken
        }
    }
`;

const Login = ({ route: { params } }) => {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            username: params?.username,
            password: params?.password
        }
    });

    const passwordRef = useRef();

    const onNext = next => {
        next?.current?.focus();
    };

    const onCompleted = async (data) => {
        const {
            login: {
                loginSucceed,
                loginToken
            }
        } = data;

        if (loginSucceed) {
            await isLoggedInObj(loginToken);
        }
    };

    const [ loginMutation, { loading } ] = useMutation(LOGIN_MUTATION, {
        onCompleted
    });

    const onSubmitValid = data => {
        if (!loading) {
            loginMutation({
                variables: {
                    ...data
                }
            });
        }
    };

    useEffect(() => {
        register("username", {
            required: true
        });
        register("password", {
            required: true
        });
    }, [register]);

    return (
        <AuthLayout>
            <AuthInput 
                placeholder="Username"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={text => setValue("username", text)}
                autoCapitalize="none"
                value={watch("username")}
            />
            <AuthInput 
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="done"
                secureTextEntry
                lastOne={true}
                onSubmitEditing={handleSubmit(onSubmitValid)}
                onChangeText={text => setValue("password", text)}
                value={watch("password")}
            />
            <AuthButton 
                onPress={handleSubmit(onSubmitValid)}
                disabled={!watch("username") || !watch("password")}
                text="Log In"
                loading={loading}
            />
        </AuthLayout>
    );
};

export default Login;
