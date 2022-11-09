const open = require('open');
const colors = require('colors');
const readline = require('readline');
const db = require('./db.js');
const path = require('path');
const { homedir } = require('os');
const { existsSync } = require('fs');

const MAX_RESULTS = 8;

function promptSpacing(number) {
  return new Array((number + '').length + 2).join(' ');
}

function cropText(text, length) {
  if (text.length < length) {
    return text;
  }
  return text.substring(0, length) + '...';
}

function searchBookmarks(searchTerm) {
  return db.client
    .all(
      `SELECT Z_PK, ZTEXT, ZNAME, ZIDENTIFIER FROM ZDOCUMENT WHERE
        ZTEXT LIKE ? OR
        ZNAME LIKE ? OR
        ZLINKTITLE LIKE ? OR
        ZLINKDESCRIPTION LIKE ?
        ORDER BY Z_PK DESC LIMIT ${MAX_RESULTS}`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`
    )
    .catch((err) => {
      const error = new Error(err.message);
      error.title = 'Database error';
      error.subtitle = err.message;
      throw error;
    });
}

function presentTerminalResults(results, searchTerm) {
  if (results.length === 0) {
    return console.log(`No results found for search "${searchTerm}"`);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let resultsPrompt = 'Found the following results:\n\n';
  let number = 1;
  let truncatedResults = false;

  if (results.length > MAX_RESULTS) {
    truncatedResults = true;
    results.splice(MAX_RESULTS, 99999);
  }

  // Build the output.
  results.forEach((link) => {
    // Link title
    resultsPrompt += `${colors.cyan(number)}. ${colors.green(cropText(link.ZNAME, 80))}\n`;
    // Link url
    resultsPrompt += `${promptSpacing(number)} ${colors.red('>')} ${colors.yellow(cropText(link.ZTEXT, 80))}\n`;
    resultsPrompt += '\n';
    number++;
  });

  if (truncatedResults) {
    resultsPrompt += `More than ${MAX_RESULTS} results found, showing the first ${MAX_RESULTS}\n\n`;
  }

  resultsPrompt += `${colors.inverse('Type number (q to exit)')} `;

  rl.question(resultsPrompt, (option) => {
    if (option === 'q') {
      process.exit(0);
    }
    option = option * 1;
    if (isNaN(option) || option > results.length || option < 1) {
      console.log('Invalid option');
      process.exit(0);
    }
    const linkToOpen = results[option - 1];
    open(linkToOpen.ZTEXT);
    process.exit(0);
  });
}

async function presentAlfredResults(results) {
  results.splice(MAX_RESULTS, 99999);

  const items = results.map((link) => {
    const url = link.ZTEXT;
    return {
      uid: link.Z_PK,
      title: link.ZNAME,
      subtitle: url,
      arg: url,
      icon: getLinkIcon(link),
      quicklookurl: url,
      text: {
        copy: url,
        largetype: link.ZNAME,
      },
    };
  });

  if (items.length === 0) {
    return console.log(
      JSON.stringify({
        items: [
          {
            title: 'No results found',
            subtitle: 'Please type something else',
          },
        ],
      })
    );
  }

  return console.log(JSON.stringify({ items }));
}

function getLinkIcon(link) {
  const pathName = path.resolve(
    homedir(),
    'Library/Containers/cc.anybox.Anybox/Data/Library/Caches/Documents/',
    link.ZIDENTIFIER,
    'favicon.png'
  );
  return existsSync(pathName) ? { path: pathName } : undefined;
}

module.exports = {
  searchBookmarks,
  presentTerminalResults,
  presentAlfredResults,
};
