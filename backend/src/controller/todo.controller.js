import Todo from "../models/todo.model.js";

export const createTodo= async (req,res)=>{
    const {title}= req.body;
    try{
        const todo= await Todo.create({title})
        res.status(200).json(todo)
    }catch(error){
        console.log("Error creating Todo",error);
        return res.status(500),json("Internal server error");
    }
}

export const getAllTodos= async (req,res)=>{
    try{
        const todos =await Todo.find()
        if(!todos|| todos.length===0)
            {
                return res.status(404).json("no todos found")
            }
            res.status(200).json(todos)

    }catch(error){
        console.log("Error creating Todo",error);
        return res.status(500),json("Internal server error");
    }
}

export const deleteTodoById= async(req,res)=>{
    const {id}=req.params
    try {
        const todo = await Todo.findByIdAndDelete(id)
        if(!todo){
            return res.status(400).json("Todo not found")
        }
        res.status(200).json("Todo deleted successfully")
        
    } catch (error) {
        console.log("Error deleting Todos",error);
        return res.status(500),json("Internal server error");
        
    }

}
export const updateTodoById= async(req,res)=>
{
    const{id}=req.params
    const{title}=req.body
    try {
        const todo=await Todo.findByIdAndUpdate(id,{title},{new:true})
        if(!todo){
            return res.status(400).json("Todo not found")
        }
        res.status(400).json(todo)
    } catch (error) {
        console.log("Error updating Todo", error)
        return res.status(500).json("Internal server error")
        
    }

    
}