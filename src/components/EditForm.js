import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(50, "Must be 5 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  role: Yup.string().required("Required"),
});

const EditForm = ({
  editUserDetails,
  displayModal,
  setDisplayModal,
  userToEdit,
}) => (
  <div className={`form-modal ${displayModal ? "open" : ""}`}>
    {userToEdit ? (
      <>
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={{
            username: userToEdit.name,
            email: userToEdit.email,
            role: userToEdit.role,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            editUserDetails(values);
            setDisplayModal(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="edit-form">
              <input
                type="username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <p className="err">
                {errors.username && touched.username && errors.username}
              </p>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <p className="err">
                {errors.email && touched.email && errors.email}
              </p>
              <input
                type="role"
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
              />

              <p className="err">
                {errors.role && touched.role && errors.role}
              </p>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </>
    ) : (
      " "
    )}
  </div>
);

export default EditForm;
