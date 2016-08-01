var AlfredItem = require("alfred-item");
var _rawQuery;

function outputWait() {
    var item = new AlfredItem();
    item.addItem(0 + Math.random(), "测试", "asdf", "icon.png");
}

module.exports = function(query) {
    // return outputWait()
    var item = new AlfredItem();
    item.addItem(0 + Math.random(), "测试", "asdf", "icon.png");
    return console.log(item);
};
