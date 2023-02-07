import { ConstanthPaths } from "../constants/constants"

export const getProductRoute = (product_name) => {
    return ConstanthPaths.PRODUCT_DETAIL.replace(":product_name", product_name.replaceAll(" ", "-"))
}