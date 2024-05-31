import Tabs from "../../reusables/Tabs";
import Form from "../../reusables/Form";
import Table from "../../reusables/Table";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  supplierPost,
  supplierUpdate,
  fetchSuppliers,
} from "../../../slices/api/supplierSlice";
import { BiError } from "react-icons/bi";

const Suppliers = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const modalRef = useRef(null);
  const [currentSupplier, setSupplier] = useState(null);
  const { suppliers, loading, error } = useSelector((state) => state.suppliers);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (currentSupplier) {
      setValue("supplier_id", currentSupplier.supplier_id);
      setValue("address", currentSupplier.address);
      setValue("name", currentSupplier.name);
      setValue("email", currentSupplier.email);
      setValue("phone", currentSupplier.phone);
    }
  }, [currentSupplier, setValue]);

  const handleEdit = (data) => {
    setSupplier(data);
    setIsSuccess(false);
    document.getElementById("my_modal_1").showModal();
  };

  const columns = [
    {
      header: "S.No",
      accessorKey: "serialNumber",
    },
    {
      header: "Supplier ID",
      accessorKey: "supplier_id",
    },
    {
      header: "Supplier Name",
      accessorKey: "name",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone No",
      accessorKey: "phone",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <button
          className="btn btn-outline btn-sm"
          onClick={() => handleEdit(row.original)}
        >
          Edit
        </button>
      ),
    },
  ];

  const onSubmitSupplier = (data, reset) => {
    dispatch(supplierPost(data))
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch(() => setIsSuccess(false))
      .finally(() => reset());
  };

  const onUpdate = (data) => {
    dispatch(supplierUpdate(data))
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch(() => setIsSuccess(false));
  };

  const isLoading = loading;
  const isError = error;
  const errorMessgae = error;

  return (
    <>
      <Tabs
        heading="Suppliers"
        tab1="New Supplier"
        tab2="Supplier List"
        comp1={
          <Form
            name="Supplier Name"
            address="Supplier Address"
            action={onSubmitSupplier}
            isLoading={isLoading}
            isError={isError}
            errorMessgae={errorMessgae}
          />
        }
        comp2={
          isLoading ? (
            <div className="w-full flex items-center justify-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : isError ? (
            <div className="w-full flex flex-col items-center justify-center">
              <BiError className="text-5xl text-error" />
              <h1 className="font-mont text-xl">{isError}</h1>
            </div>
          ) : (
            <Table
              columns={columns}
              componentData={suppliers}
              filename="Suppliers List"
              heading="Suppliers"
            />
          )
        }
      />

      {isSuccess && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Form has been submitted successfully!</span>
          </div>
        </div>
      )}

      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>An error occured!</span>
          </div>
        </div>
      )}

      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              modalRef.current.close();
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h1 className="font-bold text-lg">Update Supplier Details</h1>
          <form
            className="flex flex-col gap-12 mt-5"
            onSubmit={handleSubmit(onUpdate)}
          >
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Supplier ID
              </label>
              <input
                placeholder="Supplier ID"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="number"
                {...register("supplier_id")}
                defaultValue={currentSupplier?.supplier_id}
                disabled
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Supplier Name
              </label>
              <input
                placeholder="Supplier Name"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="text"
                {...register("name")}
                defaultValue={currentSupplier?.name}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Address
              </label>
              <input
                placeholder="Address"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="text"
                {...register("address")}
                defaultValue={currentSupplier?.address}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Email
              </label>
              <input
                placeholder="Email"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="text"
                {...register("email")}
                defaultValue={currentSupplier?.email}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Phone
              </label>
              <input
                placeholder="Phone"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="tel"
                {...register("phone")}
                defaultValue={currentSupplier?.phone}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline btn-secondary btn-sm font-mont"
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Suppliers;
