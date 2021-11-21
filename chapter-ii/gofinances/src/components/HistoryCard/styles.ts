import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  padding: 13px 24px;
  border-radius: 8px;
  border-left-width: 4px;
  border-left-color: ${({ color }) => color};
  margin-bottom: 8px;

  flex-direction: row;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;
