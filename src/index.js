/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
  async fetch(request, env) {
    // Initialize your KV Namespace
    const kvStore = env.data_test;

    // Insert a new key-value pair
    await kvStore.put("new_key", "new_value");

    // You can also retrieve values from the KV store
    const storedValue = await kvStore.get("new_key");
    const storedValue2 = await kvStore.get("chave");

    return new Response(JSON.stringify(storedValue2, null, 2), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  },
};
