import { ConstanthPaths } from "../constanth/constanth.path"

export const getProductRoute = (id) => {
    return ConstanthPaths.PRODUCT_DETAIL.replace(":id", id)
}