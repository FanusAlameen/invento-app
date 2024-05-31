import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { utils, writeFile } from "xlsx";
import { CiViewList } from "react-icons/ci";
import { IoMdRefresh } from "react-icons/io";

const Table = ({ columns, componentData, filename, heading }) => {
  const [data, setData] = useState([]);

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    refreshData();
  }, [componentData]);

  const refreshData = useCallback(() => {
    const updatedData = componentData.map((row, index) => ({
      ...row,
      serialNumber: index + 1,
    }));
    setData(updatedData);
  }, [componentData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const exportToExcel = (data, fileName) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center mt-5 mb-10">
        <label className="input input-md input-bordered flex items-center gap-2">
          <CiSearch />
          <input
            type="text"
            placeholder="Search..."
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="font-mont"
          />
        </label>

        <div className="flex gap-5">
          <button className="btn btn-outline font-mont" onClick={refreshData}>
            <IoMdRefresh className="text-xl" />
          </button>
          <button
            className="btn btn-neutral font-mont"
            onClick={() => exportToExcel(data, filename)}
          >
            Export Table
          </button>
        </div>
      </div>

      {componentData.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <CiViewList className="text-secondary text-8xl" />
          <h1 className="font-mont text-base-content text-2xl">No {heading}</h1>
        </div>
      ) : (
        <table className="w-full bg-base-100 rounded-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="font-mont">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border-2 border-base-content"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-row items-center justify-center gap-3">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: <FaArrowUpLong />, desc: <FaArrowDownLong /> }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}

          <tbody className="w-full">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  index % 2 !== 0 ? "bg-neutral" : "bg-base-100"
                } font-mont text-sm text-base-content`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 border border-x-2 border-base-content text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="w-full flex flex-row-reverse gap-5 items-center justify-between mt-8">
        <div className="w-4/12 flex flex-row justify-between">
          <button
            className="btn btn-neutral font-mont"
            onClick={() => table.setPageIndex(0)}
          >
            First Page
          </button>
          <button
            className="btn btn-outline"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="btn btn-outline"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <IoIosArrowForward />
          </button>
          <button
            className="btn btn-outline font-mont"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last Page
          </button>
        </div>

        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="font-mont text-md">Page</p>
          <strong className="font-mont text-md">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </div>

        <div>
          <label
            htmlFor="page-number"
            className="font-mont font-semibold text-sm"
          >
            Go to Page:{" "}
          </label>
          <input
            id="page-number"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="input input-sm input-secondary font-mont"
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
