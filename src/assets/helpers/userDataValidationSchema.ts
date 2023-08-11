import * as Yup from 'yup';

export const UserDataSchemaValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(30, 'Too Long!')
    .required('Name is required'),
  location: Yup.object().shape({
    country: Yup.string()
      .min(2, 'Too short!')
      .max(30, 'Too Long!')
      .required('Country is required'),
    city: Yup.string()
      .min(2, 'Too short!')
      .max(30, 'Too Long!')
      .required('City is required'),
  }),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone format should be 050 000 00 00')
    .required('Phone is required'),
  gender: Yup.string().required('Choose gender'),
  birthDate: Yup.date()
    .min(new Date('1950-01-01'), 'Date should be more than 1950')
    .max(new Date('2022-12-31'), 'Date should be less than 2022')
    .required('Birth date is required'),
});
