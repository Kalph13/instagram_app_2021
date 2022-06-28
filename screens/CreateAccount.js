import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { AuthInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation CreateAccount($firstName: String!, $lastName: String, $username: String!, $email: String!, $password: String!) {
        createAccount(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
            createAccountSucceed
            createAccountError
        }
    }
`;

const CreateAccount = ({ navigation }) => {
    const { register, handleSubmit, setValue, getValues } = useForm();

    const lastNameRef = useRef();
    const usernameRef= useRef();
    const emailRef = useRef();
    const passwordRef = useRef();   

    const onNext = next => {
        next?.current?.focus();
    };

    const onCompleted = data => {
        const { 
            createAccount: {
                createAccountSucceed
            }
        } = data;

        const { username, password } = getValues();

        if (createAccountSucceed) {
            navigation.navigate("Login", {
                username,
                password
            });
        }
    };

    const [ createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });

    const onSubmitValid = data => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data
                }
            })
        }
    };

    useEffect(() => {
        register("firstName", {
            required: true
        });
        register("lastName", {
            required: true
        });
        register("username", {
            required: true
        });
        register("email", {
            required: true
        });
        register("password", {
            required: true
        });
    }, [register])

    return (
        <AuthLayout>
            <AuthInput
                placeholder="First Name"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(lastNameRef)}
                onChangeText={text => setValue("firstName", text)}
            />
            <AuthInput
                ref={lastNameRef} 
                placeholder="Last Name"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(usernameRef)}
                onChangeText={text => setValue("lastName", text)}
            />
            <AuthInput
                ref={usernameRef} 
                placeholder="Username"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(emailRef)}
                onChangeText={text => setValue("username", text)}
                autoCapitalize="none"
            />
            <AuthInput
                ref={emailRef} 
                placeholder="Email"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={text => setValue("email", text)}
                autoCapitalize="none"
            />
            <AuthInput 
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                onSubmitEditing={handleSubmit(onSubmitValid)}
                onChangeText={text => setValue("password", text)}
            />
            <AuthButton
                onPress={handleSubmit(onSubmitValid)}
                disabled={false}
                text="Create Account"
            />
        </AuthLayout>
    )
};

export default CreateAccount;
