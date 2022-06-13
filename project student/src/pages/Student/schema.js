import * as Yup from "yup";

export const Schema = Yup.object().shape({
  name: Yup.string().required("namw is required"),
  age: Yup.string().required("Age required"),
});

export const initialValues = {
    name: '',
    age: '',
}

