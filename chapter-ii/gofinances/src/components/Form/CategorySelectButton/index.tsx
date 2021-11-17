import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: Props) {
  return (
    <S.Container onPress={onPress}>
      <S.Category>{title}</S.Category>
      <S.Icon name='chevron-down' />
    </S.Container>
  );
}
