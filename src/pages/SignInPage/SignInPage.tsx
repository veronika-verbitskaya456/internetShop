import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from './SignInPage.module.css';
import { getAuthErrorMessage } from '../../utils/authApiUtils';
import { Routes } from "../../routes";

interface SignInFormInput {
  email: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit: reactHookFormSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit: SubmitHandler<SignInFormInput> = async (formValues) => {
    try {
      const email = formValues.email;
      const password = formValues.password;
      const loginData = await login({ email, password }).unwrap();
      dispatch(setToken({ accessToken: loginData.access_token }));
      navigate(Routes.MAIN);

    } catch (error) {
      setError("root.server", {
        type: "server",
        message: getAuthErrorMessage(error),
      });
    }
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Вход в личный кабинет</h1>
      <form onSubmit={reactHookFormSubmit(handleSubmit)} className={styles.form}>
        <div className={styles.field}>
          <div className={styles.labelWrapper}>
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="text"
            id="email"
            placeholder="example@email.com"
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Используйте формат: email@example.com",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>

        <div className={styles.field}>
          <div className={styles.labelWrapper}>
            <label htmlFor="password">Пароль</label>
          </div>
          <input
            type="password"
            id="password"
            placeholder="Введите пароль"
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>

        {errors?.root?.server && (
          <p className={styles.serverError}>{errors.root?.server?.message}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={styles.button}
        >
          {isSubmitting ? "ВХОД..." : "ВОЙТИ"}
        </button>
      </form>

      <div className={styles.footer}>
        <p>
          Нет аккаунта?{" "}
          <Link to={Routes.REGISTRATION} className={styles.signUpLink}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;