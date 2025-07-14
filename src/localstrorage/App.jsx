import { useEffect, useState } from "react";
import "./App.css";
import Header from "../components/navbar";
import Home from "./header";
function App() {
  const [data, setData] = useState([]);
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Role, setRole] = useState("");
  const [Skills, setSkills] = useState([]);
  const [Gender, setGender] = useState("");
  const [Photo, setPhoto] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const storeData = localStorage.getItem("employeeData");
    if (storeData) {
      setData(JSON.parse(storeData));
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (isDataLoaded)
      localStorage.setItem("employeeData", JSON.stringify(data));
  }, [data, isDataLoaded]);
  
  const handleSkillchange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills([...Skills, value]);
    } else {
      setSkills(Skills.filter((Skills) => Skills !== value));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = "";
    if (Name.trim() === "") error += "Enter your name, ";
    if (!Age || Number(Age) <= 0) error += "Enter your age, ";
    if (Role.trim() === "") error += "Select your Role, ";
    if (!Skills || Skills.length === 0) error += "Select at least one skill, ";
    if (Gender.trim() === "") error += "Fill Gender, ";
    if (Photo === "") error += "Upload image";
    if (error === "") {
      const dt = [...data];
      const newObject = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
        Name: Name.trim(),
        Age: Number(Age),
        Role: Role.trim(),
        Skills,
        Gender: Gender.trim(),
        Photo,
      };
      dt.push(newObject);
      setData(dt);
      handleClear();
      setCurrentPage(Math.ceil((dt.length) / itemsPerPage));
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
      alert("Item not found");
      return;
    }
    const dt = [...data];
    dt[index] = {
      id,
      Name: Name.trim(),
      Age: Number(Age),
      Role: Role.trim(),
      Skills,
      Gender: Gender.trim(),
      Photo,
    };
    setData(dt);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setName("");
    setAge("");
    setRole("");
    setSkills([]);
    setGender("");
    setPhoto("");
    setIsUpdate(false);
  };

  const handleView = (id) => {
    const Employee = data.find((item) => item.id === id);
    if (Employee) {
      alert(`Employee Details:\n\nName: ${Employee.Name}\nAge: ${Employee.Age}\nRole: ${Employee.Role} \nSkills: ${Employee.Skills.join(", ")}\nGender: ${Employee.Gender}\nPhoto: ${Employee.Photo}`);
    }
  };

  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setName(dt.Name);
      setAge(dt.Age);
      setRole(dt.Role || "");
      setSkills(dt.Skills || []);
      setGender(dt.Gender || "");
      setPhoto(dt.Photo || "");
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this data?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt); 

        const newTotalPages = Math.max(1, Math.ceil(dt.length / itemsPerPage));
        if (currentPage > newTotalPages) {
          setTimeout(() => setCurrentPage(newTotalPages), 0);
        }
      }
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [data, currentPage, itemsPerPage]);

  return (
    <>
      <Header/>
      <Home/>
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <div>
            <label>
              Name:
              <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={Name} />
            </label>
          </div>
          <div>
            <label>
              Age:
              <input type="number" placeholder="Enter your age" onChange={(e) => setAge(Number(e.target.value))} value={Age} />
            </label>
          </div>
          <div>
            <label>Gender:
              <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} checked={Gender === "Male"} />Male
              <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} checked={Gender === "Female"} />Female
            </label>
          </div>
          <div>
            <label> Role:
              <select onChange={(e) => setRole(e.target.value)} value={Role}>
                <option value="">--select Role--</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="HR">HR</option>
                <option value="Intern">Intern</option>
              </select>
            </label>
          </div>
          <div>
            Skills:
            <label><input type="checkbox" value="HTML" onChange={handleSkillchange} checked={Skills.includes("HTML")} /> HTML5</label>
            <label><input type="checkbox" value="CSS" onChange={handleSkillchange} checked={Skills.includes("CSS")} /> CSS</label>
            <label><input type="checkbox" value="JAVASCRIPT" onChange={handleSkillchange} checked={Skills.includes("JAVASCRIPT")} /> JAVASCRIPT</label>
            <label><input type="checkbox" value="REACT.JS" onChange={handleSkillchange} checked={Skills.includes("REACT.JS")} /> REACT.JS</label>
            <label><input type="checkbox" value="MONGODB" onChange={handleSkillchange} checked={Skills.includes("MONGODB")} /> MONGODB</label>
            <label><input type="checkbox" value="PHP" onChange={handleSkillchange} checked={Skills.includes("PHP")} /> PHP</label>
          </div>
          <div>
            Profile Photo:
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            {Photo && <img src={Photo} alt="Profile" width={80} style={{ marginTop: "5px", borderRadius: "10px" }} />}
          </div>
          <div>
            {!isUpdate ? (
              <button className="btn btn-primary" onClick={(e) => handleSave(e)}>Save</button>
            ) : (
              <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
            )}
            <button className="btn btn-danger" onClick={handleClear}>Clear</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Role</th>
              <th>Skills</th>
              <th>Gender</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>No data found.</td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>
                  <td>{item.Role}</td>
                  <td>{Array.isArray(item.Skills) ? item.Skills.join(", ") : item.Skills}</td>
                  <td>{item.Gender}</td>
                  <td>{item.Photo ? <img src={item.Photo} alt="Profile" width={50} style={{ borderRadius: "10px" }} /> : ""}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleView(item.id)}>View</button>
                    <button className="btn btn-secondary" onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", gap: "10px" }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages || 1}</span>
        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </>
  );
}

export default App;
