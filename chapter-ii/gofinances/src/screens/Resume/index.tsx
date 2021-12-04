import React, { useCallback, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, subMonths, format } from 'date-fns';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components'; 
import { VictoryPie } from 'victory-native';
import { ptBR } from 'date-fns/locale';

import { useAuth } from '../../hooks/auth';

import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';

import * as S from './styles';

export interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();
  const { user } = useAuth();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  async function loadData() {
    setIsLoading(true);

    const storageKey = `@gofinance:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(storageKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: TransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

    const expensivesTotal = expensives
      .reduce((acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
    }, 0);    

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      const totalFormatted = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

      const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

      if (categorySum > 0)
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent,
        });
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>
      
      {isLoading ?
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </S.LoadContainer> :
        <S.Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <S.MonthSelect>
          <S.MonthSelectButton
            onPress={() => handleDateChange('prev')}
          >
            <S.MonthSelectIcon name='chevron-left' />
          </S.MonthSelectButton>

          <S.Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</S.Month>

          <S.MonthSelectButton
            onPress={() => handleDateChange('next')}
          >
            <S.MonthSelectIcon name='chevron-right' />
          </S.MonthSelectButton>
        </S.MonthSelect>

        <S.ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontWeight: 900,
                fontSize: RFValue(18),
                fill: theme.colors.shape,
              }
            }}
            labelRadius={108}
            x='percent'
            y='total'
          />

          { totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </S.ChartContainer>
      </S.Content>
      }
    </S.Container>
  );
}
