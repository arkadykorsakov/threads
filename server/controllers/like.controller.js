const { prisma } = require('../prisma/prisma-client')

const LikeController = {
  likePost: async (req, res) => {
    const { postId } = req.body
    const userId = req.user.userId

    if (!postId) {
      return res.status(422).json({
        error: 'Все поля обязательны'
      })
    }

    try {
      const existingLike = await prisma.like.findFirst({
        where: { postId, userId }
      })
      if (existingLike) {
        return res.status(409).json({ error: 'Такой лайк уже есть' })
      }
      const like = await prisma.like.create({
        data: { postId, userId }
      })
      res.json(like)
    } catch (e) {
      console.error('Error like post', e)
      res.status(500).json({ error: e })
    }
  },
  unlikePost: async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId
    if (!id) {
      return res.status(400).json({
        error: 'Вы уже удалили лайк'
      })
    }
    try {
      const existingLike = await prisma.like.findFirst({
        where: { postId: id, userId }
      })
      if (!existingLike) {
        return res.status(404).json({ error: 'Такого лайка нет' })
      }
      const like = await prisma.like.deleteMany({
        where: { postId: id, userId }
      })
      res.json(like)
    } catch (e) {
      console.error('Error unlike post', e)
      res.status(500).json({ error: e })
    }
  }
}

module.exports = LikeController
