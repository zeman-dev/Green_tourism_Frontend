'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().email('Incorrecr email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must contain min 6 symbols').required('Password is required').
});

const SignIn = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) =>{
            try{}
            catch (error) {
        toast.error(error.message || 'Помилка авторизації. Спробуйте ще раз.');
      } finally {
        setSubmitting(false);
      }
        }
    })
  const handleSubmit = async (formData: FormData) => {};

  return (
    <form action={handleSubmit}>
      <h1>Sign in</h1>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        Password
        <input type="password" name="password" required />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
};

export default SignIn;