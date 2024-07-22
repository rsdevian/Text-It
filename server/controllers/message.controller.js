import Conversation from "../models/conversation.model.js";
import Messsage from "../models/message.model.js"
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"
export async function sendMessage(req,res) {
    try{
        const { message } = req.body;
        const {id : recieverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
            })
        }

        const newMessage = new Messsage({
            senderId,
            recieverId, 
            message
        }) 

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch(error) {
        console.log("Error: "+ error.message);
        res.status(500).json({error: "Internal Server Error" + error.message});
    }
}

export async function getMessages(req,res) {
    try{
        const {id : userToChatId} = req.params;
        const senderId = req.user.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        
        if (!conversation) {
            return res.status(200).json([])
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch(error) {
        console.log("Error: "+ error.message);
        res.status(500).json({error: "Internal Server Error: " + error.message});
    }
}
