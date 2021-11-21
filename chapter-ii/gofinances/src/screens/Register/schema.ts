import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup
    .string()
    .min(3, 'Nome muito curto')
    .max(30, 'Nome muito longo')
    .required('Nome obrigatório'),
  amount: Yup
    .number()
    .required('Valor obrigatório')
    .typeError('Informe apenas números')
    .positive('Apenas valores positivos'),
});
