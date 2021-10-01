import React, { useState, useEffect } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useParams } from "react-router";
import api from "../../api";

export default function Live() {
  let { slug } = useParams();

  const [infoStream, setInfoStream] = useState([]);
  const [infoGame, setInfoGame] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?user_login=${slug}`
      );

      if (result.data.data.length === 0) {
        setInfoStream(false);
      } else {
        let gameId = result.data.data.map((gameid) => {
          return gameid.game_id;
        });

        const resultNomGame = await api.get(
          `https://api.twitch.tv/helix/games?id=${gameId}`
        );

        let nomGame = resultNomGame.data.data.map((gameName) => {
          return gameName.name;
        });

        setInfoGame(nomGame);
        setInfoStream(result.data.data[0]);
      }
    };

    fetchData();
  }, [slug]);

  return infoStream ? (
    <div className="containerDecale">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="accountInfo">
        <div className="titreStream">{infoStream.title}</div>
        <div className="viewer">Viewers: {infoStream.viewer_count}</div>
        <div className="infoGame">
          Streamer: {infoStream.user_name}, &nbsp; Langue: {infoStream.language}
        </div>
        <div className="nomGame">Jeu: {infoGame}</div>
      </div>
    </div>
  ) : (
    <div className="containerDecale">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="accountInfo">
        <div className="titreStream">Le Streamer est offline</div>
      </div>
    </div>
  );
}
