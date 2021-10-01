import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function TopStreams() {
  const [channels, setChannels] = useState([]);

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
        stream.login = "";

        usersArr.forEach((user) => {
          if (stream.user_id === user.id) {
            stream.login = user.login;
          }
        });
        let newUrl = stream.thumbnail_url
          .replace("{width}", "320")
          .replace("{height}", "180");
        stream.thumbnail_url = newUrl;
        return stream;
      });
      setChannels(finalArray);
    };

    fetchData();
  }, []);

  //   console.log(channels);

  return (
    <div>
      <h1 className="titreGames">Streams les plus populaires</h1>
      <div className="flexAccueil">
        {channels.map((channel, index) => (
          <div key={index} className="carteStream">
            <img src={channel.thumbnail_url} alt="jeu" className="imgCarte" />
            <div className="cardBodyStream">
              <h5 className="titreCarteStream">{channel.user_name}</h5>
              <p className="txtStream">Jeu : {channel.game_name}</p>
              <p className="txtStream viewers">
                Viewers : {channel.viewer_count}
              </p>
              <Link
                className="lien"
                to={{ pathname: `/live/${channel.login}` }}
              >
                <div className="btnCarte">Regarder {channel.user_name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
