# Scraper Frontend

A simple frontend to search Amazon products via a scraping API.

## Technologies

- Vite
- Vanilla JavaScript
- Pure HTML and CSS

## Requirements

- Node.js installed (version 14+ recommended)
- npm installed
- Backend API running locally at http://localhost:3000

## Installation

In the terminal, inside the frontend folder (`scraper-front`), run:

```bash
npm install
```

## Running locally

To start the development server with hot reload:

```bash
npm run dev
```

The frontend will be available at the default address, usually:

```
http://localhost:5173
```

## Functionality

- Input field to enter a search keyword.
- Button to initiate the search via API.
- Displays a list of products with title, rating, number of reviews, and image.
- Shows status and error messages to the user.

## API communication

Requests are made to `/api/scrape?keyword=yourTerm`, proxied via the `vite.config.js` proxy to `http://localhost:3000/api/scrape`.

## How to use

1. Enter a search keyword in the input field.
2. Click the "Search" button or press Enter.
3. View the formatted search results on the page.

## Error handling

- Shows a message if no results are found.
- Displays an error message if API communication fails.

## Customization

To change the API address or port, edit the proxy settings in `vite.config.js`.

---

If you want, I can help you create the README for the backend as well. Would you like that?
