import { MoreVertical } from "lucide-react";
import React from "react";
import { CategoryIcon } from "../assets/images/svgAssets";

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

const ProductsTable = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left text-[12px] overflow-hidden truncate font-inter leading-tight">
        <thead className="text-xs ">
          <tr className="text-headding-color bg-background-grey">
            <th className="p-4">
              <input type="checkbox" className="w-4 h-4" />
            </th>
            <th className="p-4 pl-[5rem] font-[600]">File name</th>
            <th className="p-4 font-[600]">Date added</th>
            <th className="p-4 font-[600]">Price</th>
            <th className="p-4 font-[600]">Status</th>
            <th className="p-4 font-[600]">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-background-grey">
              <td className="p-4">
                <input type="checkbox" className="w-4 h-4" />
              </td>
              <td className="flex items-center gap-3 p-4">
                {/* <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 rounded object-cover"
                /> */}
                <CategoryIcon />
                <div className="flex flex-col">
                  <span className="font-medium overflow-hidden text-[cardValue] truncate text-[12px] font-500 leading-tight">
                    {item.title}
                  </span>
                  <span className="text-cardTitle overflow-hidden truncate font-inter text-[11px] font-400 leading-tight">
                    {item.description}
                  </span>
                </div>
              </td>
              <td className="p-4 font-medium">{item.date}</td>
              <td className="p-4 font-medium">{item.price}</td>
              <td className="p-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </td>
              <td className="p-4 text-right">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
