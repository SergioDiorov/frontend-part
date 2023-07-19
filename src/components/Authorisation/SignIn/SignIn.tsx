import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import style from '../AuthContainer.module.scss';
import { UserSignInType } from '../../../types/types';

type SignInProps = {
  signInUser: (data: UserSignInType) => void;
  requestErrors: string | null;
};

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address'
    )
    .max(30, 'Too Long!')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Password is required'),
});

const SignIn: React.FC<SignInProps> = ({ signInUser, requestErrors }) => {
  return (
    <div className={style.authContainer}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values, { resetForm }) => {
          signInUser(values);
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
            <h1 className={style.title}>Sign in</h1>

            <div className={style.fieldWrapper}>
              <Field type='email' name='email' placeholder='Email' />
              {errors.email && touched.email && (
                <div className={style.fieldError}>{errors.email}</div>
              )}
            </div>

            <div className={style.fieldWrapper}>
              <Field type='password' name='password' placeholder='Password' />
              {errors.password && touched.password && (
                <div className={style.fieldError}>{errors.password}</div>
              )}
            </div>

            <button type='submit' className={style.submitButton}>
              Sign in
            </button>
            <p className={style.authLink}>
              Don’t have an account?<Link to='/signup'>Sign up</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
