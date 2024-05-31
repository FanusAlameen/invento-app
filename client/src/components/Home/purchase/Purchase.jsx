import DynamicForm from "../../reusables/DynamicForm";
import Tabs from "../../reusables/Tabs";
import Table from "../../reusables/Table";
import { useDispatch, useSelector } from "react-redux";
import { purchasePost, fetchPurchase } from "../../../slices/api/purchaseSlice";
import { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";

const columns = [
  {
    header: "S.No",
    accessorKey: "serialNumber",
  },
  {
    header: "Purchase ID",
    accessorKey: "purchase_id",
  },
  {
    header: "Supplier Name",
    accessorKey: "supplier_name",
  },
  {
    header: "Product",
    accessorKey: "product_name",
  },
  {
    header: "Order Amount",
    accessorKey: "order_amount",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Item Total",
    accessorKey: "item_total",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Total ( $ )",
    accessorKey: "total",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
];

const Purchase = () => {
  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.suppliers);
  const { products } = useSelector((state) => state.products);
  const { purchases, loading, error } = useSelector((state) => state.purchases);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchPurchase());
  }, [dispatch]);

  const onSubmitPurchase = (data) => {
    const supplier_id = data.supplier_id;

    const formattedData = data.products.map((product) => ({
      supplier_id: supplier_id,
      product_id: product.product_id,
      product_name: product.name,
      purchase_price: product.purchase_price,
      quantity: product.quantity,
      item_total: product.item_total,
      discount: product.discount,
      total: product.total,
    }));

    dispatch(purchasePost(formattedData))
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false));
  };

  return (
    <>
      <Tabs
        heading="Purchase"
        tab1="New Purchase"
        tab2="Purchase Summary"
        comp1={
          <DynamicForm
            mode="purchase"
            suppliers={suppliers}
            products={products}
            action={onSubmitPurchase}
          />
        }
        comp2={
          loading ? (
            <div className="w-full flex items-center justify-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : error ? (
            <div className="w-full flex flex-col items-center justify-center">
              <BiError className="text-5xl text-error" />
              <h1 className="font-mont text-xl">{error}</h1>
            </div>
          ) : (
            <Table
              columns={columns}
              componentData={purchases}
              filename="Purchase Summary"
              heading="Purchases"
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
    </>
  );
};

export default Purchase;
