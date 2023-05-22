import React from "react";
import "../Styles/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bgDashBoard from "../Images/Dashboard/bg-dashboard.png";
import logoLight from "../Images/Logo/gaintrack-logo-light.png";
import profilePic from "../Images/Dashboard/profilePic.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [activtsData, setActivtsData] = useState([]);

  //Axios get all document
  const fetchData = async () => {
    try {
      const response = await axios.get(`/dashboard`);
      setActivtsData(response.data);
    } catch (err) {
      alert(err);
    }
  };
  
  //เรียกใช้ Axios get all
  useEffect(() => {
    fetchData();
  }, []);

  //Delete
  const confirmDelete = (_id) => {
    Swal.fire({
      title: "Do you want to delete the activity?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      //ถ้ากด ok
      if (result.isConfirmed) {
        handleDelete(_id);
      }
    });
  };
  const handleDelete = (_id) => {
    axios
      .delete(`/dashboard/${_id}`)
      .then((response) => {
        Swal.fire("Deleted", response.data.message, "success");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  //ปรับวัน เดือน ปี cut00:00:00
  const fomateDate = (dateDate) => {
    const date = new Date(dateDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year}`;
    return formattedDate;
  };

  return (
    <div className="db-big-container">
      <div className="db-container">
        <img src={bgDashBoard} alt="bg" />
        <div className="db-left-container">
          <div className="db-left">
            <div className="db-logo">
              <a href={"/"}>
                <img src={logoLight} alt="logo-pic" />
              </a>
            </div>
            <div className="db-nav-bar">
              <nav>
                <ul>
                  <li>
                    <a href={"/achievement"}>
                      <i className="fa-solid fa-trophy"></i>Achievement
                    </a>
                  </li>
                  <li>
                    <a href={"/"}>
                      Log out<i className="fa-solid fa-right-from-bracket"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="db-middle-container">
          <div className="db-middle">
            <div className="db-mini-profile">
              <div className="db-location">
                <i className="fa-solid fa-location-dot"></i>
                <span>Somewhere, Space</span>
              </div>
              <div className="db-profile-pic">
                <img src={profilePic} alt="profile-pic" />
              </div>
            </div>

            <div className="db-card-container">
              <div className="db-card-add">
                <a href={"/add"}>
                  <i className="fa-solid fa-plus"></i>
                </a>
              </div>
              {activtsData
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((card, index) => (
                  <div className="db-card" key={index}>
                    <div className="db-activity-bg">
                      {/*need to change to card.activityType */}
                      <i className="fa-solid fa-person-running"></i>
                      {/*need to change to card.activityType */}
                    </div>
                    <div className="db-activity-content">
                      <h2>{card.title}</h2>
                      <div className="db-activity-property">
                        <div className="db-activity-property-top">
                          <h4>Date : {fomateDate(card.date)}</h4>
                          <h4>Duration : {card.duration}</h4>
                        </div>
                        <div className="db-activity-property-bottom">
                          <h4>Distance : {card.distance}</h4>
                          <h4>Note : {card.note}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="db-activity-edit-del">
                      <Link to={`/edit/${card._id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <div>
                        <i
                          className="fa-solid fa-trash translate-middle-y"
                          onClick={() => confirmDelete(card._id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="db-right-container">
          <div className="db-right">
            <div className="db-activity-summary-top">
              <h2>Activity Tracking</h2>
              <h4>Monday, 01 Jan</h4>
            </div>
            <div className="db-activity-summary">a</div>
            <div className="db-activity-summary">a</div>
            <div className="db-activity-summary">sa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
