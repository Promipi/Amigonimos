import React, { Fragment, useContext, useEffect, useState } from "react";
import "../styles/profile.scss";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Loader from "./Loader";
import axios from "axios";
import "../styles/posts.scss";
import * as timeago from "timeago.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AvatarCard from "./AvatarCard";
import Modal from "./Modal";
import Settings from "./Settings";
import Help from "./Help";

const MySwal = withReactContent(Swal);

const Profile = ({ user }) => {
  const { LogOut, token } = useContext(UserContext);
  const { id } = useParams();
  const [helps, setHelps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [publicHelps, setPublicHelps] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const getHelpsById = async (id) => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.API_URL}/helps?ownerId=${id}&take=5`
    );
    const data = res.data;
    setHelps([...data.content.items]);
    setLoading(false);
  };

  const getDataUser = async (id) => {
    if (user) {
      axios
        .get(`${process.env.API_URL}/users/` + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUsername(res.data.content.userName);
          getHelpsById(id);
          setPublicHelps(res.data.content.publicHelps);
        });
    } else
      return MySwal.fire(
        "Alert",
        `To see profile of anyone you must need to login`,
        "info"
      ).then(() =>
        window.location.replace("/login?redirectUrl=" + window.location.href)
      );
  };

  useEffect(() => {
    console.log(user);
    const getHelps = async () => {
      await getDataUser(id ? id : user.nameid);
    };

    getHelps();
  }, []);

  return (
    <div className="profile-container">
      <div className="title">
        <h2>
          <i className="fas fa-angle-right"></i>Profile{" "}
          <i className="fas fa-angle-right"></i>
          {id ? username : "My Profile"}
        </h2>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-data">
          <AvatarCard
            id={id}
            username={id ? username : user.unique_name}
            onClick={(e) => setShow(true)}
          />
          {!publicHelps && id ? (
            <Fragment />
          ) : (
            <Fragment>
              <div className="title" style={{ zIndex: 0 }}>
                <h2>
                  <i className="fas fa-angle-right"></i>Recent Helps
                </h2>
              </div>
              <div className="profile-helps">
                {!loading && helps ? (
                  helps.map((help, i) => (
                    <Help key={i} help={help}/>
                  ))
                ) : (
                  <Loader />
                )}
              </div>
            </Fragment>
          )}
        </div>
      )}
      <Modal title="Settings" show={show} onClose={handleClose} close={<Link to="/" className="btn" onClick={LogOut}>LogOut</Link>}>
        <Settings publicHelps={publicHelps} id={user.nameid} userName={username}/>
      </Modal>
    </div>
  );
};

export default Profile;
