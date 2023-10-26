// src/routes/add.js

// Import any necessary utilities or dependencies here

// Export a function to handle the "add" route
export async function handleAdd(request, task_list, kvStore) {
    if (request.method !== 'POST') {
        return new Response('Invalid request method', { status: 405 });
    }

    try {
        const formData = await request.formData();
        const task = formData.get('task');
        if (!task) {
            return new Response('Task not provided', { status: 400 });
        }
        
        if (task) {
            task_list.push({ text: task, completed: false })
            await kvStore.put("task_list", JSON.stringify(task_list))
        }

        return new Response('Task added successfully', { status: 200 });
    } catch (error) {
        return new Response('An error occurred', { status: 500 });
    }
}
