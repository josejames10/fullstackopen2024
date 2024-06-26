const app = require('./app')
const config = require('./utils/config')
const { info } = require('./utils/logger')

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
