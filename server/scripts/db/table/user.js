const Table = require('./table')

class UserDb extends Table {
  constructor(db) {
    super(db, 'users')
  }

  updateUser(mail, settings) {
    return this.table().findAndModify({
      query: { mail },
      update: { $inc: { ...settings } },
      upsert: true,
    })
  }
}

module.exports = UserDb
