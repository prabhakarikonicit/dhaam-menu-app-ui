// Type Definitions
export type Category = {
    name: string;
    description: string;
    product: string;
    image: File | null;
    isExpanded: boolean;
};

export type SubCategory = {
    name: string;
    description: string;
    product: string;
    image: File | null;
    isExpanded: boolean;
    subSubCategories?: SubSubCategory[];
};

export type SubSubCategory = {
    name: string;
    description: string;
    product: string;
    image: File | null;
    isExpanded: boolean;
};

// Default Values
export const defaultCategory: Category = {
    name: "",
    description: "",
    product: "",
    image: null,
    isExpanded: false,
};

export const defaultSubCategory: SubCategory = {
    name: "",
    description: "",
    product: "",
    image: null,
    isExpanded: false,
    subSubCategories: [],
};

export const defaultSubSubCategory: SubSubCategory = {
    name: "",
    description: "",
    product: "",
    image: null,
    isExpanded: false,
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
        };
        return this;
    }

    setSubSubCategory(subSubCategory: Partial<SubSubCategory> = {}) {
        const completeSubSubCategory = {
            ...defaultSubSubCategory,
            ...subSubCategory,
        };
        this.subSubCategoryDataList.push(completeSubSubCategory);
        return this;
    }

    build() {
        this.subCategoryData.subSubCategories = this.subSubCategoryDataList;

        return {
            id: this.id,
            ...this.categoryData,
            subCategories: [this.subCategoryData],
        };
    }

    getSubCategoryData() {
        return this.subCategoryData;
    }

    getSubSubCategoryData() {
        return this.subSubCategoryDataList;
    }
}

export default MakeCategoryObj;
