/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { handleAdd } from './routes/add';
import { handleUpdate } from './routes/update';
import { handleDelete } from './routes/delete';
import { handleTasks } from './routes/tasks';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const kvStore = env.data_test

    const TASKS = await kvStore.get("task_list")
    if (TASKS == null){
      await kvStore.put("task_list", JSON.stringify([]))
    }
    let task_list = JSON.parse(TASKS)

    if (path.startsWith('/add')) {
      return await handleAdd(request, task_list, kvStore);
    } else if (path.startsWith('/update')) {
      return handleUpdate(request, task_list, kvStore, url);
    } else if (path.startsWith('/delete')) {
      return handleDelete(request, task_list, kvStore, url);
    } else if (path.startsWith('/tasks')) {
      return handleTasks(request, task_list, kvStore);
    }

    return new Response('Not Found', { status: 404 });
  }

}

