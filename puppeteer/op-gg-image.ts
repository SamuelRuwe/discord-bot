import puppeteer from 'puppeteer/lib/cjs/puppeteer/node-puppeteer-core';

const opggURL = 'https://na.op.gg/summoner/userName=';
export const OPGGScreenshot = async (summonerName: string) => {
    const url = opggURL + summonerName;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-summary > div.RealContent > div > div.Content > div.GameItemList > div:nth-child(1) > div');
    const lastGame = await page.$('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-summary > div.RealContent > div > div.Content > div.GameItemList > div:nth-child(1) > div');
    if (!lastGame) return;
    await lastGame.screenshot({path: 'images/game.png'});
    await page.close();
    await browser.close();
}
