import React, { useRef } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { AuthInput } from "../components/auth/AuthShared";

const CreateAccount = () => {
    const lastNameRef = useRef();
    const usernameRef= useRef();
    const emailRef = useRef();
    const passwordRef = useRef();   

    const onNext = next => {
        next?.current?.focus();
    };

    const onDone = () => {
        alert("Done!");
    };    

    return (
        <AuthLayout>
            <AuthInput
                placeholder="First Name"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(lastNameRef)}
            />
            <AuthInput
                ref={lastNameRef} 
                placeholder="Last Name"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(usernameRef)}
            />
            <AuthInput
                ref={usernameRef} 
                placeholder="Username"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(emailRef)}
            />
            <AuthInput
                ref={emailRef} 
                placeholder="Email"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
            />
            <AuthInput 
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={onDone}
                lastOne={true}
            />
            <AuthButton
                onPress={() => null}
                disabled={true}
                text="Create Account"
            />
        </AuthLayout>
    )
};

export default CreateAccount;
