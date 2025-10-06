const getPaymentSystem = require('../../src/js/paymentSystem.js').default;

describe('Payment System Detection', () => {
    test('detects Visa', () => {
        expect(getPaymentSystem('4111111111111111')).toBe('visa');
        expect(getPaymentSystem('4929720154633260')).toBe('visa');
        expect(getPaymentSystem('4929384606397337')).toBe('visa');
        expect(getPaymentSystem('4556980124243145975')).toBe('visa');
    });
    
    test('detects MasterCard', () => {
        // MasterCard с префиксами 51-53
        expect(getPaymentSystem('5131064946328751')).toBe('mastercard');
        expect(getPaymentSystem('5268049715708619')).toBe('mastercard');
        // MasterCard с префиксами 2221-2720
        expect(getPaymentSystem('2221005500329063')).toBe('mastercard');
        expect(getPaymentSystem('2221123456789010')).toBe('mastercard');
        expect(getPaymentSystem('2720123456789010')).toBe('mastercard');
    });
    
    test('detects Mir', () => {
        expect(getPaymentSystem('2200123456789010')).toBe('mir');
        expect(getPaymentSystem('2204999999999999')).toBe('mir');
        // Карты за пределами Mir (2205-2220) не относятся ни к одной известной системе
        expect(getPaymentSystem('2205123456789010')).toBe(null);
        expect(getPaymentSystem('2220123456789010')).toBe(null);
    });
    
    test('detects American Express', () => {
        expect(getPaymentSystem('378282246310005')).toBe('amex');
        expect(getPaymentSystem('371175719580293')).toBe('amex');
        expect(getPaymentSystem('375334200350619')).toBe('amex');
        expect(getPaymentSystem('371247975155308')).toBe('amex');
    });
    
    test('detects Discover', () => {
        expect(getPaymentSystem('6011111111111117')).toBe('discover');
        expect(getPaymentSystem('6011223789411875')).toBe('discover');
        expect(getPaymentSystem('6011444365099526')).toBe('discover');
        expect(getPaymentSystem('6011893477566067246')).toBe('discover');
    });
    
    test('detects JCB', () => {
        expect(getPaymentSystem('3537311731440969')).toBe('jcb');
        expect(getPaymentSystem('3538763749467047')).toBe('jcb');
        expect(getPaymentSystem('3532054192711021484')).toBe('jcb');
    });
    
    test('detects Maestro', () => {
        expect(getPaymentSystem('5018737991875234')).toBe('maestro');
        expect(getPaymentSystem('6763989153944309')).toBe('maestro');
        expect(getPaymentSystem('6761931799719671')).toBe('maestro');
    });
    
    test('detects Diners Club', () => {
        // Diners Club - North America (54,55)
        expect(getPaymentSystem('5464910373641222')).toBe('diners');
        expect(getPaymentSystem('5557106990628688')).toBe('diners');
        
        // Diners Club - Carte Blanche (300-305)
        expect(getPaymentSystem('30270498563934')).toBe('diners');
        expect(getPaymentSystem('30385335203047')).toBe('diners');
        expect(getPaymentSystem('30022949506503')).toBe('diners');
        
        // Diners Club - International (36)
        expect(getPaymentSystem('36164217770199')).toBe('diners');
        expect(getPaymentSystem('36304316979495')).toBe('diners');
        expect(getPaymentSystem('36129440321219')).toBe('diners');
    });
    
    test('returns null for unknown systems', () => {
        expect(getPaymentSystem('1234567890123456')).toBe(null);
        expect(getPaymentSystem('2205123456789010')).toBe(null);
        expect(getPaymentSystem('2220123456789010')).toBe(null);
    });
});