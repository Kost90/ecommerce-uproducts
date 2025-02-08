import React from 'react';
import RegisterForm from '@/components/form/registerForm/RegisterForm';
import TypographyH1 from '@/components/typography/TypographyH1';

function RegisterPage() {
  return (
    <div className="container">
      <TypographyH1 text="Register your account" className="my-10 md:mb-10 text-center" />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
