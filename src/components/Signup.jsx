import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: "",
  });
  const onSubmit = (data) => console.log(data);
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="notification is-danger is-light" role="alert">
        A server error message
      </div>
      {/* Email */}
      <div className="field mb-4">
        <label htmlFor="signup-email" className="label">
          Email
        </label>
        <div className="control has-icons-left">
          <input
            id="signup-email"
            placeholder="Enter your email address"
            className="input"
            {...register("email", { required: true })}
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        <p className="help is-danger" role="alert">
          An error message
        </p>
      </div>
      {/* Password */}
      <div className="field mb-4">
        <label htmlFor="signup-password" className="label">
          Password
        </label>
        <div className="control has-icons-left">
          <input
            id="signup-password"
            type="password"
            className="input"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
        </div>
      </div>
      {/* Confirm password */}
      <div className="field mb-4">
        <label htmlFor="confirmPassword" className="label">
          Confirm password
        </label>
        <div className="control has-icons-left"></div>
      </div>
      {/* Submit */}
      <div className="field mb-4">
        <div className="control">
          <button className="button is-link" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Signup;
