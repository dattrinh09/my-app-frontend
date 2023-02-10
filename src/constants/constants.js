export const ConstanthPaths = {
    HOME_PAGE: "/",
    SIGN_IN: "/xac-thuc/dang-nhap",
    SIGN_UP: "/xac-thuc/dang-ky",
    PRODUCT_LIST: "/san-pham",
    PRODUCT_BRAND: "/san-pham/hang-san-xuat/:brand_name",
    PRODUCT_PRICE: "/san-pham/gia-tien/:price",
    PRODUCT_BRAND_PRICE: "/san-pham/hang-san-xuat/:brand_name/?gia-tien=:price",
    PRODUCT_DETAIL: "/san-pham/:product_name",
    ADMIN_SIGN_IN: "/quan-ly/sign-in",
    ADMIN_PRODUCT: "/quan-ly/san-pham",
    ADMIN_BRAND: "/quan-ly/hang-san-xuat",
    ADMIN_USER: "/quan-ly/nguoi-dung",
    ADMIN_COMMENT: "/quan-ly/binh-luan",
    ADMIN_ORDER: "/quan-ly/don-hang",
};

export const FilterPrice = [
    {
        key: '1',
        value: 'duoi-2-trieu',
        label: 'Dưới 2 triệu'
    },
    {
        key: '2',
        value: '2-4-trieu',
        label: 'Từ 2 đến 4 triệu'
    },
    {
        key: '3',
        value: '4-7-trieu',
        label: 'Từ 4 đến 7 triệu'
    },
    {
        key: '4',
        value: '7-14-trieu',
        label: 'Từ 7 đến 14 triệu'
    },
    {
        key: '5',
        value: 'tren-14-trieu',
        label: 'Trên 14 triệu'
    }
]