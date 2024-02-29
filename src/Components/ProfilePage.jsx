import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const encodedUserEmail = location.pathname.split("/profile/")[1];
  const userEmail = decodeURIComponent(encodedUserEmail);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-profileinfo/${userEmail}`
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.profileinfo);
        } else {
          console.error("Error fetching profile info");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userEmail]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phno: "",
    add: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("phno", profile.phno);
      formData.append("add", profile.add);

      const response = await axios.put(
        `http://localhost:5000/updateprofile/${userEmail}`,
        formData
      );
      if (!response.data.error) {
        alert("User Profile updated successfully!");
      } else {
        alert("Error updating user profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-parent">
    <Navbar></Navbar>
    <div>
      <h3>Edit Profile</h3>
      <br />
      <form onSubmit={handleSubmit} className="profile-form">
      <div className="profile-group">
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder={user?.name || ""}
            onChange={handleChange}
            className="profile-form-control"
          />
        </label>
</div>
 <div className="profile-group">
        <label>
          Email:
          <input
            type="text"
            name="email"
            placeholder={user?.email || ""}
            onChange={handleChange}
            className="profile-form-control"
          />
        </label>
        </div>
        <div className="profile-group">
        <label>
          Ph.no:
          <input
            type="text"
            name="phno"
            placeholder={user?.no || ""}
            onChange={handleChange}
            className="profile-form-control"
          />
        </label>
</div>
 <div className="profile-group">
        <label>
          Address:
          <input
            type="text"
            name="add"
            placeholder={user?.add || ""}
            onChange={handleChange}
            className="profile-form-control"
          />
        </label>
</div>
        <button type="submit" className="profile-button">Update</button>
      </form>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default ProfilePage;
