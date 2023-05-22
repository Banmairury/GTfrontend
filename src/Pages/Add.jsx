import "../Styles/Add.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Add = () => {
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

  //เพิ่ม Activity
  const submitForm = (event) => {
    const data = {
      title: nameActivity,
      activity_type: activity,
      date: date,
      duration: duration,
      distance: distance,
      note: note,
    };
    console.log(data);

    axios
      .post(`/create`, data) //{ headers }
      .then((response) => {
        Swal.fire("Good job!", "บันทึกข้อมูลแล้ว", "success");
        navigate("/dashboard");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  };

  return (
    <div className="container-add">
      <div className="container-form-add-edit">
        <h1>Add Your Activity</h1>
        <NameActivity
          nameActivity={nameActivity}
          setNameActivity={setNameActivity}
        />
        <TypeActivity handleActivity={handleActivity} activity={activity} />
        <DateAcitvity date={date} setDate={setDate} />
        <DurationNote
          duration={duration}
          setDuration={setDuration}
          distance={distance}
          setDistance={setDistance}
        />
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
      <label>Activity Name</label>
      <br />
      <input
        onChange={(event) => setNameActivity(event.target.value)}
        type="text"
      ></input>
    </div>
  );
};

const TypeActivity = (props) => {
  const { handleActivity, activity } = props;
  return (
    <div className="TypeActivity">
      <label>Activity Type </label>
      <ul>
        <li
          id={activity === "walking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("walking")}>
          <i className="fa-solid fa-person-walking"></i>
        </li>
        <li
          id={activity === "running" ? "SeleteActive" : ""}
          onClick={() => handleActivity("running")}>
          <i className="fa-sharp fa-solid fa-person-running"></i>
        </li>
        <li
          id={activity === "biking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("biking")}>
          <i className="fa-sharp fa-solid fa-person-biking"></i>
        </li>
        <li
          id={activity === "swimming" ? "SeleteActive" : ""}
          onClick={() => handleActivity("swimming")}>
          <i className="fa-sharp fa-solid fa-person-swimming"></i>
        </li>
        <li
          id={activity === "hiking" ? "SeleteActive" : ""}
          onClick={() => handleActivity("hiking")}>
          <i className="fa-sharp fa-solid fa-person-hiking"></i>
        </li>
        <li
          id={activity === "plus" ? "SeleteActive" : ""}
          onClick={() => handleActivity("plus")}>
          <i className="fa-sharp fa-solid fa-plus"></i>
        </li>
      </ul>
    </div>
  );
};

const DateAcitvity = (props) => {
  const { date, setDate } = props;
  return (
    <div className="DateAcitvity">
      <label>Date {date}</label>
      <br />
      <input
        type="date"
        onChange={(event) => setDate(event.target.value)}
        placeholder="Date / Month / Year"
      ></input>
    </div>
  );
};

const DurationNote = (props) => {
  const { duration, setDuration, distance, setDistance } = props;
  return (
    <div className="DurationDistance">
      <div>
        <label>Duration </label>
        <br />
        <input
          type="number"
          onChange={(event) => setDuration(event.target.value)}
        />
        <span>min</span>
      </div>
      <div>
        <label>Distance </label>
        <br />
        <input
          type="number"
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
      <button onClick={submitForm}>Add</button>
      <button onClick={submitButton}>Cancel</button>
    </div>
  );
};

export default Add;
