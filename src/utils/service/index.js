import axios from "axios";
import { load } from "cheerio";
import { launch } from "puppeteer";

export const scrapeServices = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await launch();
      const page = await browser.newPage();

      await page.goto(url);
      const baseName = url.split("//")[1];

      await page.screenshot({ path: `uploads/${baseName}.png` });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const html = await page.content();

      const $ = load(html);

      // Scrape the data
      const websiteData = {
        name: $("title").text(),
        description: $('meta[name="description"]').attr("content"),
        logo: $('link[rel="icon"]').attr("href"),
        facebook: $('a[href*="facebook.com"]').attr("href"),
        linkedin: $('a[href*="linkedin.com"]').attr("href"),
        twitter: $('a[href*="twitter.com"]').attr("href"),
        instagram: $('a[href*="instagram.com"]').attr("href"),
        address: $("address").text(),
        phone: $('a[href^="tel:"]').text(),
        email: $('a[href^="mailto:"]').text(),
        url,
        screenShot: `${baseName}.png`,
      };

      // Close the browser instance
      await browser.close();
      console.log("website data", websiteData);
      resolve(websiteData);
    } catch (error) {
      reject(null);
    }
  });
};
