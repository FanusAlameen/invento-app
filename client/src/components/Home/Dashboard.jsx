import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../slices/api/dashboardSlice";
import Cards from "../reusables/Cards";
import { AiOutlineDollar } from "react-icons/ai";
import { GiMoneyStack, GiHandTruck } from "react-icons/gi";
import { FaMoneyBills, FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BiError } from "react-icons/bi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <BiError className="text-5xl text-error" />
        <h1 className="font-mont text-xl">{error}</h1>
      </div>
    );
  }

  const cardContents = [
    {
      id: 1,
      heading: "Purchases",
      number: data.purchases ? data.purchases[0].total_purchase : "N/A",
      icon: <AiOutlineDollar className="text-5xl" />,
    },
    {
      id: 2,
      heading: "Sales",
      number: data.sales ? data.sales[0].total_sales : "N/A",
      icon: <GiMoneyStack className="text-5xl" />,
    },
    {
      id: 3,
      heading: "Purchase Orders",
      number: data.purchaseOrders
        ? data.purchaseOrders[0].total_purchase_orders
        : "N/A",
      icon: <FaMoneyBills className="text-5xl" />,
    },
    {
      id: 4,
      heading: "Sale Orders",
      number: data.saleOrders ? data.saleOrders[0].total_sale_order : "N/A",
      icon: <FaMoneyBillTrendUp className="text-5xl" />,
    },
    {
      id: 5,
      heading: "Suppliers",
      number: data.suppliers ? data.suppliers[0].total_suppliers : "N/A",
      icon: <GiHandTruck className="text-5xl" />,
    },
    {
      id: 6,
      heading: "Clients",
      number: data.clients ? data.clients[0].total_clients : "N/A",
      icon: <FaUsers className="text-5xl" />,
    },
    {
      id: 7,
      heading: "Inventory",
      number: data.inventory ? data.inventory[0].total_inventory_items : "N/A",
      icon: <MdInventory className="text-5xl" />,
    },
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-mont font-bold">Dashboard</h1>
      </header>

      <hr className="border border-neutral" />

      <div className="w-full flex flex-wrap gap-10 mt-8">
        {cardContents.map((content) => (
          <Cards
            key={content.id}
            heading={content.heading}
            number={content.number}
            icon={content.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
