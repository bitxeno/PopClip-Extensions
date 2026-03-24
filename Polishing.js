// #popclip extension for OpenAI Compatible Polishing
// name: AI Polishing
// icon: "iconify:hugeicons:translation"
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey, label: API Key, type: string,
//   description: 'Enter your API key'
// },
// {
//   identifier: temperature, label: 'Temperature', type: string,
//   defaultValue: '0.7',
//   description: 'Sampling temperature (0-2, default: 0.7)'
// },
// {
//   identifier: baseuri, label: 'Base URI', type: string,
//   defaultValue: 'https://api.openai.com/v1',
//   description: 'API base URI including API version (default: https://api.openai.com/v1)'
// },
// {
//    identifier: model, label: 'Model', type: string,
//    defaultValue: 'gpt-4o-mini',
//    description: 'Enter model name (e.g. gpt-4o-mini, gpt-4o, deepseek-chat)'
//  }, {
//   identifier: roleprompt, label: 'Role Prompt', type: string,
//   defaultValue: "You are an expert translator, translate directly without explanation.",
//   description: 'System prompt for the AI'
// },{
//   identifier: userprompt, label: 'User Prompt', type: string,
//   defaultValue: "Please edit the following sentences in same language to improve clarity, conciseness, and coherence, making them match the expression of native speakers.",
//   description: 'User prompt template'
// }]

const axios = require("axios");

async function generateContent(input, options) {
  const requestBody = {
    "model": options.model,
    "messages": [
      { "role": "system", "content": options.roleprompt },
      { "role": "user", "content": options.userprompt + '\n\n' + input.text }
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
  title: "AI Polishing",
  after: "paste-result",
  code: async (input, options) => generateContent(input, options),
}];
