import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
//import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import invento from "../../../public/images/invento-logo.png";

const AuthForm = ({
  heading,
  option,
  link,
  linkText,
  button,
  action,
  isLoading,
  isError,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="border border-neutral p-5 rounded-xl w-1/3 bg-base-300 flex flex-col"
      onSubmit={handleSubmit(action)}
    >
      <div className="w-full h-[150px] flex flex-col justify-start items-center mt-3">
        <div className="w-[120px] h-[120px]">
          <img className="object-cover" src={invento} alt="logo" />
        </div>
      </div>

      <h1 className="text-3xl text-center font-mont font-semibold my-8">
        {heading}
      </h1>

      <div className="w-full flex flex-col gap-8">
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            {...register("username")}
            type="text"
            className="font-mont"
            id="username"
            placeholder="Username"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <MdEmail />
          <input
            {...register("email")}
            type="text"
            className="font-mont"
            id="email"
            placeholder="Email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 justify-start">
          <FaKey />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="font-mont"
            id="password"
            placeholder="Password"
          />
          {showPassword ? (
            <FaEye
              className="ml-auto"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEyeSlash
              className="ml-auto"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </label>

        {isError && (
          <p className="font-mont text-center text-error">{errorMessage}</p>
        )}

        <button
          className="btn btn-active btn-neutral font-mont font-medium"
          type="submit"
        >
          {button}
          {isLoading && <span className="loading loading-spinner"></span>}
        </button>

        <p className="text-center text-base-content font-mont">
          {option}
          <Link to={link} className="text-base-content font-mont underline">
            {linkText}
          </Link>
        </p>
      </div>
      {/* <DevTool control={control} /> */}
    </form>
  );
};

export default AuthForm;
