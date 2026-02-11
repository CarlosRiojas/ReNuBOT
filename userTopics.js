const userData = {};

module.exports = {
  setTopics(userId, topics) {
    userData[userId] = {
      topics: topics.slice(0, 3),
      lastTopicIndex: 0,
      active: false
    };
  },

  start(userId) {
    if (userData[userId]) {
      userData[userId].active = true;
    }
  },

  stop(userId) {
    if (userData[userId]) {
      userData[userId].active = false;
    }
  },


  getAllUsers() {
    return userData;
  },

  getNextTopic(userId) {
    const user = userData[userId];
    if (!user || !user.active || user.topics.length === 0) return null;

    const topic = user.topics[user.lastTopicIndex];
    user.lastTopicIndex =
      (user.lastTopicIndex + 1) % user.topics.length;

    return topic;
  }
};
