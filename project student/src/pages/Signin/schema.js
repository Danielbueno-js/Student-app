import * as Yup from 'yup'

export const Schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    password: Yup.string().required('Senha requerida'),
})

export const initialValues = {
    name: '',
    password: ''
}
