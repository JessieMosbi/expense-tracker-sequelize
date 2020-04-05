# Expense-Tracker-Sequelize
這是個簡易的記帳系統，用 [Node.js](https://nodejs.org/en/)、[Express](https://expressjs.com/)、[MySQL](https://www.mysql.com/)、[Sequelize](https://sequelize.org/) 所打造，使用者註冊並登入後，可自行新增、修改支出，並可依照類別進行篩選

![scrrenshot](https://github.com/JessieMosbi/expense-tracker/blob/master/screenshot.png?raw=true)

## Requirement
[Node.js](https://nodejs.org/en/)   
[MySQL](https://www.mysql.com/)

## Packages
此專案用到以下 JS library，可藉由 `npm install` 指令去安裝（請參考底下 Installing 步驟）   
[express](https://expressjs.com/)   
[express-handlebars](https://www.npmjs.com/package/express-handlebars)   
[body-parser](https://www.npmjs.com/package/body-parser)   
[method-override](https://www.npmjs.com/package/method-override)   
[mongoose](https://mongoosejs.com/)   
[express-session](https://www.npmjs.com/package/express-session)   
[passport](http://www.passportjs.org/)   
[passport-local](http://www.passportjs.org/packages/passport-local/)   
[passport-facebook](http://www.passportjs.org/packages/passport-facebook/)   
[bcryptjs](https://www.npmjs.com/package/bcryptjs)   
[connect-flash](https://www.npmjs.com/package/connect-flash)   
[dotenv](https://www.npmjs.com/package/dotenv)   
[mysql2](https://www.npmjs.com/package/mysql2)   
[sequelize](https://www.npmjs.com/package/sequelize)   
[sequelize-cli](https://www.npmjs.com/package/sequelize-cli)

***

## Installing
開啟終端機 (Terminal)，透過 `git clone` 指令將專案下載下來到本機端
```console
git clone https://github.com/JessieMosbi/expense-tracker-sequelize
```

進入 expense-tracker-sequelize 資料夾內，並檢查是否有 package.json 檔案
```console
cd expense-tracker-sequelize
```

執行 `npm install`，將專案所需套件下載下來
```console
npm install
```

## Setting
因此專案有結合 Facebook API，故需在 Facebook for developers 上設定一個應用程式，並把資訊填入 .env 檔才能正常啟用   
請建立一個 .env 檔案，填入以下資訊，並放在根目錄底下
```console
// .env
FACEBOOK_ID=xxxxxxxx
FACEBOOK_SECRET=xxxxxxxx
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

## Executing
請啟動 MySQL DB（下方圖片以 MAC OS 作為範例，綠燈表示為已啟動）
![scrrenshot](https://github.com/JessieMosbi/todo-sequelize/blob/master/image/MySQL_active.png?raw=true)

進到專案資料夾底下，建立專案所需資料庫 (注意: 若有相同名稱的資料庫將會被刪除)
```console
cd <Your download directory>/expense-tracker-sequelize
npx sequelize db:drop
npx sequelize db:create
```

執行 migrations 檔案，以建立專案所需資料表、欄位
```console
npx sequelize db:migrate
```

最後，以專案已設定的統一指令，即可執行專案
```console
npm run dev
```

預設 port 為 3000，請直接打開瀏覽器，並在 URL 輸入 http://localhost:3000/ 即可瀏覽網頁

## Other steps
MySQL DB 可透過 MySQLWorkbench 等 DBMS 工具，以 GUI 的形式進行操作，會較方便觀看資料

## Features
+ 註冊、登入（可用 Facebook 登入）
+ 首頁可一次瀏覽所有支出的清單，且可查看所有支出清單的總金額
+ 在首頁上方可選擇類別，選擇後底下的清單、總金額將會按照類別進行篩選與總計
+ 點選任一支出右方的的修改按鈕，可進入修改頁面，修改該支出資料
+ 點選任一支出右方的的刪除按鈕，可將該支出刪除
+ 點選首頁下方的新增按鈕，可進入新增頁面，新增一筆支出資料
