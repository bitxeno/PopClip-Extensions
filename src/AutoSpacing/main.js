"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;

const pangu = require('./pangu.min.js');

const format = async (input, options) => {
    const text = pangu.spacing(input.text);
    popclip.pasteText(text);
    return null;
};


// export the actions
exports.actions = [{
    title: {
        "en": "Auto Spacing",
        "zh-Hans": "自动添加空格",
        "zh-Hant": "自動添加空格",
        "ja": "自動空白"
    },
    icon: "fluent--font-space.svg",
    code: format,
}];