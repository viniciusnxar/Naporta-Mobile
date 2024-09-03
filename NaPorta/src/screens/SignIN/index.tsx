import React from "react";
import {KeyboardAvoidingView, Platform} from 'react-native'
import brandImg from '@assets/brand.png';
import {Container, Content, Title, Brand, ForgotPasswordButton, ForgotPasswordLabel} from './styles'

import { Input } from "@src/components/Input";
import { Button } from "@src/components/Button";

export function SignIn(){
    return(
        <Container>
            <KeyboardAvoidingView behavior={Platform.IOS === 'ios' ? 'padding' : undefined}>
                <Content>
                    <Brand source={brandImg} />
                    <Title>Login</Title>
                    <Input
                        placeholder="E-mail"
                        type="secondary"
                        autoCorrect={false}
                        autoCapitalize="none"
                    />

                    <Input
                        placeholder="Senha"
                        type="secondary"
                        secureTextEntry
                    />

                    <ForgotPasswordButton>
                        <ForgotPasswordLabel>
                            Esqueci minha senha
                        </ForgotPasswordLabel>
                    </ForgotPasswordButton>

                    <Button 
                        title="Entrar"
                        type="secondary"
                    />
                </Content>
            </KeyboardAvoidingView>
        </Container> 
    );
}

