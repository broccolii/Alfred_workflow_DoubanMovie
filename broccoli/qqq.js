/**
 * XadillaX created at 2015-02-12 12:41:10
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved
 */
require("sugar");
var AlfredItem = require("alfred-item");
var han = require("han");
var async = require("async");
var fs = require("fs-extra");
var cheerio = require('cheerio')
var https = require('https')
var request = require('request')
var querystring = require('querystring')

var _rawQuery;

function loadHTML(query) {
    var options = {
        hostname: 'www.douban.com',
        port: 443,
        path: '/search?cat=1002&q=' + query,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
            'Cache-Control': 'max-age=0',
            'Host': 'www.douban.com',
            'Proxy-Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
    }
    var req = https.request(options, function(res) {

        var html = ''
        res.on('data', function(chunk) {
            html += chunk
        })

        res.on('end', function() {

            filterSearchResult(html)
        })
    })

    req.on('error', function(error) {
        console.log('error: --- ' + error.message);
    })
    req.end()
}

function filterSearchResult(html) {
    var $ = cheerio.load(html)
    var searchResultList = $('.result')
    var item = new AlfredItem();
    searchResultList.each(function(resultItem) {
        // console.log('resultItem ' + resultItem);
        var searchResultItem = $(this)
        var movieTitle = searchResultItem.find('a').text()
        // console.log('movieTitle ' + movieTitle);
        var movieIntro = searchResultItem.find('.subject-cast').text()
        var movieStar = searchResultItem.find('.rating_nums').text()
        // 只能加一条数据进去
        item.addItem(0 + Math.random(), movieTitle, movieIntro, "icon.png");

    })
    console.log(item);
}


// loadHTML(encodeURIComponent('爱在黎明'))

module.exports = function(query) {
    _rawQuery = query;
    var rawQuery = query;
    var query = query.split(" ").compact(true);

    loadHTML(encodeURIComponent(query))
};
