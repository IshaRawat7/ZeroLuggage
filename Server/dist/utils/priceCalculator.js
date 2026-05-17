"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLuggagePrice = void 0;
const calculateLuggagePrice = ({ width, height, depth, durationDays, }) => {
    const volume = width * height * depth;
    let basePrice = 0;
    let sizeCategory = "";
    if (volume <= 40000) {
        // Small luggage
        basePrice = 99;
        sizeCategory = "Small";
    }
    else if (volume <= 100000) {
        // Medium luggage
        basePrice = 199;
        sizeCategory = "Medium";
    }
    else {
        // Large luggage
        basePrice = 349;
        sizeCategory = "Large";
    }
    const dailyCharge = durationDays * 30;
    const total = basePrice +
        dailyCharge;
    return {
        sizeCategory,
        volume,
        breakdown: {
            basePrice,
            dailyCharge,
        },
        total,
    };
};
exports.calculateLuggagePrice = calculateLuggagePrice;
