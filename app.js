#!/usr/bin/env node

const { loadDb } = require('./src/db.js');
const { searchBookmarks, presentResults, presentAlfredResults } = require('./src/search-bookmarks.js');

const args = process.argv.slice(2);
let searchTerm = args.join(' ').trim();
let isAlfred = false;

if (searchTerm === '') {
  console.error('Please specify a search term or --cache or --configure');
  process.exit(1);
}

loadDb()
  .then(() => {
    if (searchTerm.indexOf('--alfred') === 0) {
      isAlfred = true;
      searchTerm = searchTerm.replace('--alfred', '').trim();
    }

    return searchBookmarks(searchTerm).then((results) => {
      if (isAlfred) {
        return presentAlfredResults(results);
      }
      return presentResults(results, searchTerm);
    });
  })
  .catch((err) => {
    if (isAlfred) {
      console.log(JSON.stringify({ items: [{ title: err.title, subtitle: err.subtitle }] }));
    } else {
      console.error(err.message);
    }
    process.exit(1);
  });
