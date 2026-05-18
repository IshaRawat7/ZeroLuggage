"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePricing = void 0;
const calculatePricing = ({ width, height, depth, distance = 0, priority = false, }) => {
    /* ---------------- VOLUME ---------------- */
    const volume = (width * height * depth) / 1000;
    /* ---------------- CATEGORY ---------------- */
    let category = "Small";
    if (volume >= 40 && volume < 80) {
        category = "Medium";
    }
    if (volume >= 80) {
        category = "Large";
    }
    /* ---------------- PRICING ---------------- */
    const baseFare = 10;
    const volumeRate = 1.5;
    const distanceRate = 5;
    const urgencyFee = priority ? 150 : 0;
    const totalCost = baseFare +
        volume * volumeRate +
        distance * distanceRate +
        urgencyFee;
    return {
        volume,
        category,
        baseFare,
        volumeRate,
        distance,
        distanceRate,
        urgencyFee,
        totalCost: Math.round(totalCost),
    };
};
exports.calculatePricing = calculatePricing;
