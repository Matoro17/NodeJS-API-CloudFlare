/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
const uuid = require("uuid")

export default {
  async fetch(request, env) {
    const kvStore = env.data_test
    const TASKS = await kvStore.get("task_list")
    if (TASKS == null){
      await kvStore.put("task_list", JSON.stringify([]))
    }

    let task_list = JSON.parse(TASKS)

    const url = new URL(request.url)
    const path = url.pathname

    if (path.startsWith('/add')) {
      const formData = await request.formData()
      const task = await formData.get('task')
      if (task) {
        task_list.push({ text: task, completed: false })
        await kvStore.put("task_list", JSON.stringify(task_list))
      }
      return new Response('Task added successfully', { status: 200 })
    } else if (path.startsWith('/update')) {
      const taskId = parseInt(url.searchParams.get('id'))
      const isCompleted = url.searchParams.get('completed') === 'true'

      if (!isNaN(taskId) && taskId >= 0 && taskId < TASKS.length) {
        task_list[taskId].completed = isCompleted
        await kvStore.put("task_list", JSON.stringify(task_list))
        return new Response('Task updated successfully', { status: 200 })
      } else {
        return new Response('Invalid task ID', { status: 400 })
      }
    } else if (path.startsWith('/delete')) {
      const taskId = parseInt(url.searchParams.get('id'))

      if (!isNaN(taskId) && taskId >= 0 && taskId < TASKS.length) {
        task_list.splice(taskId, 1)
        await kvStore.put("task_list", JSON.stringify(task_list))
        return new Response('Task deleted successfully', { status: 200 })
      } else {
        return new Response('Invalid task ID', { status: 400 })
      }
    } else if (path.startsWith('/tasks')) {
      return new Response(JSON.stringify(task_list), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      const response = new Response('Not Found', { status: 404 })
      return response
    }
  },
}

