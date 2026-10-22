'use client';
import css from '@/app/(auth routes)/login/login.module.css';
// import AuthHeader from '../../../components/AuthHeader/AuthHeader';
// import AuthNavigation from '../../../components/AuthNavigation/AuthNavigation';
import LoginForm from "@/components/AuthLogin/LoginForm"
import { ApiError } from '@/app/api/api';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import { loginUser } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';




export default function signIn() {

const [isError, setIsError] = useState("");
const router = useRouter();

  async function handlesubmit(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const user = await loginUser({ email, password });
      router.push('/profile');
    }catch(error){
          setIsError((error as ApiError).response?.data.error ?? (error as ApiError).message);
        }
    }

  return (
<div className={`${css.page}`}>
      {/* <AuthHeader /> */}

      <main className={css.main}>
        <AuthNavigation />

        <section className={css.content}>
          <div className={css.heading}>
            <h1 className={css.title}>Реєстрація</h1>

            <p className={css.subtitle}>
              Раді вас бачити у спільноті мандрівників!
            </p>
          </div>
          <LoginForm/>
        </section>
      </main>

      {/* <AuthFooter /> */}
    </div>
  );
}