import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { DevTool } from "@hookform/devtools";

const DynamicForm = ({ mode, suppliers, clients, products, action }) => {
  const { control, handleSubmit, setValue, watch } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const handleInputChange = (e) => {
    if (mode === "purchase") {
      const selectedSupplier = suppliers.find(
        (supplier) => supplier.name === e.target.value
      );
      setValue("name", e.target.value);
      setValue("supplier_id", selectedSupplier?.supplier_id || "");
      setValue("address", selectedSupplier?.address || "");
    } else {
      const selectedClient = clients.find(
        (client) => client.name === e.target.value
      );

      setValue("name", e.target.value);
      setValue("client_id", selectedClient?.client_id || "");
      setValue("address", selectedClient?.address || "");
    }
  };

  const handleProductChange = (index, e) => {
    const selectedProduct = products.find(
      (product) => product.name === e.target.value
    );

    setValue(`products.${index}.name`, e.target.value);
    setValue(`products.${index}.product_id`, selectedProduct?.product_id || "");
    if (mode === "purchase") {
      setValue(
        `products.${index}.purchase_price`,
        selectedProduct?.purchase_price || ""
      );
    } else {
      setValue(
        `products.${index}.sale_price`,
        selectedProduct?.sale_price || ""
      );
    }

    setValue(`products.${index}.quantity`, 1);
    setValue(`products.${index}.discount`, 0);

    const quantity = watch(`products.${index}.quantity`) || 0;
    const item_total = selectedProduct?.purchase_price * quantity;
    setValue(`products.${index}.item_total`, item_total.toFixed(2));
    const discount = watch(`products.${index}.discount`) || 0;
    const total = item_total - discount;
    setValue(`products.${index}.total`, total.toFixed(2));
  };

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      fields.forEach((field, index) => {
        const quantity = values.products?.[index]?.quantity || 0;
        const discount = values.products?.[index]?.discount || 0;

        if (mode === "purchase") {
          const purchasePrice = values.products?.[index]?.purchase_price || 0;

          const item_total = purchasePrice * quantity;
          const total = item_total - discount;

          // Only update if the values have actually changed
          if (values.products?.[index]?.item_total !== item_total.toFixed(2)) {
            setValue(`products.${index}.item_total`, item_total.toFixed(2));
          }

          if (values.products?.[index]?.total !== total.toFixed(2)) {
            setValue(`products.${index}.total`, total.toFixed(2));
          }
        } else {
          const salePrice = values.products?.[index]?.sale_price || 0;

          const item_total = salePrice * quantity;
          const total = item_total - discount;

          // Only update if the values have actually changed
          if (values.products?.[index]?.item_total !== item_total.toFixed(2)) {
            setValue(`products.${index}.item_total`, item_total.toFixed(2));
          }

          if (values.products?.[index]?.total !== total.toFixed(2)) {
            setValue(`products.${index}.total`, total.toFixed(2));
          }
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, fields, setValue]);

  return (
    <form onSubmit={handleSubmit(action)} className="mt-6">
      <div className="w-1/2 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <label className="label-text font-mont font-semibold text-md">
            {mode === "purchase" ? "Supplier Name" : "Client Name"}
          </label>
          <Controller
            control={control}
            name={mode === "purchase" ? "name" : "name"}
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                className="select select-bordered rounded-full w-full max-w-xs font-mont"
              >
                <option className="py-2" value="" disabled>
                  {mode === "purchase"
                    ? suppliers.length === 0
                      ? "No Suppliers"
                      : "Select Supplier"
                    : clients.length === 0
                    ? "No Clients"
                    : "Select Client"}
                </option>
                {mode === "purchase"
                  ? suppliers.map((supplier, index) => (
                      <option key={index} value={supplier.name}>
                        {supplier.name}
                      </option>
                    ))
                  : clients.map((client, index) => (
                      <option key={index} value={client.name}>
                        {client.name}
                      </option>
                    ))}
              </select>
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="label-text font-mont font-semibold text-md">
            {mode === "purchase" ? "Supplier ID" : "Client ID"}
          </label>
          <Controller
            control={control}
            name={mode === "purchase" ? "supplier_id" : "client_id"}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder={mode === "purchase" ? "Supplier ID" : "Client ID"}
                className="input input-bordered rounded-full w-full max-w-xs font-mont text-md"
                readOnly
              />
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="label-text font-mont font-semibold text-md">
            Address
          </label>
          <Controller
            control={control}
            name={mode === "purchase" ? "address" : "address"}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder={
                  mode === "purchase" ? "Supplier Address" : "Client Address"
                }
                className="input input-bordered rounded-full w-full max-w-xs font-mont"
                readOnly
              />
            )}
          />
        </div>
      </div>
      <table className="table table-zebra mt-10">
        <thead>
          <tr className="font-mont text-base-content text-md">
            <th>No</th>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>{mode === "purchase" ? "Purchase Price" : "Sale Price"}</th>
            <th>Quantity</th>
            <th>Item Total</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <Controller
                  control={control}
                  name={`products.${index}.name`}
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleProductChange(index, e);
                      }}
                      className="w-[100px] font-mont select select-bordered select-xs rounded-sm"
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.name} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </td>
              <td>
                <Controller
                  control={control}
                  name={`products.${index}.product_id`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-[120px] font-mont input input-bordered input-xs rounded-sm"
                      type="text"
                      readOnly
                    />
                  )}
                />
              </td>
              <td>
                <Controller
                  control={control}
                  name={
                    mode === "purchase"
                      ? `products.${index}.purchase_price`
                      : `products.${index}.sale_price`
                  }
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-[100px] font-mont input input-bordered input-xs rounded-sm"
                      type="text"
                      readOnly
                    />
                  )}
                />
              </td>
              <td>
                <Controller
                  control={control}
                  name={`products.${index}.quantity`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-[100px] font-mont input input-bordered input-xs rounded-sm"
                      type="number"
                    />
                  )}
                />
              </td>
              <td>
                <Controller
                  control={control}
                  name={`products.${index}.item_total`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-[100px] font-mont input input-bordered input-xs rounded-sm"
                      type="text"
                      readOnly
                    />
                  )}
                />
              </td>
              <td>
                <Controller
                  control={control}
                  name={`products.${index}.discount`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-[100px] font-mont input input-bordered input-xs rounded-sm"
                      type="number"
                    />
                  )}
                />
              </td>
              <td className="py-5">
                <Controller
                  control={control}
                  name={`products.${index}.total`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-[100px] font-mont input input-bordered input-xs rounded-sm"
                      type="text"
                      readOnly
                    />
                  )}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-error rounded-full"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <MdDelete className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full mt-5 flex justify-between">
        <button
          className="btn btn-sm btn-neutral font-mont"
          type="button"
          onClick={() => append({})}
        >
          Add Row <FaPlus />
        </button>

        <div className="flex flex-row-reverse gap-5">
          <button className="btn btn-outline btn-sm font-mont mt-10" disabled>
            Generate {mode === "purchase" ? "Purchase Order" : "Invoice"}
          </button>
          <button
            className="btn btn-outline btn-secondary btn-sm font-mont mt-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
      {/* <DevTool control={control} /> */}
    </form>
  );
};

export default DynamicForm;
