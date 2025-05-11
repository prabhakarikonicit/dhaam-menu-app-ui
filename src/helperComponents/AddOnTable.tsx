import { ChevronDown, MoreVertical } from "lucide-react";
import React from "react";
import { CategoryIcon } from "../assets/images/svgAssets";
import DataTable from "../sharedComponents/DataTable";
import ToggleSwitch from "../sharedComponents/ToggleSwitch";

const data = [
  {
    id: 1,
    title: "Extra Cheese",
    description: "Add a rich and creamy cheese layer to enhance flavor.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Single Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/cheese-image.jpg",
  },
  {
    id: 2,
    title: "Sauces & Dips",
    description: "Elevate your dish with flavorful dips and sauces.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Multi Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/sauces-image.jpg",
  },
  {
    id: 3,
    title: "Protein Boost",
    description: "Power up your meal with an extra dose of protein.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Single Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/protein-image.jpg",
  },
  {
    id: 4,
    title: "Bread Choice",
    description: "Choose your favorite type of bread for the perfect bite.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Single Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/bread-image.jpg",
  },
  {
    id: 5,
    title: "Sweeteners for Beverages",
    description: "Customize your drink with your preferred sweetener.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Multi Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/sweetener-image.jpg",
  },
  {
    id: 6,
    title: "Spice Level",
    description: "Adjust the heat of your dish to your taste preference.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Single Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/spice-image.jpg",
  },
  {
    id: 7,
    title: "Milk Alternatives",
    description: "Swap out regular milk for a dairy-free alternative.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Multi Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/milk-image.jpg",
  },
  {
    id: 8,
    title: "Toppings for Desserts",
    description: "Add a delicious finishing touch to your desserts.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Multi Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/toppings-image.jpg",
  },
  {
    id: 9,
    title: "Side Dishes",
    description: "Complement your meal with a tasty side dish.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Single Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/sides-image.jpg",
  },
  {
    id: 10,
    title: "Serving Size",
    description: "Choose the right portion to match your appetite.",
    assignedTo: "Farmhouse Pizza",
    moreProducts: "& 5 more products",
    type: "Multi Selection",
    dateAdded: "Mar 6, 2025",
    status: true,
    image: "/path/to/size-image.jpg",
  },
];
const columns = [
  {
    header: "Add-ons",
    accessor: "title",
    className: "pl-[5rem]",
    render: (row: any) => (
      <div className="flex items-center gap-3">
        {/* <div className="w-8 h-8 flex items-center justify-center">
          <img
            src={row.image}
            alt={row.title}
            className="w-6 h-6 object-contain"
          />
        </div> */}
        <CategoryIcon />
        <div className="flex flex-col">
          <span className="font-medium text-[14px] leading-tight">
            {row.title}
          </span>
          <span className="text-gray-500 text-[12px] leading-tight">
            {row.description}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Assigned to",
    accessor: "assignedTo",
    render: (row: any) => (
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[14px] leading-tight">{row.assignedTo}</span>
          <span className="text-gray-500 text-[12px] leading-tight">
            {row.moreProducts}
          </span>
        </div>
        <button className=" ">
          <ChevronDown size={18} />
        </button>
      </div>
    ),
  },
  {
    header: "Type",
    accessor: "type",
  },
  {
    header: "Date added",
    accessor: "dateAdded",
  },
  {
    header: "Status",
    accessor: "status",
    render: (row: any) => (
      <ToggleSwitch
        id={`toggle-${row.id}`}
        // checked={row.status}
        onChange={() => {}}
      />
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

const AddOnTable = () => {
  return <DataTable data={data} columns={columns} />;
};

export default AddOnTable;
