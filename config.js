// Централизованные константы для финансовых расчетов
window.FLAX_DEFAULTS = {
    unit: { 
        buy: 550,      // Закупка в Казахстане €/т
        log: 110,      // Логистика и таможня €/т
        other: 0,      // Прочие расходы €/т (по умолчанию 0)
        sell: 790      // Продажа в Польше €/т
    },
    insurancePer100t: 700,  // Страхование на 100 т
    taxDefault: 0.09,       // Налог по умолчанию (9% CIT)
    batchSize: 100          // Размер партии по умолчанию
};

// Пароль для доступа (UX gating only)
window.__PW = "flax2025";

// Функция для расчета ROI
window.calculateROI = function(purchase, logistics, other, selling, batch, insurance, tax) {
    const unitCost = purchase + logistics + other;
    const unitMargin = selling - unitCost;
    const grossProfit = unitMargin * batch;
    const insuranceCost = (insurance ? window.FLAX_DEFAULTS.insurancePer100t : 0) * (batch / 100);
    const operatingProfit = grossProfit - insuranceCost;
    const netProfit = operatingProfit * (1 - tax);
    const cashOut = unitCost * batch;
    const roi = cashOut > 0 ? (netProfit / cashOut) * 100 : 0;
    
    return {
        grossProfit: grossProfit,
        operatingProfit: operatingProfit,
        netProfit: netProfit,
        roi: roi,
        cashOut: cashOut
    };
};
