import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;
  margin-bottom: 8px;
  border-radius: 8px;
  
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.textDark};

  background-color: ${({ theme }) => theme.colors.shape};
`;
