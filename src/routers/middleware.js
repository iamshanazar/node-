import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
  const auth = req.headers?.authorization

  if (!auth) {
    res.status(401).send('Missing authorization header')
  } 
  try { 
    const token = auth.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    const userId = decodedToken.userId
    if (req.body.userId !== userId) {
      res.status(401).send('Invalid authorization header')
    } else {
      next()
    }
  } catch (err) {
    res.status(403).json({
      error: new Error('Invalid request!'),
      message: err.message,
    })
  }
}
