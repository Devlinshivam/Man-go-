const { Server } = require("socket.io");
const Chat = require("./Schema/chats");

function setupRealtimeChat(server) {
  // Create a Socket.IO server instance
  const io = new Server(server, {
    cors: {
      origin: "https://man-go.vercel.app", // Allow requests from your frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for 'chatMessage' events from clients
    socket.on("chatMessage", async (message) => {
      const { sender, receiver, content } = message;

      try {
        // Find or create the chat document between the sender and receiver
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

        // Add the new message to the chats array
        chatDocument.chats.push({ sender, content });
        await chatDocument.save();

        // Broadcast the message to the receiver (and sender)
        io.emit("chatMessage", message); // You can use specific room/socket for targeted delivery
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
