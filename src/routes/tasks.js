export async function handleTasks(request, task_list) {
    if (request.method !== 'GET') {
        return new Response('Invalid request method', { status: 405 });
    }

    try {
        return new Response(JSON.stringify(task_list), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
          })
    } catch (error) {
        return new Response('An error occurred', { status: 500 });
    }
}
