module.exports = {
    gesPool: {
      user: process.env.GES_USER,
      password: process.env.GES_PASSWORD,
      connectString: process.env.GES_CONNECTIONSTRING,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0,
      poolAlias: "GES"
    },
    cfgPool: {
      user: process.env.CFG_USER,
      password: process.env.CFG_PASSWORD,
      connectString: process.env.CFG_CONNECTIONSTRING,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0,
      poolAlias: "CFG"
    }
};