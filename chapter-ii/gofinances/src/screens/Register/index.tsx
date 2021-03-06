import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import uuid from 'react-native-uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../hooks/auth';

import { CategorySelect } from '../CategorySelect';
import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import * as S from './styles';

import { schema } from './schema';

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: {
      errors
    },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const {navigate} = useNavigation();

  const storageKey = `@gofinance:transactions_user:${user.id}`;

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);    
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo de transação!')

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria!')

    const transaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(storageKey);
      const currentData = data ? JSON.parse(data) : [];

      const formattedData = [
        ...currentData,
        transaction
      ];

      await AsyncStorage.setItem(storageKey, JSON.stringify(formattedData));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigate('Listagem' as never);
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar!');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              control={control}
              name='name'
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name='amount'
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <S.TransactionTypes>
              <TransactionTypeButton
                type='up'
                title='Income'
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type='down'
                title='Outcome'
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </S.TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />

          </S.Fields>

          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal
          visible={categoryModalOpen}
        >
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
