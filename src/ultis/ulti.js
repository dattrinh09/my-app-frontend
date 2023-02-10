export const formatPrice = price => {
    return (price).toLocaleString('vn-VN', {
        style: 'currency',
        currency: 'VND',
    })
}

// export const filterBrand 

// export const getFilterList = (list, brand, price) => {
//     let newList = []
//     if(brand !== "ALL" && price !== "ALL") {
//         newList = list.filter(item => item.brand.brand_name === brand)
//         switch (price) {
//             case "duoi-2-trieu":
//                 newList.filter(item => item.price < 2000000)
//         }
//     }
// }