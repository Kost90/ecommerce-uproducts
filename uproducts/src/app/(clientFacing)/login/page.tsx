import LoginForm from '@/components/form/loginForm/LoginForm';
import TypographyH1 from '@/components/typography/TypographyH1';

function LoginPage() {
  return (
    <div className="container">
      <TypographyH1 text="Login to your account" className="my-10 md:mb-10 text-center" />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
