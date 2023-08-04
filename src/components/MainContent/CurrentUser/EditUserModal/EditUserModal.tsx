import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import style from 'components/MainContent/CurrentUser/EditUserModal/EditUserModal.module.scss';
import avatarProfileUser from 'img/assets/avatarProfileUser.png';
import { changeUserData } from 'redux/current-user-reducer';
import { AppDispatch } from 'redux/store';
import { UserType } from 'types/types';

type EditUserModalPropsType = {
  setEditUser: (param: boolean) => void;
  userName: string | undefined;
  email: string | undefined;
  isAdmin: boolean | undefined;
  userId: string;
};

const UserDataSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address'
    )
    .max(30, 'Too Long!')
    .required('User name is required'),
  userName: Yup.string().max(30, 'Too Long!').required('Email is required'),
});

export const EditUserModal: React.FC<EditUserModalPropsType> = ({
  setEditUser,
  userName,
  email,
  isAdmin,
  userId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className={style.modalContainer}
      onClick={(e) => e.target === e.currentTarget && setEditUser(false)}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          file: '',
          userName: userName,
          email: email,
          role: isAdmin,
        }}
        validationSchema={UserDataSchema}
        onSubmit={(values, { resetForm }) => {
          let userCredentials: Partial<UserType> = {};

          if (values.email !== email) {
            userCredentials.email = values.email;
          }

          if (values.role !== isAdmin) {
            userCredentials.isAdmin = values.role;
          }

          if (values.userName !== userName) {
            userCredentials.userName = values.userName;
          }

          if (Object.keys(userCredentials).length !== 0) {
            dispatch(changeUserData({ userId, userCredentials }));
          }

          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={style.formContainer}>
            <h2 className={style.formTitle}>Edit</h2>

            <div className={style.fieldWrapper}>
              <label className={style.fileLabel}>
                <img src={avatarProfileUser} alt='User avatar' />
                <span>Choose picture</span>
                <Field type='file' name='file' className={style.fileInput} />
              </label>
              {errors.file && touched.file && (
                <div className={style.fieldError}>{errors.file}</div>
              )}
            </div>

            <div className={style.fieldWrapper}>
              <span>Username</span>
              <Field
                type='userName'
                name='userName'
                placeholder='User name'
                className={style.textInput}
              />
              {errors.userName && touched.userName && (
                <div className={style.fieldError}>{errors.userName}</div>
              )}
            </div>

            <div className={style.fieldWrapper}>
              <span>Email</span>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                className={style.textInput}
              />
              {errors.email && touched.email && (
                <div className={style.fieldError}>{errors.email}</div>
              )}
            </div>

            <label className={style.checkboxContiner}>
              <span className={style.checkboxTitle}>Role</span>
              <Field type='checkbox' name='role' />
              <span className={style.checkboxSpan}>Admin</span>
            </label>

            <div className={style.formButtonContainer}>
              <button type='submit' className={style.submitButton}>
                Save
              </button>
              <button
                onClick={() => setEditUser(false)}
                className={style.closeButton}
              >
                Close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
