import React, { useContext, useEffect, useState } from "react";
import "../styles/profile.scss";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Loader from "./Loader";
import axios from "axios";
import "../styles/posts.scss";
import * as timeago from "timeago.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Profile = ({ user }) => {
  const { LogOut, token } = useContext(UserContext);
  const { id } = useParams();
  const [helps, setHelps] = useState([]);
  const [page, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const getHelpsById = async (id) => {
    setLoading(true);
    const res = await axios.get(
      `https://amigonimo-web-api.herokuapp.com/api/helps?page=${page}&ownerId=${id}&take=5`
    );
    const data = res.data;
    setHelps([...data.content.items]);
    setLoading(false);
  };

  const getDataUser = async (id) => {
    if (!user)
      return MySwal.fire(
        "Alert",
        `To see profile of anyone you must need to login`,
        "info"
      ).then(() =>
        window.location.replace("/login?redirectUrl=" + window.location.href)
      );
    axios
      .get("https://amigonimo-web-api.herokuapp.com/api/users/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUsername(res.data.content.userName);
      });
    getHelpsById(id);
  };

  useEffect(() => {
    const getHelps = async () => {
      console.log(id);
      if (id === undefined) {
        return await getHelpsById(user.nameid);
      }
      console.log("A");
      await getDataUser(id);
    };

    getHelps();
  }, [page]);

  return (
    <div className="profile-container">
      <div className="title">
        {!id ? (
          <h2>
            <i className="fas fa-angle-right"></i>My Profile
          </h2>
        ) : (
          <h2>
            <i className="fas fa-angle-right"></i>
            {username}
          </h2>
        )}
      </div>
      {!id ? (
        <div className="profile">
          <div className="logOut">
            <Link className="btn" onClick={() => LogOut()}>
              LogOut
            </Link>
          </div>
          <div className="profile-data">
            <div className="avatar">
              <img
                src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                alt="no"
              />
            </div>
            <div>
              <h2>{user.unique_name}</h2>
            </div>
          </div>
          <div className="profile-helps">
            <div className="title">
              <h2>
                <i className="fas fa-angle-right"></i>Recent Helps
              </h2>
            </div>
            <div className="helps-container">
              {loading ? (
                <Loader />
              ) : (
                helps.map((help) => (
                  <div className="helps">
                    <div className="avatar">
                      <img
                        src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                        alt="no"
                      />
                      <h4>{help.ownerUsername}</h4>
                    </div>
                    <div className="helps-comentario">
                      <p>{help.content}</p>
                      <h4>{timeago.format(help.creationDate + "Z")}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="profile">
          <div className="profile-data">
            <div className="avatar">
              <img
                src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                alt="no"
              />
            </div>
            <div>
              <h2>{username}</h2>
            </div>
          </div>
          <div className="profile-helps">
            <div className="title">
              <h2>
                <i className="fas fa-angle-right"></i>Recent Helps
              </h2>
            </div>
            <div className="helps-container">
              {loading ? (
                <Loader />
              ) : (
                helps.map((help) => (
                  <div className="helps">
                    <div className="avatar">
                      <img
                        src="https://pbs.twimg.com/profile_images/1185798852/anonimo2_400x400.jpg"
                        alt="no"
                      />
                      <h4>{help.ownerUsername}</h4>
                    </div>
                    <div className="helps-comentario">
                      <p>{help.content}</p>
                      <h4>{timeago.format(help.creationDate + "Z")}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
