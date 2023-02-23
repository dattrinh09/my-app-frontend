import { notification } from "antd"

export function showNotification(type, message, description) {
    notification.open({
        message: message,
        description: description,
        type: type,
        placement: "top",
        duration: 5
    })
}