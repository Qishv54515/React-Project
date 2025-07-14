import { useEffect, useState } from "react";
import Header from "../components/navbar";
import About from "./header2";
import "./App2.css";
import { toast } from "react-toastify";

const App2 = () => {
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Role, setRole] = useState("");
  const [Skills, setSkills] = useState([]);
  const [Gender, setGender] = useState("");
  const [allData, setAllData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = () => {
    fetch("http://localhost:4000/userData")
      .then((res) => res.json())
      .then((data) => setAllData(data))
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error("Failed to load data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills((prev) => [...prev, value]);
    } else {
      setSkills((prev) => prev.filter((skill) => skill !== value));
    }
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setRole("");
    setGender("");
    setSkills([]);
    setEditId(null);
  };
  const handleView = (id) => {
    const Employee = allData.find((item) => item.id === id);
    if (Employee) {
      toast.info(
  `Name: ${ Employee.Name}\nAge: ${Employee.Age}\nRole: ${Employee.Role}\nSkills: ${Employee.Skills.join(", ")}\nGender: ${Employee.Gender}`,
      {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable:true,
        height : 100,
        width: 100,
      }
    );
    }
  };

  const handleSubmit = () => {
    if (!Name || !Age || !Role || !Gender || Skills.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      Name,
      Age,
      Role,
      Gender,
      Skills,
    };

    if (editId) {
      fetch(`http://localhost:4000/userData/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Updated successfully");
          fetchData();
          handleClear();
        })
        .catch(() => toast.error("Update failed"));
    } else {
      fetch("http://localhost:4000/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Data added successfully");
          fetchData();
          handleClear();
        })
        .catch(() => toast.error("Add failed"));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      fetch(`http://localhost:4000/userData/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Deleted successfully");
          fetchData();
        })
        .catch(() => toast.error("Delete failed"));
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.Name);
    setAge(item.Age);
    setRole(item.Role);
    setGender(item.Gender);
    setSkills(item.Skills);
  };
  // Pagination logic
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
      <Header />
      <About />
      <div className="App2">
        <div className="form-container2">
          <div>
            <label>
              Name:
              <input
                type="text"
                placeholder="Enter your name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Age:
              <input
                type="number"
                placeholder="Enter your age"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Gender:
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={Gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={Gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
          </div>
          <div>
            <label>
              Role:
              <select value={Role} onChange={(e) => setRole(e.target.value)}>
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
            {["HTML", "CSS", "JAVASCRIPT", "REACT.JS", "MONGODB", "PHP"].map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={Skills.includes(skill)}
                  onChange={handleSkillChange}
                />
                {skill}
              </label>
            ))}
          </div>

          <div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? "Update" : "Save"}
            </button>
            <button className="btn btn-danger" onClick={handleClear}>
              Clear
            </button>
          </div>

          <table className="table2">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>
                  <td>{item.Role}</td>
                  <td>{item.Skills?.join(", ")}</td>
                  <td>{item.Gender}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleView(item.id)}>View</button>
                    <button className="btn btn-secondary" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App2;
