"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;

// identifier: xyz.phpz.popclip.extension.openaipolisher
const axios = require("axios");

// the main chat action
const chat = async (input, options) => {
    const api = options['api_url'];
    const api_key = options['api_key'];
    let prompt = `请描述可能是什么，请按照json格式回答，key值有Maybe和Desc，Maybe回答他最可能是的东西（要求精确些），Desc回答这个东西的描述`;
    if (util.localeInfo.languageCode != 'zh') {
        prompt = `What is it might be? please answer in JSON format with key values of 'Maybe' and 'Desc'. 
        'Maybe' should provide the most likely thing it is (be more precise), 
        while 'Desc' should describe what this thing is.`
    }
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
        let whatJson = JSON.parse(targetTxt);
        
        popclip.showText(whatJson.Desc);
        return null;
    } catch (err) {
        popclip.showText(`接口请求出错`);
        return null;
    }
};


// export the actions
exports.actions = [{
    title: {
        "en": "What is it?",
        "zh-Hans": "这是什么？",
        "zh-Hant": "這是什麼？",
        "ja": "どういうことですか？"
    },
    icon: "iconify:simple-icons:askubuntu",
    code: chat,
}];