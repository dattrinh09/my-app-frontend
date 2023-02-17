export const formatPrice = price => {
    return (price).toLocaleString('vn-VN', {
        style: 'currency',
        currency: 'VND',
    })
}

export const formatDate = date => {
    return (new Date(date)).toLocaleString('vn-VN', {
        timeZone: 'UTC',
    })
}
