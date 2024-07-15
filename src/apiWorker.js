/* eslint-disable no-restricted-globals */

self.addEventListener('message', async (event) => {
  const { currentAssistant, chatMessages, inputValue } = event.data;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": currentAssistant.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        system: currentAssistant.prompt,
        messages: [
          ...chatMessages.map((msg) => ({
            role: msg.sender,
            content: msg.text,
          })),
          { role: "user", content: inputValue },
        ],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    self.postMessage({ success: true, data });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
});

/* eslint-enable no-restricted-globals */
