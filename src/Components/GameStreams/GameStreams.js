import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import api from "../../api";

export default function GameStreams() {
  let location = useLocation();
  let { slug } = useParams();

  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameId}`
      );
      //   console.log(result);

      let dataArr = result.data.data;
      let finalArray = dataArr.map((stream) => {
        let newUrl = stream.thumbnail_url
          .replace("{width}", "320")
          .replace("{height}", "180");
        stream.thumbnail_url = newUrl;

        return stream;
      });

      // Calcul total viewers
      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      setStreamData(finalArray);
      setViewers(totalViewers);
    };

    fetchData();
  }, [location.state.gameId]);

  console.log(streamData);
  //   console.log(viewers);

  return (
    <div>
      <h1 className="titreGamesStreams">Streams: {slug}</h1>
      <h3 className="sousTitreGameStreams">
        <strong className="textColored">{viewers}</strong> personnes regardent{" "}
        {slug}
      </h3>
      <div className="flexAccueil">
        {streamData.map((stream, index) => (
          <div key={index} className="carteGameStreams">
            <img
              src={stream.thumbnail_url}
              alt="jeu carte"
              className="imgCarte"
            />
            <div className="cardBodyGameStreams">
              <h5 className="titreCartesStream">{stream.user_name}</h5>
              <p className="txtStream">
                Nombre de viewers: {stream.viewer_count}
              </p>
              <Link
                className="lien"
                to={{
                  pathname: `/live/${stream.user_login}`,
                }}
              >
                <div className="btnCarte">Regarder {stream.user_name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
