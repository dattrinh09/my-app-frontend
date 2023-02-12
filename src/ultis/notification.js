import { notification } from "antd"

export function showNotification(type, message) {
    notification.open({
        message: message,
        type: type,
        duration: 3
    })
}