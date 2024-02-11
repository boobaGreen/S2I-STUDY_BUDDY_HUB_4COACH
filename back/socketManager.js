// socketManager.js
const socketIo = require('socket.io');

const Group = require('./models/groupModel');

let io;

function initializeSocket(server) {
  if (process.env.NODE_ENV === 'production') {
    io = socketIo(server, {
      cors: {
        origin: `${process.env.FRONT_SITE_WEB}`,
        methods: ['GET', 'POST'],
      },
    });
  }
  if (process.env.NODE_ENV === 'development') {
    io = socketIo(server, {
      cors: {
        origin: `${process.env.FRONT_SITE_LOCAL}`,
        methods: ['GET', 'POST'],
      },
    });
  }
  io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
      socket.join(data);
    });

    socket.on('send_message', async (data) => {
      // Creating newdata
      const newdata = {
        message: data.message,
        user: data.user,
        date: data.date,
      };

      // Update the groupModel with the new chat message
      try {
        // eslint-disable-next-line no-unused-vars
        const group = await Group.findOneAndUpdate(
          { _id: data.room },
          { $push: { chat: newdata } },
          { new: true },
        );

        socket.to(data.room).emit('receive_message', newdata);
      } catch (error) {
        console.error('Error updating groupModel:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected', socket.id);
    });
  });
}

function getIo() {
  return io;
}

module.exports = { initializeSocket, getIo };
