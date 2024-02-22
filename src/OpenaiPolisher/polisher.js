"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;

// identifier: xyz.phpz.popclip.extension.openaipolisher
const axios = require("axios");

// the main chat action
const chat = async (input, options) => {
    const api = options['api_url'];
    const api_key = options['api_key'];
    let prompt = "请用对应语言润色此句";
    // send the whole message history to OpenAI
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`,
        };
        let resp = await axios.post(api + '/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            temperature: 0,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 1,
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: input.text }
            ]
        }, {
            headers: headers
          });
        if (!resp.data || !resp.data.choices || resp.data.choices.length === 0) {
            popclip.showText(`接口未返回结果`);
            return null;
        }

        let targetTxt = resp.data.choices[0].message.content.trim();
        // if holding shift, copy just the response. else, paste the last input and response.
        popclip.showText(targetTxt);
        popclip.copyText(targetTxt);
        return null;
    } catch (err) {
        popclip.showText(`接口请求出错`);
        return null;
    }
};


// export the actions
exports.actions = [{
    title: {
        "en": "Polish Text",
        "zh-Hans": "文本润色",
        "zh-Hant": "文本潤色",
        "ja": "文章を装飾する"
    },
    icon: "wand.svg",
    code: chat,
}];