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

  // ✅ Fetch all data from JSON server
  useEffect(() => {
    fetch("http://localhost:4000/userData")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error("Failed to load data");
      });
  }, []);

  const handleSkillchange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills([...Skills, value]);
    } else {
      setSkills(Skills.filter((skill) => skill !== value));
    }
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setRole("");
    setGender("");
    setSkills([]);
  };

  const saveData = (newEntry) => {
    fetch("http://localhost:4000/userData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Information is not added");
        return res.json();
      })
      .then((addData) => {
        setAllData((prev) => [...prev, addData]);
        toast.success("Data is added");
      })
      .catch((err) => {
        console.error("Error:", err.message);
        toast.error("Failed to add data");
      });
  };

  const handleSubmit = () => {
    if (!Name || !Age || !Role || !Gender || Skills.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      Name,
      Age,
      Role,
      Gender,
      Skills,
    };

    saveData(newEntry);
    handleClear();
  };

  return (
    <>
      <Header />
      <About />
      <div className="App2">
        <div className="form-container2">
          {/* FORM */}
          <div>
            <label>
              Name:
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={Name}
              />
            </label>
          </div>
          <div>
            <label>
              Age:
              <input
                type="number"
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
                value={Age}
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
                onChange={(e) => setGender(e.target.value)}
                checked={Gender === "Male"}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                checked={Gender === "Female"}
              />
              Female
            </label>
          </div>
          <div>
            <label>
              Role:
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
            {["HTML", "CSS", "JAVASCRIPT", "REACT.JS", "MONGODB", "PHP"].map(
              (skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    value={skill}
                    onChange={handleSkillchange}
                    checked={Skills.includes(skill)}
                  />
                  {skill}
                </label>
              )
            )}
          </div>

          {/* BUTTONS */}
          <button onClick={handleSubmit}>Add & Save</button>
          <button onClick={handleClear}>Clear</button>

          {/* TABLE */}
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
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>
                  <td>{item.Role}</td>
                  <td>{item.Skills}</td>
                  <td>{item.Gender}</td>
                  <td>Photo</td>
                    {/* <td>
                    <button className="btn btn-primary" onClick={() => handleView(item.id)}>View</button>
                    <button className="btn btn-secondary" onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App2;
