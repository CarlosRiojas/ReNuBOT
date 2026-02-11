module.exports = {
  technology: [
    'https://feeds.arstechnica.com/arstechnica/index',
    'https://www.theverge.com/rss/index.xml'
  ],
  ai: [
    'https://openai.com/blog/rss/',
    'https://www.technologyreview.com/feed/'
  ],
  world: [
    'https://rss.cnn.com/rss/edition_world.rss',
    'https://feeds.bbci.co.uk/news/world/rss.xml'
  ],
  business: [
    'https://feeds.bbci.co.uk/news/business/rss.xml'
  ],
  science: [
    'https://www.sciencedaily.com/rss/all.xml'
  ]
};

function normalizeTopic(topic) {
  const t = topic.toLowerCase();

  if (t.includes('ai')) return 'ai';
  if (t.includes('tech')) return 'technology';
  if (t.includes('science')) return 'science';
  if (t.includes('business')) return 'business';
  if (t.includes('world')) return 'world';

  return null;
}
