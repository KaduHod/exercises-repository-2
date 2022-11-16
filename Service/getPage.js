import puppeteer from 'puppeteer';

export const getPage = async (url, handler) => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto(url,{
        waitUntil: 'load',
        timeout: 100000
    });
    const result = await page.evaluate(handler);
    console.log('terminei um')
    return result;
}





