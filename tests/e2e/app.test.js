describe('Credit Card Validator E2E Tests', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080');
    });
    
    test('should display the widget correctly', async () => {
        const pageContent = await page.content();
        expect(pageContent).toMatch('Credit Card Validator');
        expect(pageContent).toMatch('Click to Validate');
        
        const input = await page.$('#card-number');
        expect(input).not.toBeNull();
        
        const button = await page.$('#validate-btn');
        expect(button).not.toBeNull();
    });
    
    test('should validate Visa card correctly', async () => {

        await page.click('#card-number', { clickCount: 3 });
        await page.type('#card-number', '4929720154633260');

        await page.waitForFunction(() => {
            const visaLogo = document.getElementById('visa');
            return visaLogo && visaLogo.classList.contains('active');
        }, { timeout: 5000 });
        
        await page.click('#validate-btn');
        
        await page.waitForSelector('#message.valid', { timeout: 5000 });
        const message = await page.$eval('#message', el => el.textContent);
        expect(message).toContain('Valid');
    });
    
    test('should validate MasterCard correctly', async () => {
        await page.click('#card-number', { clickCount: 3 });
        await page.type('#card-number', '2221005500329063');

        await page.waitForFunction(() => {
            const logo = document.getElementById('mastercard');
            return logo && logo.classList.contains('active');
        }, { timeout: 5000 });
        
        const mastercardLogo = await page.$('#mastercard');
        const mastercardClass = await page.evaluate(el => el.className, mastercardLogo);
        expect(mastercardClass).toContain('active');
        
        await page.click('#validate-btn');
        
        await page.waitForSelector('#message.valid', { timeout: 5000 });
        const message = await page.$eval('#message', el => el.textContent);
        expect(message).toContain('Valid');
    });
    
    test('should validate JCB card correctly', async () => {
        await page.click('#card-number', { clickCount: 3 });
        await page.type('#card-number', '3537311731440969');
   
        await page.waitForFunction(() => {
            const logo = document.getElementById('jcb');
            return logo && logo.classList.contains('active');
        }, { timeout: 5000 });
        
        const jcbLogo = await page.$('#jcb');
        const jcbClass = await page.evaluate(el => el.className, jcbLogo);
        expect(jcbClass).toContain('active');
        
        await page.click('#validate-btn');
        
        await page.waitForSelector('#message.valid', { timeout: 5000 });
        const message = await page.$eval('#message', el => el.textContent);
        expect(message).toContain('Valid');
    });
    
    test('should validate Maestro card correctly', async () => {
        await page.click('#card-number', { clickCount: 3 });
        await page.type('#card-number', '5018737991875234');
 
        await page.waitForFunction(() => {
            const logo = document.getElementById('maestro');
            return logo && logo.classList.contains('active');
        }, { timeout: 5000 });
        
        const maestroLogo = await page.$('#maestro');
        const maestroClass = await page.evaluate(el => el.className, maestroLogo);
        expect(maestroClass).toContain('active');
        
        await page.click('#validate-btn');
        
        await page.waitForSelector('#message.valid', { timeout: 5000 });
        const message = await page.$eval('#message', el => el.textContent);
        expect(message).toContain('Valid');
    });
    
    test('should validate Diners Club card correctly', async () => {
        await page.click('#card-number', { clickCount: 3 });
        await page.type('#card-number', '5464910373641222');
        
        await page.waitForFunction(() => {
            const logo = document.getElementById('diners');
            return logo && logo.classList.contains('active');
        }, { timeout: 5000 });
        
        const dinersLogo = await page.$('#diners');
        const dinersClass = await page.evaluate(el => el.className, dinersLogo);
        expect(dinersClass).toContain('active');
        
        await page.click('#validate-btn');
        
        await page.waitForSelector('#message.valid', { timeout: 5000 });
        const message = await page.$eval('#message', el => el.textContent);
        expect(message).toContain('Valid');
    });
    
    test('should show error for invalid card', async () => {
        await page.click('#card-number', { clickCount: 3 });
        await page.type('#card-number', '4111111111111112');
        await page.click('#validate-btn');
        
        await page.waitForSelector('#message.invalid', { timeout: 5000 });
        const message = await page.$eval('#message', el => el.textContent);
        expect(message).toContain('Invalid');
    }, 10000); 
});