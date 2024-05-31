import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Form = ({
  name,
  address,
  action,
  isLoading,
  isError,
  errorMessage,
  mode,
}) => {
  const { register, handleSubmit, reset, control } = useForm();

  const onSubmit = (data) => {
    action(data, reset);
  };

  return (
    <form
      className="mt-5 flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-1/2 px-5 flex flex-col gap-12">
        <div className="flex justify-between items-center">
          <label className="label-text font-mont font-medium text-base-content text-lg">
            {name}
          </label>
          <input
            {...register("name", { required: "Name is required." })}
            type="text"
            placeholder={mode ? "eg: T-Shirts" : "John Doe"}
            className="input input-bordered w-full max-w-xs font-mont"
          />
        </div>

        {mode ? (
          <div className="flex justify-between items-center">
            <label className="label-text font-mont font-medium text-base-content text-lg">
              Purchase Price
            </label>
            <input
              {...register("purchase_price", {
                required: "purchase_price is required.",
              })}
              type="number"
              placeholder="Purchase Price"
              className="input input-bordered w-full max-w-xs font-mont"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <label className="label-text font-mont font-medium text-base-content text-lg">
              {address}
            </label>
            <input
              {...register("address", { required: "Address is required." })}
              type="text"
              placeholder="Christchurch, New Zealand"
              className="input input-bordered w-full max-w-xs font-mont"
            />
          </div>
        )}

        {mode ? (
          <div className="flex justify-between items-center">
            <label className="label-text font-mont font-medium text-base-content text-lg">
              Sale Price
            </label>
            <input
              {...register("sale_price", {
                required: "sale_price is required.",
              })}
              type="number"
              placeholder="Sale Price"
              className="input input-bordered w-full max-w-xs font-mont"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <label className="label-text font-mont font-medium text-base-content text-lg">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required." })}
              type="text"
              placeholder="johndoe@gmail.com"
              className="input input-bordered w-full max-w-xs font-mont"
            />
          </div>
        )}

        {mode ? (
          <div className="flex justify-between items-center">
            <label className="label-text font-mont font-medium text-base-content text-lg">
              Saleable
            </label>
            <select
              className="select select-bordered w-full max-w-xs font-mont"
              {...register("saleable", { required: "Saleable is required" })}
            >
              <option disabled selected>
                Select Yes / No
              </option>
              <option className="font-mont">Yes</option>
              <option className="font-mont">No</option>
            </select>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <label className="label-text font-mont font-medium text-base-content text-lg">
              Phone
            </label>
            <input
              {...register("phone", { required: "Phone Number is required." })}
              type="tel"
              placeholder="eg: (+64) 21 1234 5678"
              className="input input-bordered w-full max-w-xs font-mont"
            />
          </div>
        )}

        {isError && errorMessage}

        <div className="flex gap-5">
          <button
            className="btn btn-active btn-neutral font-mont"
            type="submit"
          >
            Submit
            {isLoading && <span className="loading loading-spinner"></span>}
          </button>

          <button
            className="btn btn-outline btn-default font-mont"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            Reset
          </button>
        </div>
      </div>
      {/* <DevTool control={control} /> */}
    </form>
  );
};

export default Form;
