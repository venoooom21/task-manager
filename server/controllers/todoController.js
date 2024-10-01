import todo from "../models/todo.js";
import todo from "../models/todo.js";
import todo from "../models/todo.js";
import User from "../models/user.js";
export const createTodo = async (req, res) => {
    try {
    
        const { title, stage, deadline, priority} = req.body;
        const todo = await todo.create({
            title,
            stage: stage.toLowerCase(),
            deadline,
            priority: priority.toLowerCase(),
            
          });
      
    
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }}
// fazet trash
    export const trashTask = async (req, res) => {
        try {
          const { id } = req.params;
      
          const todo = await todo.findById(id);
      
          task.isTrashed = true;
      
          await todo.save();
      
          res.status(200).json({
            status: true,
            message: `Todo trashed successfully.`,
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ status: false, message: error.message });
        }
      };
      export const deleteRestoreTodo = async (req, res) => {
        try {
          const { id } = req.params;
          const { actionType } = req.query;
      
          if (actionType === "delete") {
            await todo.findByIdAndDelete(id);
          } else if (actionType === "deleteAll") {
            await todo.deleteMany({ isTrashed: true });
          } else if (actionType === "restore") {
            const resp = await todo.findById(id);
      
            resp.isTrashed = false;
            resp.save();
          } else if (actionType === "restoreAll") {
            await todo.updateMany(
              { isTrashed: true },
              { $set: { isTrashed: false } }
            );
          }
      
          res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ status: false, message: error.message });
        }
      };

