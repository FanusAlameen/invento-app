import Tabs from "../../reusables/Tabs";
import Form from "../../reusables/Form";
import Table from "../../reusables/Table";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clientPost,
  clientUpdate,
  fetchClients,
} from "../../../slices/api/clientSlice";
import { BiError } from "react-icons/bi";

const Clients = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const modalRef = useRef(null);
  const [currentClient, setClient] = useState(null);
  const { clients, loading, error } = useSelector((state) => state.clients);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (currentClient) {
      setValue("client_id", currentClient.client_id);
      setValue("address", currentClient.address);
      setValue("name", currentClient.name);
      setValue("email", currentClient.email);
      setValue("phone", currentClient.phone);
    }
  }, [currentClient, setValue]);

  const handleEdit = (data) => {
    setClient(data);
    document.getElementById("my_modal_1").showModal();
  };

  const columns = [
    {
      header: "S.No",
      accessorKey: "serialNumber",
    },
    {
      header: "Client ID",
      accessorKey: "client_id",
    },
    {
      header: "Client Name",
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

  const onSubmitClient = (data, reset) => {
    dispatch(clientPost(data))
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
    dispatch(clientUpdate(data))
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch(() => setIsSuccess(false))
      .finally(() => modalRef.current.close());
  };

  const isLoading = loading;
  const isError = error;
  const errorMessgae = error;

  return (
    <>
      <Tabs
        heading="Client"
        tab1="New Client"
        tab2="Client List"
        comp1={
          <Form
            name="Client Name"
            address="Client Address"
            action={onSubmitClient}
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
              componentData={clients}
              filename="Clients List"
              heading="Clients"
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
          <form method="dialog" onSubmit={handleSubmit(onUpdate)}>
            <button
              onClick={(e) => {
                e.preventDefault();
                modalRef.current.close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h1 className="font-bold text-lg">Update Client Details</h1>
          <form
            className="flex flex-col gap-12 mt-5"
            onSubmit={handleSubmit(onUpdate)}
          >
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Client ID
              </label>
              <input
                placeholder="Client ID"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="number"
                {...register("client_id")}
                defaultValue={currentClient?.client_id}
                disabled
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Client Name
              </label>
              <input
                placeholder="Client Name"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="text"
                {...register("name")}
                defaultValue={currentClient?.name}
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
                defaultValue={currentClient?.address}
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
                defaultValue={currentClient?.email}
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
                defaultValue={currentClient?.phone}
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

export default Clients;
