import { Category, SubCategory, SubSubCategory } from "../types";

// Default Values
export const defaultCategory: Category = {
    name: "",
    description: "",
    product: "",
    image: null,
    isExpanded: false,
};

export const defaultSubCategory: SubCategory = {
    id: "",
    name: "",
    description: "",
    product: "",
    image: null,
    isExpanded: false,
    subSubCategories: [],
};

export const defaultSubSubCategory: SubSubCategory = {
    id: "",
    name: "",
    description: "",
    product: "",
    image: null,
    isExpanded: false,
    products: []
};

// Class Builder
class MakeCategoryObj {
    private id: string;
    private categoryData: Category = { ...defaultCategory };
    private subCategoryData: SubCategory = { ...defaultSubCategory };
    private subSubCategoryDataList: SubSubCategory[] = [];

    constructor(id: string) {
        this.id = id;
    }

    setCategory(category: Partial<Category> = {}) {
        this.categoryData = { ...defaultCategory, ...category };
        return this;
    }

    setSubCategory(subCategory: Partial<SubCategory> = {}) {
        this.subCategoryData = {
            ...defaultSubCategory,
            ...subCategory,
            subSubCategories: [],
            id: this.id + "_sub_" + Math.random().toString(36).substring(2, 15),
        };
        return this;
    }

    setSubSubCategory(subSubCategory: Partial<SubSubCategory> = {}) {
        const completeSubSubCategory = {
            ...defaultSubSubCategory,
            ...subSubCategory,
            id: this.id + "_subSub_" + Math.random().toString(36).substring(2, 15),
        };
        this.subSubCategoryDataList.push(completeSubSubCategory);
        return this;
    }

    build() {
        this.subCategoryData.subSubCategories = this.subSubCategoryDataList;
        let buildObj = {
            id: this.id,
            ...this.categoryData,
            subCategories: this.subCategoryData.name.length > 0 ? [this.subCategoryData] : []
        }

        return buildObj;
    }

    getSubCategoryData() {
        return this.subCategoryData;
    }

    getSubSubCategoryData() {
        return this.subSubCategoryDataList;
    }
}

export default MakeCategoryObj;
