const puppeteer = require("puppeteer");
const chalk = require("chalk");

async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "http://appweb2.augustaga.gov/agendapublic/MeetingView.aspx?MeetingID=2320&MinutesMeetingID=2092"
    );

    const agendas = await page.evaluate(() => {
      const grabFromRow = (row, classname) =>
        row.getElementByTagName(`td.${classname}`).innerText.trim();

      const ROW_SELECTOR = "tr";

      const data = [];

      const rowsSelect = document
        .getElementById("pageViewMinutes")
        .getElementsByTagName("table");

      for (const tr of rowsSelect) {
        data.push({
          1: grabFromRow(td, "test1"),
          2: grabFromRow(td, "test2"),
          3: grabFromRow(td, "test3"),
          4: grabFromRow(td, "test4"),
          5: grabFromRow(td, "test5"),
        });
      }
      return data;
    });
    await browser.close();
  } catch (err) {
    console.log(err);
  }

  console.log(JSON.stringify(agendas, null, 2));
};
