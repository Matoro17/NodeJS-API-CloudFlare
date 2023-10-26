# Cloudflare Workers To-Do App

A simple to-do app implemented using Cloudflare Workers.

## Project Structure

This project follows a structured architecture with separate route handlers. It uses Cloudflare Workers KV for data storage.

## Getting Started

1. Clone this repository:

   ```
   git clone https://github.com/Matoro17/NodeJS-API-CloudFlare.git
   

2. Install dependencies:

   ```bash
   cd NodeJS-API-CloudFlare
   npm install
   ```

3. Configure your Cloudflare Workers project in `wrangler.toml`:

   Replace `name` and other necessary settings.


4. Run the code locally:

   ```
   npm run start
   ```

5. Access your Cloudflare Worker by the specified URL.

## Usage

- `/add`: Add a new task via a POST request.
- `/update`: Update a task's completion status via a PUT request.
- `/delete`: Delete a task via a DELETE request.
- `/tasks`: Get the list of tasks (GET request).
