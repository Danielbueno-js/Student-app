import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    password: Yup.string().required('Senha requerida').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
})

export const initialValues = {
    name: '',
    password: '',
    confirmPassword: ''
}
