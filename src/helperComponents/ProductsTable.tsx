import { MoreVertical } from "lucide-react";
import React from "react";
import { CategoryIcon } from "../assets/images/svgAssets";
import DataTable from "../sharedComponents/DataTable";

const data = [
  {
    id: 1,
    title: "Espresso",
    description: "Strong and bold shot of pure coffee essence",
    date: "Mar 6, 2025",
    price: "$3.99",
    image: "https://source.unsplash.com/50x50/?espresso",
  },
  {
    id: 2,
    title: "Cappuccino",
    description: "Creamy espresso with steamed milk and froth",
    date: "Mar 6, 2025",
    price: "$4.49",
    image: "https://source.unsplash.com/50x50/?cappuccino",
  },
  {
    id: 3,
    title: "Latte",
    description: "Smooth espresso mixed with silky steamed milk",
    date: "Mar 6, 2025",
    price: "$4.99",
    image: "https://source.unsplash.com/50x50/?latte",
  },
  {
    id: 4,
    title: "Mocha",
    description: "Espresso blended with chocolate and steamed milk",
    date: "Mar 6, 2025",
    price: "$5.29",
    image: "https://source.unsplash.com/50x50/?mocha",
  },
  {
    id: 5,
    title: "Caramel Macchiato",
    description: "Layered espresso with caramel and milk foam",
    date: "Mar 6, 2025",
    price: "$5.49",
    image: "https://source.unsplash.com/50x50/?caramel-macchiato",
  },
  {
    id: 6,
    title: "Americano",
    description: "Espresso diluted with hot water for a smooth taste",
    date: "Mar 6, 2025",
    price: "$3.99",
    image: "https://source.unsplash.com/50x50/?americano",
  },
];
const columns = [
  {
    header: "File name",
    accessor: "title",
    className: "pl-[5rem]",
    render: (row: any) => (
      <div className="flex items-center gap-3">
        <CategoryIcon />
        <div className="flex flex-col">
          <span className="font-medium truncate text-[12px] font-500 leading-tight">
            {row.title}
          </span>
          <span className="text-cardTitle truncate text-[11px] font-400 leading-tight">
            {row.description}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Date added",
    accessor: "date",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Status",
    accessor: "status",
    render: () => (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
      </label>
    ),
  },
  {
    header: "Action",
    accessor: "action",
    render: () => (
      <button className="text-gray-500 hover:text-gray-700 float-right">
        <MoreVertical size={20} />
      </button>
    ),
  },
];

const ProductsTable = () => {
  return <DataTable data={data} columns={columns} />;
};

export default ProductsTable;
