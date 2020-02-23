require('dotenv').config();

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const puppeteer = require('puppeteer');
const Book = require('./models/book');

const $ = require('cheerio');
console.log(process.env.BOT_TOKEN);
const bot = new Telegraf(process.env.BOT_TOKEN);

const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
manager.load('src/model.nlp')

const NOSTARCH_URL = 'https://nostarch.com';

var admin = require("firebase-admin");

var serviceAccount = require("./firebase/tsundoku-fb.json");
 
admin.initializeApp({ 
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tsundoku-e48c6.firebaseio.com"
});

function writeBookData(book){
  console.log(book);
  database.ref('books/' + book.isbn).set(book);
}

var database = admin.database();

bot.use(session())

bot.start(async (ctx) => {
    ctx.session.browser = ctx.session.browser || await puppeteer.launch();
    ctx.reply('Welcome!')
});

bot.hears('hi', (ctx) => {
    ctx.session.heyCounter = ctx.session.heyCounter || 0
    ctx.session.heyCounter++;
    ctx.reply(`Hey there ${ctx.session.heyCounter}`);
});

const getBooksArray = (html, sectionId, tagName) => {
  let books = [];
  $(`#${sectionId} article`, html).each(function() {
    let title = $(this).find('h2').text();
    let imageUrl = $(this).find('img').attr('src');
    let desc = $(this).find('p').text();
    let pageUrl = NOSTARCH_URL + $(this).find('a').attr('href');
    let id = title.replace(/\s+/g, '-');
    books.push(new Book(id, title, desc, imageUrl, pageUrl, "NoStarchPress", tagName))
  });
  return books
}

const getSessionBrowser = (ctx) =>{
  return new Promise(async function(resolve, reject){
    ctx.session.browser = ctx.session.browser || await puppeteer.launch();
    resolve(ctx.session.browser);
  }).then((res)=>{
    return res.newPage();
  })
}

bot.command('nostarch', async (ctx) => {
    getSessionBrowser(ctx)
    .then(function(page) {
      return page.goto(NOSTARCH_URL).then(function() {
        return page.content();
      });
    })
    .then(function(html) {
      let books = [];
      books = getBooksArray(html, "block-views-frontpage-comingsoon-block-frontpage", "Coming Soon");
      books = [...books, ...getBooksArray(html, "block-views-frontpage-new-block-frontpage", "New!")];
      books.forEach(b=> writeBookData(b));
      ctx.reply(books.map(b=>b.title).join(", \n")||"No updates")
    })
    .catch(function(err) {
      console.log(err);
    });
})

bot.command('new', async (ctx) => {
  var leadsRef = database.ref('books');
  leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var book = childSnapshot.val();
      console.log(book);
      if(book.tag==="New!") {
        ctx.replyWithPhoto({ url: book.imageUrl },
        Extra.load({ caption: book.desc })
        .markdown()
        .markup((m) =>
          m.inlineKeyboard([
            Markup.urlButton('📚', book.pageUrl)
          ])
        ))
      }
    });
  });
})

bot.command('comingsoon', async (ctx) => {
  var leadsRef = database.ref('books');
  leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var book = childSnapshot.val();
      console.log(book);
      if(book.tag==="Coming Soon") {
        ctx.replyWithPhoto({ url: book.imageUrl },
        Extra.load({ caption: book.desc })
        .markdown()
        .markup((m) =>
          m.inlineKeyboard([
            Markup.urlButton('📚', book.pageUrl)
          ])
        ))
      }//ctx.telegram.sendPhoto(ctx.chat.id, book.imageUrl);
    });
  });
})

bot.on('message', async (ctx, message) => {
    console.log(ctx.message)
    const response = await manager.process('en', ctx.message.text || '');
    console.log(response);
    ctx.reply(response.answer || "I don't understand")
})

bot.launch();