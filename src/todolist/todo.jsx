import { useEffect, useState } from "react";
import Header from "../components/navbar";
import { toast } from "react-toastify";
import "./Todolist.css";

const Todolist = () => {
    const [todos, setTodos] = useState([""]);
    const[task, setTask]=useState("");
    const [editId,setEditId]= useState(null);
    const [checkeditems,setCheckedItems] = useState({});
    const [currentpage,setCurrentpage] = useState(1);
    const itemperpage=5;
    useEffect(() => {
        fetch("http://localhost:4000/todolist")
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => {
                console.error(" Fetch error:", err);
                toast.error("failed to load data")
            });
    }, []);

    // sumbit
    const handleSubmit = (e) =>{
        e.preventDefault();
    

if(!task.trim())
            return;

        if(editId){
        fetch(`http://localhost:4000/todolist/${editId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task }),
        })
        .then(()=>{
            toast.success("Task updated");
            setEditId(null);
            setTask("");
           reloadTodos();
        })
        .catch(()=> toast.error("update failed"));
        }else{
            
            fetch("http://localhost:4000/todolist",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify({task}),
            })
            .then(()=>{
                toast.success("task added");
                setTask("");
                reloadTodos();
            })
            .catch(()=> toast.error("add failed"));
        }
    };
   
    //delete task
    const handleDelete =(id)=>{
        if(!checkeditems[id]){
          toast.warning("please check the box before deleting.");
           
            return;
        }
       fetch(`http://localhost:4000/todolist/${id}`,{
        method : "DELETE"
       })
       .then(()=>{
        toast.success("Task deleted");
        reloadTodos();
        setCheckedItems((prev)=>{
            const updated = {...prev};
            delete updated[id];
            return updated;
        });

       })
       .catch(() => toast.error("delete failed"));
  };
  
  //for edit
  const handleEdit =(todo)=>{
   setTask(todo.task);
   setEditId(todo.id);
  };

     // reload task
     const reloadTodos=()=>{
        fetch("http://localhost:4000/todolist")
        .then((res)=> res.json())
        .then((data)=>setTodos(data));
     };

     const handleCheckboxchange = (id) =>{
        setCheckedItems((prev)=>({
            ...prev,
            [id]: !prev[id],
          
 }));

     };
         const ischecboxdisabled = (id) => {
          return editId === id;
         };
      // pagination
     const indexOfLast = currentpage*itemperpage;
     const indexOfFirst = indexOfLast - itemperpage;
     const currentTodos = todos.slice(indexOfFirst,indexOfLast);
     const totalpages = Math.ceil(todos.length/itemperpage);

    return (
          <>
      <Header />
      <div className="todo-container">
        <h2 className="todo-title">React Todo List (JSON Server)</h2>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Type your task"
            className="todo-input"
          />
          <button type="submit" className="todo-button">
            {editId ? "Update" : "Add"}
          </button>
        </form>
        

        <ul className="todo-list">
          {currentTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {todo.task}
              <button className = "btn btn-primary" onClick={() => handleEdit(todo)}>
                Edit
              </button>
               <input
              type="checkbox"
              checked={checkeditems[todo.id] || false}
              onChange={()=> handleCheckboxchange(todo.id)}
              title="check to allow delete"
              disabled={ischecboxdisabled(todo.id)}
            />
              <button className = "btn btn-danger" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      {/* pagiantion */}
      <div className="pagination-controls">
        <button
            disabled={currentpage === 1}
            onClick={()=> setCurrentpage(currentpage - 1)}>prev
        </button>
        <span>page {currentpage} of {totalpages || 1}</span>
        <button disabled={currentpage === totalpages}
        onClick={()=> setCurrentpage(currentpage + 1)}>Next</button>
      </div>
      

      </div>
    </>
  );
};
export default Todolist;