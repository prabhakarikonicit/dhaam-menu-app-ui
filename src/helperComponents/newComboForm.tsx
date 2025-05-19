import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  FormEvent,
} from "react";
import { Trash2 } from "lucide-react";
import InputText from "../sharedComponents/InputText";
import SelectField from "../sharedComponents/selectField";
import FileUpload from "../sharedComponents/fileUpload";

// Define the handle type for exposing methods to parent components
export type AddOnFormHandle = {
  submit: () => void;
  reset: () => void;
  getData: () => any;
};

const NewComboForm = forwardRef<AddOnFormHandle>((props, ref) => {
  // Create ref for the form element
  const formRef = useRef<HTMLFormElement>(null);

  const [comboName, setComboName] = useState("Biryani Feast");
  const [comboPrice, setComboPrice] = useState("$13.99");
  const [description, setDescription] = useState("");

  const [selectedProducts, setSelectedProducts] = useState([
    { id: 1, name: "Chicken Biryani" },
    { id: 2, name: "Raita" },
    { id: 3, name: "Salad" },
    { id: 4, name: "Gulab Jamun" },
  ]);

  const [productOptions] = useState([
    { id: 1, name: "Chicken Biryani" },
    { id: 2, name: "Raita" },
    { id: 3, name: "Salad" },
    { id: 4, name: "Gulab Jamun" },
    { id: 5, name: "Naan" },
    { id: 6, name: "Mango Lassi" },
  ]);

  const [selectedOption, setSelectedOption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Expose methods to parent components through the ref
  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current?.requestSubmit();
    },
    reset: () => {
      setComboName("");
      setComboPrice("");
      setDescription("");
      setSelectedProducts([]);
      setImageFile(null);
    },
    getData: () => {
      return {
        comboName,
        comboPrice,
        description,
        selectedProducts,
        imageFile,
      };
    },
  }));

  const removeProduct = (id: number) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  const addProduct = () => {
    if (!selectedOption) return;

    const productToAdd = productOptions.find(
      (product) => product.name === selectedOption
    );

    if (
      productToAdd &&
      !selectedProducts.some((p) => p.id === productToAdd.id)
    ) {
      setSelectedProducts([...selectedProducts, productToAdd]);
      setSelectedOption("");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    if (e.target.value) {
      addProduct();
    }
  };

  const handleFileChange = (file: File) => {
    setImageFile(file);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Get all form data
    const formData = {
      comboName,
      comboPrice,
      description,
      selectedProducts,
      imageFile,
    };

    console.log("Form submitted with data:", formData);

    // Here you would typically call a function passed in from props
    // to handle the submission in the parent component
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

  return (
    <div className=" rounded-lg ">
      <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
        <div className="flex gap-4">
          <div className="w-1/2">
            <InputText
              name="comboName"
              type="text"
              label="Combo Name"
              value={comboName}
              onChange={(e) => setComboName(e.target.value)}
              error=""
              required
              placeholder="Enter combo name"
              className=""
            />
          </div>

          <div className="w-1/2">
            <InputText
              name="comboPrice"
              type="text"
              label="Combo Price"
              value={comboPrice}
              onChange={(e) => setComboPrice(e.target.value)}
              error=""
              required
              placeholder="Enter combo price"
              className=""
            />
          </div>
        </div>

        <InputText
          name="description"
          type="text"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error=""
          required
          placeholder="Enter description"
          className=""
        />

        <SelectField
          label="Select Product"
          name="productSelect"
          value={selectedOption}
          onChange={handleSelectChange}
          options={productOptions.map((option) => ({
            value: option.name,
            label: option.name,
          }))}
          placeholder="Select"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selected Product
          </label>
          <div className="space-y-2">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md"
              >
                <span>{product.name}</span>
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FileUpload
          label="Choose a file or drag & drop your image here"
          fileName={imageFile ? imageFile.name : ""}
          onChange={handleFileChange}
          accept="image/*"
        />

        {/* Hidden submit button - form will be submitted via parent component */}
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </div>
  );
});

export default NewComboForm;
