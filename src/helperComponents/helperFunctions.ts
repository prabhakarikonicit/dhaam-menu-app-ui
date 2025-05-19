import { Category, SubCategory, SubSubCategory, AddPayload, EditPayload, UpdateAction } from "../types";


export function updateCategory(
    parentId: string,
    action: UpdateAction,
    categoryArray: Category[],
    payload?: AddPayload | EditPayload
): Category[] {
    const deepCopy = JSON.parse(JSON.stringify(categoryArray)); // To avoid mutating original array

    const findAndUpdate = (items: any[]): boolean => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.id === parentId) {
                if (action === "add" && payload) {
                    const addPayload = payload as AddPayload;
                    if (addPayload.subCategory) {
                        item.subCategories = [...(item.subCategories || []), ...addPayload.subCategory];
                    }
                    if (addPayload.subSubCategory) {
                        if (item.subSubCategories) {
                            item.subSubCategories = [...item.subSubCategories, ...addPayload.subSubCategory];
                        } else if (item.subCategories) {
                            const lastSub = item.subCategories[item.subCategories.length - 1];
                            if (lastSub) {
                                lastSub.subSubCategories = [
                                    ...(lastSub.subSubCategories || []),
                                    ...addPayload.subSubCategory,
                                ];
                            }
                        }
                    }
                } else if (action === "delete") {
                    items.splice(i, 1);
                } else if (action === "edit" && payload) {
                    const editPayload = payload as EditPayload;
                    Object.assign(item, editPayload);
                }
                return true; // Operation done
            }

            if (item.subCategories && findAndUpdate(item.subCategories)) return true;
            if (item.subSubCategories && findAndUpdate(item.subSubCategories)) return true;
        }
        return false;
    };

    findAndUpdate(deepCopy);
    return deepCopy;
}
