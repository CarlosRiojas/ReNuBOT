const Parser = require('rss-parser');
const parser = new Parser();
const rssSources = require('./rssSources');

function normalizeTopic(topic) {
  return topic.toLowerCase().trim();
}

function getGoogleNewsRSS(topic) {
  const q = encodeURIComponent(topic);
  return `https://news.google.com/rss/search?q=${q}`;
}

function getNitterRSS(topic) {
  const q = encodeURIComponent(topic);
  return `https://nitter.net/search/rss?f=tweets&q=${q}`;
}

async function fetchRelevantArticles(topic, limit = 5) {
  const normalized = normalizeTopic(topic);

  let feeds = [];

  // curated feeds first
  if (rssSources[normalized]) {
    feeds = feeds.concat(rssSources[normalized]);
  }

  //generic fallback feeds
  feeds.push(getGoogleNewsRSS(topic));
  feeds.push(getNitterRSS(topic));

  const results = [];

  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);

      for (const item of feed.items) {
        if (item.link) {
          results.push({
            title: item.title,
            link: item.link,
            source: feed.title || 'RSS'
          });

          if (results.length >= limit) {
            return results;
          }
        }
      }
    } catch (err) {
      console.warn(`RSS fetch failed: ${feedUrl}`);
    }
  }

  return results;
}

module.exports = { fetchRelevantArticles };


