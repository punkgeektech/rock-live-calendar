Installation:

In directory ./root:

- npm install
- node server.js

// 127.0.0.1:3001

In directory ./root/app:

- npm install
- npm start

// 127.0.0.1:3000

---------------------------

API:

127.0.0.1:3001/api
// (GET)display data fetched from calendar api

127.0.0.1:3001/api/fetch
// (GET)put fetched data into database as two collections: Bands & Lists

127.0.0.1:3001/api/bands
// (GET)list all bands with value

127.0.0.1:3001/api/lists
// (GET)all events data from database

127.0.0.1:3001/bands/:bands_name
// (GET)get one band info
// (PUT)update band value
