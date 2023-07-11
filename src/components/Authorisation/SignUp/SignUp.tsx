import React from 'react';
import style from '../AuthContainer.module.scss';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import { UserSignUpType } from '../../../types/types';
import * as Yup from 'yup';

type Props = {
  signUpUser: (data: UserSignUpType) => void;
  requestErrors: string | null;
};

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('User name is required'),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Password is required'),
});

const SignUp: React.FC<Props> = ({ signUpUser, requestErrors }) => {
  return (
    <div className={style.authContainer}>
      <Formik
        initialValues={{
          userName: '',
          email: '',
          password: '',
          admin: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          signUpUser(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={style.formContainer}>
            {requestErrors && (
              <p className={`${style.requestErrors} ${style.fieldError}`}>
                {requestErrors}
              </p>
            )}
            <h1 className={style.title}>Sign up</h1>

            <div className={style.fieldWrapper}>
              <Field type='text' name='userName' placeholder='User name' />
              {errors.userName && touched.userName ? (
                <div className={style.fieldError}>{errors.userName}</div>
              ) : null}
            </div>

            <div className={style.fieldWrapper}>
              <Field type='email' name='email' placeholder='Email' />
              {errors.email && touched.email ? (
                <div className={style.fieldError}>{errors.email}</div>
              ) : null}
            </div>

            <div className={style.fieldWrapper}>
              <Field type='password' name='password' placeholder='Password' />
              {errors.password && touched.password ? (
                <div className={style.fieldError}>{errors.password}</div>
              ) : null}
            </div>

            <label className={style.checkboxContiner}>
              <Field type='checkbox' name='toggle' />
              <span className={style.checkboxSpan}>Admin</span>
            </label>

            <button type='submit' className={style.submitButton}>
              Submit
            </button>
            <p className={style.authLink}>
              Have an account?<Link to='/signin'>Sign in</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
