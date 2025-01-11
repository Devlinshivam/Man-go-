const { Server } = require("socket.io");
const Chat = require("./Schema/chats");

function setupRealtimeChat(server) {

  const io = new Server(server, {
    cors: {
      origin:['http://localhost:3000', 'https://man-go.onrender.com'], 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("chatMessage", async (message) => {const { Server } = require("socket.io");
    const Chat = require("./Schema/chats");
    
    function setupRealtimeChat(server) {
    
      const io = new Server(server, {
        cors: {
          origin:['http://localhost:3000', 'https://man-go.onrender.com'], 
          methods: ["GET", "POST"],
        },
      });
    
      io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
    
        socket.on("chatMessage", async (message) => {
          const { sender, receiver, content } = message;
    
          try {
    
            let chatDocument = await Chat.findOne({
              $or: [
                { my_username: sender, your_username: receiver },
                { my_username: receiver, your_username: sender },
              ],
            });
    
            if (!chatDocument) {
              chatDocument = new Chat({
                my_username: sender,
                your_username: receiver,
                chats: [],
              });
            }
    
            chatDocument.chats.push({ sender, content });
            await chatDocument.save();
    
            io.emit("chatMessage", message); 
          } catch (error) {
            console.error("Error saving message:", error);
          }
        });
    
        socket.on("disconnect", () => {
          console.log("A user disconnected:", socket.id);
        });
      });
    
      return io;
    }
    
    module.exports = setupRealtimeChat;
    
      const { sender, receiver, content } = message;

      try {

        let chatDocument = await Chat.findOne({
          $or: [
            { my_username: sender, your_username: receiver },
            { my_username: receiver, your_username: sender },
          ],
        });

        if (!chatDocument) {
          chatDocument = new Chat({
            my_username: sender,
            your_username: receiver,
            chats: [],
          });
        }

        chatDocument.chats.push({ sender, content });
        await chatDocument.save();

        io.emit("chatMessage", message); 
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = setupRealtimeChat;
