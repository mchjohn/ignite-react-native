import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo de transação!')

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria!')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }
    
    console.log(data);
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
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                type='down'
                title='Outcome'
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
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
