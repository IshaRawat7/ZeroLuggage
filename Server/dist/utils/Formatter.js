"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatIndianPhone = void 0;
const formatIndianPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("91")) {
        return cleaned;
    }
    return `91${cleaned}`;
};
exports.formatIndianPhone = formatIndianPhone;
