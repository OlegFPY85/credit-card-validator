function getPaymentSystem(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    // Проверяем платежные системы в порядке специфичности
    
    // Mir: начинается с 2200-2204
    if (/^220[0-4]/.test(cleanNumber)) {
        return 'mir';
    }
    
    // MasterCard: начинается с 2221-2720 (должно быть перед другими системами с 2)
    if (/^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-2][0-9])/.test(cleanNumber)) {
        return 'mastercard';
    }
    
    // Diners Club - International: начинается с 36
    if (/^36/.test(cleanNumber)) {
        return 'diners';
    }
    
    // Diners Club - Carte Blanche: начинается с 300-305
    if (/^30[0-5]/.test(cleanNumber)) {
        return 'diners';
    }
    
    // American Express: начинается с 34 или 37
    if (/^3[47]/.test(cleanNumber)) {
        return 'amex';
    }
    
    // JCB: начинается с 3528-3589
    if (/^35(2[8-9]|[3-8][0-9])/.test(cleanNumber)) {
        return 'jcb';
    }
    
    // Discover: начинается с 6011, 65, или 644-649
    if (/^6011/.test(cleanNumber) || /^65/.test(cleanNumber) || /^64[4-9]/.test(cleanNumber)) {
        return 'discover';
    }
    
    // Maestro: начинается с 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763
    if (/^(5018|5020|5038|5893|6304|6759|6761|6762|6763)/.test(cleanNumber)) {
        return 'maestro';
    }
    
    // Visa: начинается с 4
    if (/^4/.test(cleanNumber)) {
        return 'visa';
    }
    
    // MasterCard: начинается с 51-53 (но не 54-55, которые относятся к Diners Club)
    if (/^5[1-3]/.test(cleanNumber)) {
        return 'mastercard';
    }
    
    // Diners Club - North America: начинается с 54, 55
    if (/^5[4-5]/.test(cleanNumber)) {
        return 'diners';
    }
    
    return null;
}

export default getPaymentSystem;