import { useForm, type SubmitHandler } from "react-hook-form";

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

  const handleSubmit: SubmitHandler<SignInFormInput> = (formValues) => {
    try {
      //api request
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: "Server error",
      });
    }
  };

  return (
    <>
      <form onSubmit={reactHookFormSubmit(handleSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Используйте следующий формат: email@example.com",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Enter product name",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        {errors?.root?.server && <>{errors.root?.server?.message}</>}
        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "ВХОД..." : "ВОЙТИ"}
        </button>
      </form>
    </>
  );
};

export default SignInPage;