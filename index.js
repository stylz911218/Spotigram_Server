require('./config.js');
const express = require('express');

const userRouter = require('./routers/user.js');
const songRouter = require('./routers/song.js');
const playlistRouter = require('./routers/playlist.js');
const friendRouter = require('./routers/friend.js');
const errorHandler = require('./middleware/error-handler.js');
const accessController = require('./middleware/access-controller.js');

const app = express();

app.use(
  express.static('dist', {
    setHeaders: (res, path, stat) => {
      res.set('Cache-Control', 'public, s-maxage=86400');
    },
  })
);
app.use(accessController); // Allows cross-origin HTTP requests
app.use('/api/user', userRouter);
app.use('/api/song', songRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/friend', friendRouter);
// app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});
