import puppeteer from 'puppeteer';
import { sendMail } from './sendMail.js';

const url = 'https://www.lidl.co.uk';
const textStr = 'Flavour of the Week: Iberia';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto(url, { waitUntil: 'networkidle0' });

// Locate the full title with a unique string
const textSelector = await page.waitForSelector(
    `text/${textStr}`,
);

if (textSelector) {
    sendMail();
    console.log('Sucess');
} else {
    console.log(`Sorry did not find ${textStr}`);
}

await browser.close();