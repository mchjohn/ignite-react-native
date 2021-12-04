import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSVG from '../../assets/apple-icon.svg';
import GoogleSVG from '../../assets/google-icon.svg';
import LogoSVG from '../../assets/logo.svg';

import { SigInSocialButton } from '../../components/SigInSocialButton';

import { useAuth } from '../../hooks/auth';

import * as S from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);

      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      
      Alert.alert('Não foi possível conectar com o Google');
      setIsLoading(false);
    }
  };

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);

      await signInWithApple();
    } catch (error) {
      console.log(error);
      
      Alert.alert('Não foi possível conectar com a Apple');
      setIsLoading(false);
    }
  };
  
  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SigInTitle>
          Faça seu login com{'\n'}umas das contas abaixo
        </S.SigInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SigInSocialButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handleSignInWithGoogle}
          />
          {
            Platform.OS === 'ios' &&
              <SigInSocialButton
                title="Entrar com Apple"
                svg={AppleSVG}
                onPress={handleSignInWithApple}
              />
          }
          
        </S.FooterWrapper>

        {isLoading &&
          <ActivityIndicator
            color={theme.colors.shape}
            size='large'
            style={{marginTop: 16}}
          />}
      </S.Footer>
    </S.Container>
  );
};
