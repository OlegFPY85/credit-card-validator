import luhnAlgorithm from './luhnAlgorithm.js';
import getPaymentSystem from './paymentSystem.js';

import visaImg from '../images/visa.png';
import mastercardImg from '../images/mastercard.png';
import mirImg from '../images/mir.png';
import amexImg from '../images/amex.png';
import discoverImg from '../images/discover.png';
import jcbImg from '../images/jcb.png';
import maestroImg from '../images/maestro.png';
import dinersImg from '../images/diners.png';

const paymentSystemImages = {
    'visa': visaImg,
    'mastercard': mastercardImg,
    'mir': mirImg,
    'amex': amexImg,
    'discover': discoverImg,
    'jcb': jcbImg,
    'maestro': maestroImg,
    'diners': dinersImg
};

function createCardLogos() {
    const container = document.getElementById('card-images-container');
    
    Object.entries(paymentSystemImages).forEach(([system, src]) => {
        const img = document.createElement('img');
        img.id = system;
        img.src = src;
        img.alt = system.toUpperCase();
        img.className = 'card-logo';
        container.appendChild(img);
    });
}

function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
}

function updateCardLogos(cardNumber) {
    const paymentSystem = getPaymentSystem(cardNumber);
    const logos = document.querySelectorAll('.card-logo');

    logos.forEach(logo => {
        logo.classList.remove('active');
    });
    
    if (paymentSystem) {
        const activeLogo = document.getElementById(paymentSystem);
        if (activeLogo) {
            activeLogo.classList.add('active');
        }
    }
}

function showMessage(message, isValid) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = isValid ? 'valid' : 'invalid';
}

function getPaymentSystemName(paymentSystem) {
    const names = {
        'visa': 'VISA',
        'mastercard': 'MasterCard',
        'mir': 'Mir',
        'amex': 'American Express',
        'discover': 'Discover',
        'jcb': 'JCB',
        'maestro': 'Maestro',
        'diners': 'Diners Club'
    };
    return names[paymentSystem] || paymentSystem;
}

function init() {

    createCardLogos();
    
    const cardNumberInput = document.getElementById('card-number');
    const validateButton = document.getElementById('validate-btn');
    
    cardNumberInput.addEventListener('input', (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        e.target.value = formattedValue;
        
        updateCardLogos(formattedValue);
 
        validateButton.disabled = formattedValue.replace(/\s/g, '').length === 0;
    });
    
    validateButton.addEventListener('click', () => {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        
        if (cardNumber.length < 13) {
            showMessage('Card number is too short', false);
            return;
        }
        
        const isValid = luhnAlgorithm(cardNumber);
        const paymentSystem = getPaymentSystem(cardNumber);
        
        if (isValid && paymentSystem) {
            const systemName = getPaymentSystemName(paymentSystem);
            showMessage(`Valid ${systemName} card number`, true);
        } else if (isValid) {
            showMessage('Valid card number (unknown payment system)', true);
        } else {
            showMessage('Invalid card number', false);
        }
    });
}

export default init;