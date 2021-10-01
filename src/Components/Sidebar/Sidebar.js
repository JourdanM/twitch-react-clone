import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/helix/streams");
      let dataArr = result.data.data;
      // console.log(dataArr);

      let userIds = dataArr.map((stream) => {
        return stream.user_id;
      });

      // console.log(gameIds, userIds);

      // Création des URLS personnalisées

      let baseUrlUsers = "https://api.twitch.tv/helix/users?";

      // let queryParamsGames = "";
      let queryParamsUsers = "";

      userIds.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
      });

      // URL finale
      let urlFinaleUsers = baseUrlUsers + queryParamsUsers;

      // console.log("URL USERS: " + urlFinaleUsers);

      // Appels
      let getUsers = await api.get(urlFinaleUsers);

      let usersArr = getUsers.data.data;

      // console.log(usersArr);

      // Création du tableau final
      let finalArray = dataArr.map((stream) => {
        stream.profilePic = "";
        stream.login = "";

        usersArr.forEach((user) => {
          if (stream.user_id === user.id) {
            stream.profilePic = user.profile_image_url;
            stream.login = user.login;
          }
        });
        return stream;
      });
      setTopStreams(finalArray.slice(0, 6));
    };

    fetchData();
  }, []);

  // console.log(topStreams);

  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaînes recommandées</h2>
      <ul className="listeStream">
        {topStreams.map((stream, index) => (
          <Link
            key={index}
            className="lien"
            to={{
              pathname: `/live/${stream.login}`,
            }}
          >
            <li key={index} className="containerFlexSidebar">
              <img
                src={stream.profilePic}
                alt="logo user"
                className="profilePicRonde"
              />
              <div className="streamUser">{stream.user_name}</div>
              <div className="viewerRight">
                <div className="pointRouge"></div>
                <div>{stream.viewer_count}</div>
              </div>
              <div className="gameNameSidebar">{stream.game_name}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
