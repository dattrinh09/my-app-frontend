import { ConstanthPaths } from "../constants/constants"

export const getProducRoute = (product_name) => {
    return ConstanthPaths.PRODUCT_DETAIL.replace(":product_name", product_name.replaceAll(" ", "-"))
}

export const getProductByBrandRoute = (brand_name) => {
    return ConstanthPaths.PRODUCT_BRAND.replace(":brand_name", brand_name)
}

export const getProductByPriceRoute = (price) => {
    return ConstanthPaths.PRODUCT_PRICE.replace(":price", price)
}

export const getProductByBrandAndPriceRoute = (brand_name, price) => {
    return ConstanthPaths.PRODUCT_BRAND_PRICE.replace(":brand_name", brand_name).replace(":price", price)
}

export const getProductBySearch = (keyword) => {
    return ConstanthPaths.PRODUCT_SEARCH.replace(":keyword", keyword.replaceAll(" ","-"))
}