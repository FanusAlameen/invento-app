import Tabs from "../../reusables/Tabs";
import Form from "../../reusables/Form";
import Table from "../../reusables/Table";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productPost,
  fetchProducts,
  productUpdate,
} from "../../../slices/api/productSlice";
import { BiError } from "react-icons/bi";

const Product = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const modalRef = useRef(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { products, loading, error } = useSelector((state) => state.products);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (currentProduct) {
      setValue("product_id", currentProduct.product_id);
      setValue("name", currentProduct.name);
      setValue("purchase_price", currentProduct.purchase_price);
      setValue("sale_price", currentProduct.sale_price);
      setValue("saleable", currentProduct.saleable);
    }
  }, [currentProduct, setValue]);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    document.getElementById("my_modal_1").showModal();
  };

  const columns = [
    {
      header: "S.No",
      accessorKey: "serialNumber",
    },
    {
      header: "Product ID",
      accessorKey: "product_id",
    },
    {
      header: "Product Name",
      accessorKey: "name",
    },
    {
      header: "Purchase Price",
      accessorKey: "purchase_price",
    },
    {
      header: "Sale Price",
      accessorKey: "sale_price",
    },
    {
      header: "Saleable",
      accessorKey: "saleable",
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

  const onSubmitProduct = (data, reset) => {
    dispatch(productPost(data))
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
    dispatch(productUpdate(data))
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
        heading="Product"
        tab1="New Product"
        tab2="Product List"
        comp1={
          <Form
            name="Product Name"
            action={onSubmitProduct}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessgae}
            mode="product"
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
              componentData={products}
              filename="Products List"
              heading="Products"
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
          <h1 className="font-bold text-lg">Update Product Details</h1>
          <form
            className="flex flex-col gap-12 mt-5"
            onSubmit={handleSubmit(onUpdate)}
          >
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Product ID
              </label>
              <input
                placeholder="Product ID"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="number"
                {...register("product_id")}
                defaultValue={currentProduct?.product_id}
                disabled
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Product Name
              </label>
              <input
                placeholder="Name"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="text"
                {...register("name")}
                defaultValue={currentProduct?.name}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Purchase Price
              </label>
              <input
                placeholder="purchase price"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="number"
                {...register("purchase_price")}
                defaultValue={currentProduct?.purchase_price}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Sale Price
              </label>
              <input
                placeholder="Sale Price"
                className="input input-bordered input-sm w-full max-w-xs font-mont"
                type="number"
                {...register("sale_price")}
                defaultValue={currentProduct?.sale_price}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <label className="label-text font-mont font-medium text-base-content text-sm">
                Saleable
              </label>
              <select
                className="select select-bordered select-sm w-full max-w-xs font-mont"
                {...register("saleable")}
                defaultValue={currentProduct?.saleable}
              >
                <option disabled selected>
                  Select Yes / No
                </option>
                <option className="font-mont">Yes</option>
                <option className="font-mont">No</option>
              </select>
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

export default Product;
