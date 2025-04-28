// const express = require("express");
// const cors = require("cors");
// const { readdirSync } = require("fs");
// const { resolve } = require("path");
// const fs = require("fs");
// const path = require("path");
// const { Builder, By, until } = require("selenium-webdriver");
// const { Options } = require("selenium-webdriver/chrome");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const createDriver = async () => {
//   const options = new Options();
//   // options.addArguments("headless");
//   return await new Builder().forBrowser("chrome").setChromeOptions(options).build();
// };

// const waitFor = (driver, condition, timeout = 3000) => driver.wait(condition, timeout);
// const uploadWait = (driver, condition, timeout = 100000) => driver.wait(condition, timeout);

// const loginTest = async (driver, username, password) => {
//   const start = Date.now();
//   try {
//     await waitFor(driver, until.elementLocated(By.id("email"))).sendKeys(username);
//     await waitFor(driver, until.elementLocated(By.id("password"))).sendKeys(password);
//     await waitFor(driver, until.elementLocated(By.css(".mt-7"))).click();
//     await waitFor(driver, until.elementLocated(By.css('[alt="trueEyeLogo"]')));
//     return { name: "Login", status: "Pass", time: (Date.now() - start) / 1000 };
//   } catch (err) {
//     return { name: "Login", status: "Fail", error: err.message, time: (Date.now() - start) / 1000 };
//   }
// };

// const batchUploadTest = async (driver, testNumber) => {
//   const start = Date.now();
//   try {
//     await waitFor(driver, By.css(".text-white")).click();
//     await waitFor(driver, By.css("button:nth-child(3)")).click();

//     const fileInput = await waitFor(driver, By.id("file-input"));
//     const files = readdirSync("./test").filter(f => f.toLowerCase().endsWith(".jpg"));
//     for (const file of files) await fileInput.sendKeys(resolve("./test", file));

//     await driver.sleep(2000);
//     await waitFor(driver, By.css(".col-span-3:nth-child(1) .text-\\[16px\\]"))
//       .sendKeys(testNumber);
//     await waitFor(driver, By.xpath("//button[normalize-space()='Upload']")).click();
//     await waitFor(driver, By.xpath("//button[normalize-space()='Confirm']")).click();
//     await uploadWait(driver, By.xpath("//button[normalize-space()='View Report']")).click();
//     await waitFor(driver, By.css(".border-\\[\\#ddd\\]"))
//       .sendKeys(testNumber);
//     await waitFor(driver, By.css(".w-\\[156px\\]"))
//       .click();

//     return { name: "Batch Upload", status: "Pass", time: (Date.now() - start) / 1000 };
//   } catch (err) {
//     return { name: "Batch Upload", status: "Fail", error: err.message, time: (Date.now() - start) / 1000 };
//   }
// };

// // const singleUploadTest = async (driver, testNumber) => {
// //   const start = Date.now();
// //   try {
// //     await waitFor(driver, until.elementLocated(By.id("chanal"))).sendKeys(testNumber);
// //     return { name: "Single Upload", status: "Pass", time: (Date.now() - start) / 1000 };
// //   } catch (err) {
// //     return { name: "Single Upload", status: "Fail", error: err.message, time: (Date.now() - start) / 1000 };
// //   }
// // };
// const singleUploadTest = async (driver, testNumber) => {
//   const start = Date.now();
//   try {
//     const folderPath = "./test";
//     const pattern = /(\d+)_([^_]+)_Retina_(OD|OS)_(\d{8})/;
//     const files = {};

//     // Parse image files
//     for (const file of fs.readdirSync(folderPath)) {
//       const match = file.match(pattern);
//       if (match) {
//         const [, hn, fname, side, date] = match;
//         const key = `${hn}_${fname}_${date}`;
//         if (!files[key]) files[key] = { hn, fname, date, sides: {} };
//         files[key].sides[side] = path.resolve(folderPath, file);
//       }
//     }

//     let count = 0;
//     for (const key in files) {
//       const { hn, fname, date, sides } = files[key];
//       count++;

//       await waitFor(driver, until.elementLocated(By.css(".text-white"))).click();
//       await waitFor(driver, until.elementLocated(By.css(".h-\\[40px\\]:nth-child(4)"))).click();
//       await waitFor(driver, until.elementLocated(By.xpath("//div/input"))).sendKeys(testNumber);
//       await driver.findElement(By.xpath("//div[2]/input")).sendKeys(hn);
//       await driver.findElement(By.xpath("//div[3]/input")).sendKeys(fname);
//       await driver.findElement(By.xpath("//button[@type='button']")).click();
//       await driver.findElement(By.css(".text-\\[\\#fff\\]")).click();
//       await driver.findElement(By.css(".w-\\[90px\\]:nth-child(2)")).click();

//       // Select image type tab ERROR HERE
//       for (let i = 6; i >= 1; i--) {
//         try {
//           await driver.findElement(By.css(`.bg-white:nth-child(${i})`)).click();
//           break;
//         } catch (err) {
//           return {
//             name: "Single Upload",
//             status: "Fail",
//             error: err.message,
//             time: (Date.now() - start) / 1000
//           };
//         }
//       }

//       // Date handling
//       const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
//       const shortMonth = new Date(formattedDate).toLocaleString("en-US", { month: "short" });
//       await driver.findElement(By.id("datepicker")).click();
//       await driver.findElement(By.css("[data-test='year-toggle-overlay-0']")).click();
//       await driver.findElement(By.css(`[data-test='${date.slice(0, 4)}']`)).click();
//       await driver.findElement(By.css("[data-test='month-toggle-overlay-0']")).click();
//       await driver.findElement(By.css(`[data-test='${shortMonth}']`)).click();
//       await driver.findElement(By.xpath(`//div[@id='${formattedDate}']/div`)).click();
//       await driver.findElement(By.css(".dp__action_select")).click();

//       // Upload image files
//       if (sides.OD) await driver.findElement(By.id("dropzone-file2")).sendKeys(sides.OD);
//       if (sides.OS) await driver.findElement(By.id("dropzone-file")).sendKeys(sides.OS);

//       // Submit and confirm
//       await driver.findElement(By.css('button[type="submit"]')).click();
//       const confirmBtn = By.xpath("//div[@id='app']/div/div/div[2]/div/div[2]/div[4]/div[2]/div/button");
//       await uploadWait(driver, until.elementLocated(confirmBtn), 60000);
//       await driver.findElement(confirmBtn).click();

//       console.log(`✅ Upload Success: ${count} - ${hn} ${fname}`);
//     }

//     return {
//       name: "Single Upload",
//       status: "Pass",
//       time: (Date.now() - start) / 1000,
//       uploaded: Object.keys(files).length
//     };
//   } catch (err) {
//     return {
//       name: "Single Upload",
//       status: "Fail",
//       error: err.message,
//       time: (Date.now() - start) / 1000
//     };
//   }
// };

// app.post("/run-automation", async (req, res) => {
//   const { username, password, tests: requestedTests } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ error: "กรุณาระบุ Username และ Password" });

//   const driver = await createDriver();
//   const now = new Date();
//   const hhmm = now.getHours().toString().padStart(2, "0") + now.getMinutes().toString().padStart(2, "0");
//   const testNumber = `Automate_${now.toISOString().replace(/[:.-]/g, "").slice(0, 8)}_${hhmm}`;

//   const results = [];
//   try {
//     await driver.get("https://testtrueeye.southeastasia.cloudapp.azure.com/");

//     for (const test of requestedTests) {
//       if (test === "Login") results.push(await loginTest(driver, username, password));
//       if (test === "Batch Upload") results.push(await batchUploadTest(driver, testNumber));
//       if (test === "Single Upload") results.push(await singleUploadTest(driver, testNumber));
//     }
//   } catch (err) {
//     return res.status(500).json({ error: err.toString() });
//   } finally {
//     // await driver.quit();
//   }

//   res.json({ tests: results });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
