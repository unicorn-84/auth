import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export default function Login() {
  const [serverError, setServerError] = React.useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      setServerError(error);
    }
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {!!serverError && (
        <div className="notification is-danger is-light" role="alert">
          {serverError.message}
        </div>
      )}
      <div className="field mb-4">
        <label className="label" htmlFor="login-email">
          Email
        </label>
        <div className="control has-icons-left">
          <input
            {...register("email", {
              required: true,
            })}
            id="login-email"
            className={`input${!!errors?.email ? " is-danger" : ""}`}
            placeholder="Enter your email address"
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        {!!errors?.email && (
          <p role="alert" className="help is-danger">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="field mb-4">
        <label className="label" htmlFor="login-password">
          Password
        </label>
        <p className="help">Must be at least 6 characters</p>
        <div className="control has-icons-left">
          <input
            {...register("password", {
              required: true,
              min: 6,
            })}
            id="login-password"
            type="password"
            className={`input${!!errors?.password ? " is-danger" : ""}`}
            placeholder="Enter your password"
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon={faLock} />
          </span>
        </div>
        {!!errors?.password && (
          <p role="alert" className="help is-danger">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="field mb-4">
        <div className="control">
          <label className="checkbox">
            <input {...register("isRemember")} type="checkbox" /> Remember me
          </label>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
