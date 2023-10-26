export async function handleUpdate(request, task_list, kvStore, url) {
    if (request.method !== 'PUT') {
        return new Response('Invalid request method', { status: 405 });
    }

    try {
        const taskId = parseInt(url.searchParams.get('id'))
        const isCompleted = url.searchParams.get('completed') === 'true'
        if (!isNaN(taskId) && taskId >= 0 && taskId < task_list.length) {
            task_list[taskId].completed = isCompleted
            await kvStore.put("task_list", JSON.stringify(task_list))
            return new Response('Task updated successfully', { status: 200 })
        } else {
            return new Response('Invalid task ID', { status: 400 })
        }
    } catch (error) {
        return new Response('An error occurred', { status: 500 });
    }
}
