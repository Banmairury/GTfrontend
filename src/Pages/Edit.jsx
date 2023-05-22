import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Edit = () => {
  // const match = useRouteMatch();
  // const { slug } = match.params;

  let { id } = useParams();

  //Navigate
  const navigate = useNavigate();
  const submitButton = () => {
    navigate("/dashboard");
  };

  const [nameActivity, setNameActivity] = useState(); //NameActivity
  const [activity, setActivity] = useState(); //Type Acrivity
  const [date, setDate] = useState(); //Date
  const [duration, setDuration] = useState(); //Duration
  const [distance, setDistance] = useState(); //Distance
  const [note, setNote] = useState(); //Note

  //Set Type Acrivity
  const handleActivity = (active) => {
    setActivity(active);
  };

  //set value state
  const setValue = (title, activity_type, date, distance, duration, note) => {
    setNameActivity(title);
    setActivity(activity_type);
    setDate(date);
    setDuration(distance);
    setDistance(duration);
    setNote(note);
  };

  // axios ดึงค่าตาม id
  const fetchData = async () => {
    try {
      const response = await axios.get(`/edit/${id}`);
      console.log(response.data);
      const { title, activity_type, date, distance, duration, note } =
        response.data; // แยก response.data
      setValue(title, activity_type, date, distance, duration, note); //set value in state
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Function update
  const submitForm = (event) => {
    //event.preventDefault(); // Prevent form submission

    axios.put(`/edit/${id}`, {nameActivity,activity,date,distance,duration,note,})
      .then((response) => {
        Swal.fire("Good job!", "แก้ไขข้อมูลแล้ว", "success");
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };

  //ปรับวัน เดือน ปี cut00:00:00
  const fomateDate = (dateDate) => {
    const date = new Date(dateDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}-${year}`;
    return formattedDate;
  };

  return (
    <div className="container-add">
      <div className="container-form-add-edit">
        <h1>Edit Your Activity</h1>
        <NameActivity nameActivity={nameActivity} setNameActivity={setNameActivity}/>
        <TypeActivity handleActivity={handleActivity} activity={activity} />
        <DateAcitvity date={date} setDate={setDate} fomateDate={fomateDate}/>
        <DurationNote duration={duration} setDuration={setDuration} distance={distance} setDistance={setDistance}/>
        <Note note={note} setNote={setNote} />
        <Buttom submitButton={submitButton} submitForm={submitForm} />
      </div>
    </div>
  );
};

const NameActivity = (props) => {
  const { nameActivity, setNameActivity } = props;
  return (
    <div className="NameActivity">
      <label>Activity Name </label>
      <br />
      <input
        onChange={(event) => setNameActivity(event.target.value)}
        value={nameActivity || ""}
        type="text"
      ></input>
    </div>
  );
};

const TypeActivity = (props) => {
  const { handleActivity, activity } = props;
  return (
    <div className="TypeActivity">
      <label>Activity Type</label>
      <ul>
        <li
          id={activity === "walking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("walking")}
        >
          <i className="fa-solid fa-person-walking"></i>
        </li>
        <li
          id={activity === "running" ? "SeleteActive" : ""}
          onClick={() => handleActivity("running")}
        >
          <i className="fa-sharp fa-solid fa-person-running"></i>
        </li>
        <li
          id={activity === "biking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("biking")}
        >
          <i className="fa-sharp fa-solid fa-person-biking"></i>
        </li>
        <li
          id={activity === "swimming" ? "SeleteActive" : ""}
          onClick={() => handleActivity("swimming")}
        >
          <i className="fa-sharp fa-solid fa-person-swimming"></i>
        </li>
        <li
          id={activity === "hiking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("hiking")}
        >
          <i className="fa-sharp fa-solid fa-person-hiking"></i>
        </li>
        <li
          id={activity === "plus" ? "SeleteActive" : ""}
          onClick={() => handleActivity("plus")}
        >
          <i className="fa-sharp fa-solid fa-plus"></i>
        </li>
      </ul>
    </div>
  );
};

const DateAcitvity = (props) => {
  const { date, setDate ,fomateDate } = props;
  return (
    <div className="DateAcitvity">
      <label>Date {fomateDate(date)}</label>
      <br />
      <input
        type="date"
        onChange={(event) => setDate(event.target.value)}
      ></input>
    </div>
  );
};

const DurationNote = (props) => {
  const { duration, setDuration, distance, setDistance } = props;
  return (
    <div className="DurationDistance">
      <div>
        <label>Duration</label>
        <br />
        <input
          type="number"
          value={duration || ""}
          onChange={(event) => setDuration(event.target.value)}
        />
        <span>min</span>
      </div>
      <div>
        <label>Distance {distance}</label>
        <br />
        <input
          type="number"
          value={distance || ""}
          onChange={(event) => setDistance(event.target.value)}
        />
        <span>meter</span>
      </div>
    </div>
  );
};

const Note = (props) => {
  const { note, setNote } = props;
  return (
    <div className="Note">
      <div>
        <label>Note</label>
        <br />
        <textarea
          name="note-area"
          rows="4"
          cols="39"
          value={note || ""}
          onChange={(event) => setNote(event.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

const Buttom = (props) => {
  const { submitButton, submitForm } = props;
  return (
    <div className="Buttom-Add-Edit">
      <button onClick={submitForm}>Save</button>
      <button onClick={submitButton}>Cancel</button>
    </div>
  );
};

export default Edit;
