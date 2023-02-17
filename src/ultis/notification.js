import { notification } from "antd"

export function showNotification(type, message) {
    notification.open({
        message: message,
        type: type,
        placement: "top",
        duration: 3
    })
}