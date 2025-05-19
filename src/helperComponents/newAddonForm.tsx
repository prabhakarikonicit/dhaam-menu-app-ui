import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  FormEvent,
} from "react";
import { Trash2, Plus, Info, ChevronDown } from "lucide-react";
import InputText from "../sharedComponents/InputText";
import FileUpload from "../sharedComponents/fileUpload";
import SelectField from "../sharedComponents/selectField";
import ToggleSwitch from "../sharedComponents/ToggleSwitch";

// Define the handle type for exposing methods to parent components
export type AddOnFormHandle = {
  submit: () => void;
  reset: () => void;
  getData: () => any;
};

const NewAddOnForm = forwardRef<AddOnFormHandle>((props, ref) => {
  // Create ref for the form element
  const formRef = useRef<HTMLFormElement>(null);

  const [addOnName, setAddOnName] = useState("");
  const [selectionType, setSelectionType] = useState("single");
  const [mandatory, setMandatory] = useState(false);

  const [options, setOptions] = useState([
    { id: 1, name: "Option 1", price: "", enabled: false },
    { id: 2, name: "Option 2", price: "", enabled: false },
    { id: 3, name: "Option 3", price: "", enabled: false },
  ]);

  const [assignedProduct, setAssignedProduct] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Expose methods to parent components through the ref
  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current?.requestSubmit();
    },
    reset: () => {
      setAddOnName("");
      setSelectionType("single");
      setMandatory(false);
      setOptions([
        { id: 1, name: "Option 1", price: "", enabled: false },
        { id: 2, name: "Option 2", price: "", enabled: false },
        { id: 3, name: "Option 3", price: "", enabled: false },
      ]);
      setAssignedProduct("");
      setImageFile(null);
    },
    getData: () => {
      return {
        addOnName,
        selectionType,
        mandatory,
        options,
        assignedProduct,
        imageFile,
      };
    },
  }));

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Get all form data
    const formData = {
      addOnName,
      selectionType,
      mandatory,
      options,
      assignedProduct,
      imageFile,
    };

    console.log("Form submitted with data:", formData);

    // Here you would typically call a function passed in from props
    // to handle the submission in the parent component
  };

  const handleFileChange = (file: File) => {
    setImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  const updateOption = (id: number, field: string, value: string | boolean) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  const removeOption = (id: number) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  const addOption = () => {
    const newId = Math.max(...options.map((o) => o.id), 0) + 1;
    setOptions([
      ...options,
      { id: newId, name: `Option ${newId}`, price: "", enabled: false },
    ]);
  };

  return (
    <div className=" rounded-lg">
      <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
        {/* Add-On Name */}
        <div>
          <InputText
            label="Add-On Name"
            name="addOnName"
            value={addOnName}
            onChange={(e) => setAddOnName(e.target.value)}
            placeholder="Add-On name"
            error=""
            type="text"
            required
            disabled={false}
          />
        </div>

        {/* Selection Type */}
        <div className="flex items-center space-x-8 mt-4">
          <div className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full border ${
                selectionType === "single"
                  ? "border-bgButton flex items-center justify-center"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectionType("single")}
            >
              {selectionType === "single" && (
                <div className="w-4 h-4 rounded-full bg-bgButton"></div>
              )}
            </div>
            <span className="ml-2 text-lg text-textHeading">
              Single Selection
            </span>
          </div>

          <div className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full border ${
                selectionType === "multi"
                  ? "border-bgButton flex items-center justify-center"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectionType("multi")}
            >
              {selectionType === "multi" && (
                <div className="w-4 h-4 rounded-full bg-bgButton"></div>
              )}
            </div>
            <span className="ml-2 text-lg text-textHeading">
              Multi Selection
            </span>
          </div>
        </div>

        {/* Options */}
        {options.map((option, index) => (
          <div key={option.id} className="space-y-1">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-paragraphBlack">
                Options {option.id}
              </h3>
              <button type="button" className="ml-2">
                <Info size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <InputText
                name={`optionName${option.id}`}
                value={option.name}
                onChange={(e) =>
                  updateOption(option.id, "name", e.target.value)
                }
                placeholder={`Option ${option.id}`}
                type="text"
                disabled={false}
                className="grow"
              />
              <InputText
                name={`optionPrice${option.id}`}
                value={option.price}
                onChange={(e) =>
                  updateOption(option.id, "price", e.target.value)
                }
                placeholder="Price"
                type="text"
                disabled={false}
                className="w-52"
              />

              <ToggleSwitch
                checked={option.enabled}
                onChange={(checked) =>
                  updateOption(option.id, "enabled", checked)
                }
                id={`optionEnabled${option.id}`}
              />

              {index == options.length - 1 ? (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addOption}
                    className="flex items-center justify-center text-gray-400"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Mandatory Toggle */}
        <div className="flex items-center mt-4">
          <span className="text-lg font-medium text-gray-800 mr-4">
            One option is mandatory
          </span>
          <ToggleSwitch
            checked={mandatory}
            onChange={() => setMandatory(!mandatory)}
            id="mandatoryToggle"
          />
        </div>

        {/* Image Upload */}
        <FileUpload
          label="Choose a file or drag & drop your image here"
          fileName={imageFile ? imageFile.name : ""}
          onChange={handleFileChange}
          accept="image/*"
        />

        {/* Assign to Product */}
        <SelectField
          label="Assign to Product"
          name="assignedProduct"
          value={assignedProduct}
          onChange={(e) => setAssignedProduct(e.target.value)}
          options={[
            { value: "product1", label: "Product 1" },
            { value: "product2", label: "Product 2" },
            { value: "product3", label: "Product 3" },
          ]}
          placeholder="Select product"
          required={false}
          className="w-full"
        />
      </form>
    </div>
  );
});

export default NewAddOnForm;
