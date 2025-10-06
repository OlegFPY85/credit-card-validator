import luhnAlgorithm from '../../src/js/luhnAlgorithm.js';

describe('Luhn Algorithm', () => {
    test('valid Visa card number', () => {
        expect(luhnAlgorithm('4111111111111111')).toBe(true);
    });
    
    test('valid MasterCard number', () => {
        expect(luhnAlgorithm('5555555555554444')).toBe(true);
    });
    
    test('valid American Express number', () => {
        expect(luhnAlgorithm('378282246310005')).toBe(true);
    });
    
    test('invalid card number', () => {
        expect(luhnAlgorithm('4111111111111112')).toBe(false);
    });
    
    test('empty string', () => {
        expect(luhnAlgorithm('')).toBe(false);
    });
    
    test('non-digit characters', () => {
        expect(luhnAlgorithm('4111-1111-1111-1111')).toBe(false);
    });
});