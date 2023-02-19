export const ConstanthPaths = {
    HOME_PAGE: "/",
    SIGN_IN: "/xac-thuc/dang-nhap",
    SIGN_UP: "/xac-thuc/dang-ky",
    PRODUCT_LIST: "/san-pham",
    PRODUCT_SEARCH: "/san-pham/tim-kiem/:keyword",
    PRODUCT_BRAND: "/san-pham/hang-san-xuat/:brand_name",
    PRODUCT_PRICE: "/san-pham/gia-tien/:price",
    PRODUCT_BRAND_PRICE: "/san-pham/hang-san-xuat/:brand_name?gia-tien=:price",
    PRODUCT_DETAIL: "/san-pham/:product_name",
    ORDER: "/lich-su-mua-hang",
    ADMIN_SIGN_IN: "/quan-ly/sign-in",
    ADMIN_PRODUCT: "/quan-ly/san-pham",
    ADMIN_BRAND: "/quan-ly/hang-san-xuat",
    ADMIN_USER: "/quan-ly/nguoi-dung",
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

export const OrderStatus = [
    {
        key: '0',
        color: 'orange',
        value: 0,
        title: 'Chờ xác nhận'
    },
    {
        key: '1',
        color: 'blue',
        value: 1,
        title: 'Đang giao'
    },
    {
        key: '2',
        color: 'green',
        value: 2,
        title: 'Đã nhận'
    },
    {
        key: '3',
        color: 'red',
        value: 3,
        title: 'Đã hủy'
    }
]