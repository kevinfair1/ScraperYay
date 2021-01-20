const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");

async function scrapeWebpage() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "http://appweb2.augustaga.gov/agendapublic/MeetingView.aspx?MeetingID=2306&MinutesMeetingID=2088"
    );

    let agendas = await page.evaluate(() => {
      let tableList = document
        .getElementById("pageViewMinutes")
        .getElementsByTagName("table");

      // let dataPlease = document
      //   .getElementById("pageViewMinutes")
      //   .getElementsByTagName("b");

      // let tableText = document
      //   .getElementById("pageViewMinutes")
      //   .getElementsByTagName("td");

      let tableArray = [];

      for (const item of tableList) {
        tableBody = item.getElementsByTagName("td");
        for (const data of tableBody) {
          if (data.innerText.trim() != "") {
            tableArray.push(
              data.innerText
                .replace(/\r?\n|\r/g, "")
                .replace(/\s+/g, " ")
                .trim()
            );
          }
        }
      }

      for (var i = tableArray.length - 1; i >= 0; i--) {
        if (tableArray[i].startsWith("Motions")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("Motion Type")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("Motion Text")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("Made By")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("Seconded By")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("Commissioner")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("Motion Result")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("ATTENDANCE:")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("INVOCATION:")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].startsWith("PLEDGE OF ALLEGIANCE")) {
          tableArray.splice(i, 1);
        } else if (tableArray[i].includes("minute time limit")) {
          tableArray.splice(i, 1);
        }
      }

      // let parsedArray = [];

      // for (let i = 0; i < tableArray.length; i++) {
      //   if (i === 0) {
      //     let dateString = tableArray[0].match(
      //       /\b(0?[1-9]|1[012])([\/\-])(0?[1-9]|[12]\d|3[01])\2(\d{4})/
      //     );
      //     parsedArray.push(dateString[0]);
      //   } else {
      //   }
      // }

      // return parsedArray;

      return tableArray;
    });

    //*[@id="pageViewMinutes"]/table[17]/tbody/tr[3]/td[2]/div/table/tbody/tr[2]/td[1]/b

    console.log(agendas);

    await browser.close();

    fs.writeFile("data.json", JSON.stringify(agendas), function (err) {
      if (err) throw err;
      console.log("Yay!");
    });
  } catch (err) {
    console.log(err);
  }
}

scrapeWebpage();
