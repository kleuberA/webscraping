import puppeteer from "puppeteer";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getQuotes = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
	});

	const page = await browser.newPage();

	await page.goto("http://quotes.toscrape.com/", {
		waitUntil: "domcontentloaded",
	});

	let existeProximaPagina = true;
	let quotes = [];

	while (existeProximaPagina) {
		const quoteList = await page.$$(".quote");

		quotes = [
			...quotes,
			...(await Promise.all(
				quoteList.map(async (quote) => {
					const text = await quote.$eval(
						".text",
						(el) => el.innerText
					);
					const author = await quote.$eval(
						".author",
						(el) => el.innerText
					);
					const tags = await quote.$$eval(".tags .tag", (tags) =>
						tags.map((tag) => tag.innerText)
					);

					const quoteData = {
						text,
						author,
						tags,
					};
					const createdQuote = await prisma.quote.create({
						data: quoteData,
					});

					return { ...quoteData, id: createdQuote.id };
				})
			)),
		];

		const nextButton = await page.$(".pager .next a");
		if (nextButton) {
			await nextButton.click();
			await page.waitForSelector(".quote");
		} else {
			existeProximaPagina = false;
		}
	}

	console.log(quotes);

	await browser.close();
	await prisma.$disconnect();
};

getQuotes();
