// 'use strict'

// async function getUser(req, res) {
//   const user = await userDb.getUser(req.user)
//   res.send({ user })
// }

// // findAndModify({
// //   query: { mail },
// //   update: { $inc: { ...settings } },
// //   upsert: true,
// // })
// async function updateUser(req, res) {
//   const { settings } = req.body
//   userDb.updateUser(req.user, settings).catch((err) => {
//     console.log(err)
//   })
//   res.status(201).send()
// }

// module.exports = {
//   getUser,
//   updateUser,
// }
