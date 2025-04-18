import puppeteer from 'puppeteer';
import { submitForm } from './submitForm.js';

const url = 'https://www.lidl.co.uk';
// const textStr = 'Flavour of the Week: Italy';
const textStr = 'Great deals at your local store!'

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto(url, { waitUntil: 'networkidle2' });

console.log(`Navigated to ${url}`);

// Locate the full title with a unique string
const textSelector = await page.waitForSelector(
    `text/${textStr}`,
);

if (textSelector) {
    submitForm();
    console.log(`Success, found the text "${textStr}"`);
} else {
    console.log(`Sorry did not find ${textStr}`);
}

await browser.close();

export {
    textStr
}