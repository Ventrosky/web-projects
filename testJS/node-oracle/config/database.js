module.exports = {
    gesPool: {
      user: process.env.GES_USER,
      password: process.env.GES_PASSWORD,
      connectString: process.env.GES_CONNECTIONSTRING,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
};