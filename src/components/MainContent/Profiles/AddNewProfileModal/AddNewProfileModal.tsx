import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import style from 'components/MainContent/Profiles/AddNewProfileModal/AddNewProfileModal.module.scss';
import { AppDispatch } from 'redux/store';
import { addNewProfile } from 'redux/profile-reducer';
import { UserDataSchemaValidation } from 'assets/helpers/userDataValidationSchema';
import avatarProfileUser from 'img/assets/avatarProfileUser.png';
import calendarIcon from 'img/icons/calendarIcon.svg';

type AddNewProfileModalPropsType = {
  setCreateProfile: (param: boolean) => void;
  userId: string;
};

export const AddNewProfileModal: React.FC<AddNewProfileModalPropsType> = ({
  setCreateProfile,
  userId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newProfileAvatar, setNewProfileAvatar] = useState<File | null>(null);

  return (
    <div className={style.modalContainer}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          file: '',
          name: '',
          gender: '',
          birthDate: '',
          location: {
            country: '',
            city: '',
          },
          phone: '',
        }}
        validationSchema={UserDataSchemaValidation}
        onSubmit={(values, { resetForm }) => {
          const profileCredentials = new FormData();
          newProfileAvatar &&
            profileCredentials.append('file', newProfileAvatar);
          profileCredentials.append('birthDate', values.birthDate);
          profileCredentials.append('gender', values.gender);
          profileCredentials.append('name', values.name);
          profileCredentials.append('phone', values.phone);
          profileCredentials.append('user', userId);
          profileCredentials.append('location.city', values.location.city);
          profileCredentials.append(
            'location.country',
            values.location.country
          );

          dispatch(addNewProfile({ userId, profileCredentials }));
          setCreateProfile(false);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <div
            className={style.formWrapper}
            onClick={(e) =>
              e.target === e.currentTarget && setCreateProfile(false)
            }
          >
            <Form className={style.formContainer}>
              <h2 className={style.formTitle}>Add new profile</h2>

              <div className={style.fieldWrapper}>
                <label className={style.fileLabel}>
                  <img
                    src={
                      newProfileAvatar
                        ? URL.createObjectURL(newProfileAvatar)
                        : avatarProfileUser
                    }
                    alt='User avatar'
                  />
                  <span>Choose picture</span>
                  <input
                    type='file'
                    name='file'
                    className={style.fileInput}
                    onChange={(e) => {
                      e.currentTarget.files?.length &&
                        setNewProfileAvatar(e.currentTarget.files[0]);
                    }}
                  />
                </label>
                {errors.file && touched.file && (
                  <div className={style.fieldError}>{errors.file}</div>
                )}
              </div>

              <div className={style.fieldWrapper}>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Name'
                  className={style.textInput}
                />
                {errors.name && touched.name && (
                  <div className={style.fieldError}>{errors.name}</div>
                )}
              </div>

              <div className={style.radioContiner}>
                <span className={style.radioTitle}>Gender</span>
                <label className={style.radioMale}>
                  <Field type='radio' name='gender' value='male' />
                  <span className={style.radioSpan}>Male</span>
                </label>
                <label className={style.radioFemale}>
                  <Field type='radio' name='gender' value='female' />
                  <span className={style.radioSpan}>Female</span>
                </label>
                {errors.gender && touched.gender && (
                  <div className={style.fieldError}>{errors.gender}</div>
                )}
              </div>

              <div className={style.fieldWrapper}>
                <Field
                  type='date'
                  name='birthDate'
                  id='birthDate'
                  min='1950-12-31'
                  max='2022-12-31'
                  placeholder='Birthdate'
                  className={style.textInput}
                />
                <img
                  src={calendarIcon}
                  alt='icon'
                  className={style.calendarIcon}
                />
                {errors.birthDate && touched.birthDate && (
                  <div className={style.fieldError}>{errors.birthDate}</div>
                )}
              </div>

              <div className={style.fieldWrapper}>
                <Field
                  type='text'
                  id='location.country'
                  name='location.country'
                  placeholder='Country'
                  className={style.textInput}
                />
                {errors.location?.country && touched.location?.country && (
                  <div className={style.fieldError}>
                    {errors.location?.country}
                  </div>
                )}
              </div>

              <div className={style.fieldWrapper}>
                <Field
                  type='text'
                  id='location.city'
                  name='location.city'
                  placeholder='City'
                  className={style.textInput}
                />
                {errors.location?.city && touched.location?.city && (
                  <div className={style.fieldError}>
                    {errors.location?.city}
                  </div>
                )}
              </div>

              <div className={style.fieldWrapper}>
                <Field
                  type='tel'
                  id='phone'
                  name='phone'
                  placeholder='Phone'
                  className={style.textInput}
                />
                {errors.phone && touched.phone && (
                  <div className={style.fieldError}>{errors.phone}</div>
                )}
              </div>

              <div className={style.formButtonContainer}>
                <button type='submit' className={style.submitButton}>
                  Save
                </button>
                <button
                  onClick={() => setCreateProfile(false)}
                  className={style.closeButton}
                >
                  Close
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
