import puppeteer from 'puppeteer';

export const getPage = async (url, handler) => {
    const browser = await puppeteer.launch({headless:0});
    const page = await browser.newPage();
    // await page.setDefaultNavigationTimeout(100000);
    await page.goto(url,{
        waitUntil: 'load',
        // Remove the timeout
        timeout: 100000
    });
    const result = await page.evaluate(handler);
    console.log('terminei um')
    return result;
}





