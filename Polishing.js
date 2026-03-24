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
//   identifier: prompt, label: 'Polishing Prompt', type: string,
//   defaultValue: "You are an expert translator, translate directly without explanation.\n\nPlease edit the following sentences in same language to improve clarity, conciseness, and coherence, making them match the expression of native speakers.\n\n{input}",
//   description: 'Enter the prompt template using {input} as a placeholder for the text'
// }]

const axios = require("axios");

async function generateContent(input, options) {
  const prompt = options.prompt.replace('{input}', input.text);
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
  title: "AI Polishing",
  after: "paste-result",
  code: async (input, options) => generateContent(input, options),
}];
