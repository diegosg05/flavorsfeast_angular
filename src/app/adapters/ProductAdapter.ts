import { Product } from "../models/Product";

export const ProductAdapter = (products: Product[]) => {
    let response: { category: string, products: Product[] }[] = [];
    let categoryName: string = "";
    let productsInSameCategory: Product[] = [];
    products.forEach((p) => {
        if (p.category.name === categoryName) {
            productsInSameCategory.push(p); // 2, 3, 4,5; 2,3,4
        } else {
            if (categoryName === "") {
                categoryName = p.category.name; //sabores costeños
                productsInSameCategory.push(p); //1
            } else {
                response.push({ category: categoryName, products: productsInSameCategory }); // guarda sabors costeós y 5 productos // guarda sierra y limpia y guarda 1 serlva
                categoryName = p.category.name; // sierra
                productsInSameCategory = []; // limpia
                productsInSameCategory.push(p); // 1
            }
        }
    });
    response.push({ category: categoryName, products: productsInSameCategory });
    return response;
}