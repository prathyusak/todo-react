import {useState} from "react";
import './Modal.css'

export default function CustomModal  ({activeItem,handleSubmit})  {
    const [title,settitle] = useState("");
    const [desc,setdesc] = useState("");
    const [compl,setcompl] = useState(false);
      const handleChange = e => {
          if (e.target.name === 'title') {
            settitle(e.target.value)
            activeItem.title = e.target.value
          } else if (e.target.name === 'description') {
              setdesc(e.target.value) 
              activeItem.description=e.target.value
          } else if (e.target.name === 'completed') {
              setcompl(!compl)
              activeItem.completed=(e.target.value === "on") ? true:false
              
          }      
      };

        return (
        <div className="modal-box">
            <header  > Todo Item </header>
            <div className="modal-content">
            <form onSubmit={handleSubmit} className="form-div">    
                    
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" 
                  value={activeItem.title}  onChange={handleChange}
                  placeholder="Enter Todo Title"
                   /><br></br>
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={activeItem.description}
                    onChange={handleChange}
                    placeholder="Enter Todo description"
                  /><br></br>
                    <label htmlFor="completed">
                    <input
                      type="checkbox"
                      name="completed"
                      checked={activeItem.completed}
                      onChange={handleChange}
                    />
                    Completed
                  </label><br></br>
                  <button type="submit" className="submit-button" >
                  Save
                 </button>
                
             </form>
            </div>
          </div>
        );
      }
