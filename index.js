import puppeteer from "puppeteer";

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
	let id = 0;

	while (existeProximaPagina) {
		const quoteList = await page.$$(".quote");

		quotes = [
			...quotes,
			...(await Promise.all(
				quoteList.map(async (quote) => {
					id++;
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
					const numeroAleatorio = Math.floor(Math.random() * 1000)
						.toString()
						.padStart(3, "0");
					const quoteId = `${numeroAleatorio}-${id}`;
					return { id: quoteId, text, author, tags };
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
};

getQuotes();
