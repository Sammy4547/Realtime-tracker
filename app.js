const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port=3000

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine','ejs')

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');
  // Emit marker data
  socket.emit('markerData', { lat: 22.974418, lng: 72.617765, message: 'Hello, Leaflet!' });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/',(req,res)=>{
    res.render('index')
})
server.listen(port, () => {
  console.log(`Server running ${port}`);
});
