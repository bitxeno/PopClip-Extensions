// #popclip extension for OpenAI Compatible Translate
// name: AI Translate
// icon: "iconify:hugeicons:translation"
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey, label: API Key, type: string,
//   description: 'Enter your API key'
// },
// {
//   identifier: baseuri, label: 'Base URI', type: string,
//   defaultValue: 'https://api.openai.com/v1',
//   description: 'API base URI including API version (default: https://api.openai.com/v1)'
// },
// {
//    identifier: model, label: 'Model', type: string,
//    defaultValue: 'gpt-5.4-mini',
//    description: 'Enter model name (e.g. gpt-4o-mini, gpt-4o, deepseek-chat)'
//  }, {
//   identifier: prompt, label: 'Translate Prompt', type: string,
//   defaultValue: "I will give you text content, you will rewrite it and translate the text into {lang} language. Keep the meaning the same. Do not alter the original structure and formatting outlined in any way. Only give me the output and nothing else.Now, using the concepts above, translate the following text:{input}",
//   description: 'Enter the prompt template using {input} {lang} as a placeholder for the text'
// },{
//    identifier: tolang, label: 'Language', type: multiple,
//    values:['English','Chinese','Russian','French','Português','Spanish'],
//    description: 'The language to be translated'
// },
// {
//   identifier: temperature, label: 'Temperature', type: string,
//   defaultValue: '0.7',
//   description: 'Sampling temperature (0-2, default: 0.7)'
// }]

const axios = require("axios");

async function generateContent(input, options) {
  const prompt = options.prompt.replace('{input}', input.text).replace('{lang}', options.tolang);
  const requestBody = {
    "model": options.model,
    "messages": [
      { "role": "user", "content": prompt }
    ],
    "temperature": parseFloat(options.temperature) || 0.7,
    "max_tokens": 8192,
    "top_p": 0.95
  };

  try {
    const baseUrl = options.baseuri || 'https://api.openai.com/v1';
    const response = await axios.post(
      `${baseUrl}/chat/completions`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${options.apikey}`
        }
      }
    );

    const generatedText = response.data.choices[0].message.content;
    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error generating content: " + error.message;
  }
}

exports.actions = [{
  title: {"en": "AI Translate", "zh-hans": "AI 翻译"},
  after: "paste-result",
  code: async (input, options) => generateContent(input, options),
}];