import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

import { textStr } from './index.js';

const CLIENT_EMAIL_TO = process.env.CLIENT_EMAIL_TO;

const submitForm = async() => {
    const url = 'https://slackwise.org.uk/submit';

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: true,
        devtools: true,
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials'
        ]
    })
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(url, { waitUntil: 'networkidle0' });

    console.log(`Navigated to ${url}`);

    // fill in form
    await page.type('#actual_name', 'Luke Harby');
    await page.type('#email', CLIENT_EMAIL_TO);
    await page.type('#comments', `Successfully found the text: ${textStr}`);

    const findCaptcha = await page.evaluate(() => {
        return document.querySelectorAll('iframe').forEach(item => {
            const inputs = item.contentWindow.document.body.querySelectorAll('input');
            return console.log(`inputs: ${inputs}`);
        })
    });

    console.log(`findCaptcha: ${findCaptcha}`)

    // await page.click('#submit');

    await browser.close();
}

export {
    submitForm
}