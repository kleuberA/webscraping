import puppeteer from "puppeteer";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getCriptomoedas = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
	});

	const page = await browser.newPage();

	await page.goto("https://br.financas.yahoo.com/criptomoedas", {
		waitUntil: "domcontentloaded",
	});

	const criptoList = await page.$$("tbody > tr");
	criptoList.map(async (cripto) => {
		const nome = await cripto.$eval(
			'[aria-label="Nome"]',
			(el) => el.innerText
		);
		const marketPrice = await cripto.$eval(
			'[data-field="regularMarketPrice"]',
			(el) => el.innerText
		);
		const alterar = await cripto.$eval(
			'[aria-label="Alterar"]',
			(el) => el.innerText
		);
		const porcentagemAlteracao = await cripto.$eval(
			'[aria-label="% Alteração"]',
			(el) => el.innerText
		);
		const capitalizacaoDeMercado = await cripto.$eval(
			'[aria-label="Capitalização de Mercado"]',
			(el) => el.innerText
		);
		const volumeEmMoedaDesdeMeiaNoite = await cripto.$eval(
			'[aria-label="Volume em moeda (desde 0:00 UTC)"]',
			(el) => el.innerText
		);
		const volumeEmMoeda24Horas = await cripto.$eval(
			'[aria-label="Volume em moeda (24h)"]',
			(el) => el.innerText
		);
		const dinheiroCirculante = await cripto.$eval(
			'[aria-label="Dinheiro circulante"]',
			(el) => el.innerText
		);

		const existingCripto = await prisma.cripto.findFirst({
			where: {
				nome,
			},
		});

		if (existingCripto) {
			return { ...existingCripto };
		}

		const criptoData = {
			nome,
			marketPrice,
			alterar,
			porcentagemAlteracao,
			capitalizacaoDeMercado,
			volumeEmMoedaDesdeMeiaNoite,
			volumeEmMoeda24Horas,
			dinheiroCirculante,
		};
		const createdCripto = await prisma.cripto.create({
			data: criptoData,
		});
		console.log(criptoData);
		return { ...criptoData, id: createdCripto };
	});
};

getCriptomoedas();
