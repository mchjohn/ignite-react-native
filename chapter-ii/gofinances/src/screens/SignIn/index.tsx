import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSVG from '../../assets/apple-icon.svg';
import GoogleSVG from '../../assets/google-icon.svg';
import LogoSVG from '../../assets/logo.svg';

import { SigInSocialButton } from '../../components/SigInSocialButton';

import { useAuth } from '../../hooks/auth';

import * as S from './styles';

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      
      Alert.alert('Não foi possível conectar com o Google')
    }
  }
  
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
          <SigInSocialButton title="Entrar com Apple" svg={AppleSVG} />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  )
}