const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="pageViewMinutes"]/table[12]');
    const txt = await el.getProperty("tbody");
    const txtData = await txt.jsonValue();

    console.log(txtData);
  } catch (err) {
    console.log(err);
  }
}

scrapeProduct(
  "http://appweb2.augustaga.gov/agendapublic/MeetingView.aspx?MeetingID=2320&MinutesMeetingID=2092"
);

//*[@id="pageViewMinutes"]/table[12]/tbody/tr[4]/td[2]/div/table/tbody/tr[2]/td[1]/b

//*[@id="pageViewMinutes"]/table[12]
