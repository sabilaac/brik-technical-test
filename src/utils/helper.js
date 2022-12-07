const uuid = require("uuid");

export const helper = {
    createSKU: () => {
        return (Math.random() + 1).toString(36).substring(5).toLocaleUpperCase();
    },
    UUID: () => {
        return uuid.v4();
    }
}