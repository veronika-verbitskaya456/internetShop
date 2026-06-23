import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./RegistrationPage.module.css";
import { useState } from "react";
import { Routes } from "../../routes";
import { useCreateNewUserMutation, useLoginMutation, useUploadAvatarFileMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { NewUserRequest } from "../../services/types";
import { setToken } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface RegistrationFormInput {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

const RegistrationPage = () => {
  const {
    register,
    handleSubmit: reactHookFormSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
    mode: "onBlur",
  });

  const [uploadAvatar, { isLoading: isUploading }] =
    useUploadAvatarFileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createNewUser] = useCreateNewUserMutation();
  const [login] = useLoginMutation();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const handleSubmit: SubmitHandler<RegistrationFormInput> = async (formValues) => {
    try {
      const newUser: NewUserRequest = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        avatar: avatarUrl
      }

      const registeredUser = await createNewUser(newUser).unwrap();
      console.log(registeredUser.id);
      const loginData = await login({
        email: registeredUser.email,
        password: registeredUser.password
      }).unwrap();

      dispatch(setToken({ accessToken: loginData.access_token }));
      Cookies.set("refreshToken", loginData.refresh_token, { path: "/", expires: 7 });
      navigate(Routes.MAIN);

    } catch (error) {
      setError("root.server", {
        type: "server",
        message: "Server error",
      });
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("avatar", {
        type: "manual",
        message: "Разрешены разрешения изображений: JPEG, PNG, GIF, WEBP",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadAvatar(formData).unwrap();
      setAvatarUrl(result.location);
      setValue("avatar", result.location, { shouldValidate: true });
      clearErrors("avatar");

    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка загрузки файла";
      setError("avatar", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Регистрация</h1>
      <form
        onSubmit={reactHookFormSubmit(handleSubmit)}
        className={styles.form}
      >
        <div className={styles.field}>
          <div className={styles.labelWrapper}>
            <label htmlFor="name">Имя</label>
          </div>
          <input
            type="text"
            id="name"
            placeholder="Введите имя профиля"
            className={`${styles.input} ${errors.name ? styles.error : ""}`}
            {...register("name", {
              required: "Введите имя профиля",
              minLength: {
                value: 6,
                message: "Имя профиля должно содержать минимум 6 символов",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className={styles.errorMessage}>{errors.name.message}</p>
          )}
          <div className={styles.labelWrapper}>
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="text"
            id="email"
            placeholder="example@email.com"
            className={`${styles.input} ${errors.email ? styles.error : ""}`}
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Используйте формат: email@example.com",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <div className={styles.labelWrapper}>
            <label htmlFor="password">Пароль</label>
          </div>
          <input
            type="password"
            id="password"
            placeholder="Введите пароль"
            className={`${styles.input} ${errors.password ? styles.error : ""}`}
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        {!avatarUrl && (
          <div className={styles.field}>
            <div className={styles.labelWrapper}>
              <label htmlFor="avatar">Выберите фото профиля</label>
            </div>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className={styles.fileInput}
              {...register("avatar", {
                required: "Выберите изображение профиля",
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange(e);
                  }
                },
              })}
            />

            {errors.avatar && (
              <p className={styles.errorMessage}>{errors.avatar.message}</p>
            )}

            {isUploading && (
              <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
                <span className={styles.spinnerText}>Загрузка...</span>
              </div>
            )}
          </div>
        )}

        {avatarUrl && (
          <div className={styles.avatar}>
            Аватар загружен
          </div>
        )}

        {errors?.root?.server && (
          <p className={styles.serverError}>{errors.root?.server?.message}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={styles.button}
        >
          {isSubmitting ? "РЕГИСТРАЦИЯ..." : "ЗРЕГИСТРИРОВАТЬСЯ"}
        </button>

        <div className={styles.footer}>
          <p>
            Уже есть аккаунт?{" "}
            <a href={Routes.SIGN_IN} className={styles.signInLink}>
              Войти
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
