require('dotenv').config();

const Telegraf = require('telegraf');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session');

const puppeteer = require('puppeteer');
/*
const browser = puppeteer.launch();
*/
const $ = require('cheerio');

const bot = new Telegraf(process.env.BOT_TOKEN);

const url = 'https://nostarch.com/';
/*
const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
  ]);
  */
bot.use(session())

bot.start(async (ctx) => {
    ctx.session.page = ctx.session.page || await browser.newPage();
    ctx.reply('Welcome!')
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => {
    ctx.session.heyCounter = ctx.session.heyCounter || 0
    ctx.session.heyCounter++;
    ctx.reply(`Hey there ${ctx.session.heyCounter}`);
});
//bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard)))
//bot.action('delete', ({ deleteMessage }) => deleteMessage())


bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.command('nostarch', async (ctx) => {
    /*
    rp(url)
    .then(function(html){
        console.log($('article > header > h2', html).length);
        //console.log(html);
    })
    .catch(function(err){
        console.log(err);
    });*/

    puppeteer
    .launch()
    .then(function(browser) {
      return browser.newPage();
    })
    .then(function(page) {
      return page.goto(url).then(function() {
        return page.content();
      });
    })
    .then(function(html) {
      let names = [];
      $('article > header > h2', html).each(function() {
        names.push($(this).text());
        console.log($(this).text());
      });
      ctx.reply(names.join(", ")||"No updates")
    })
    .catch(function(err) {
      console.log(err);
    });
})

bot.launch();