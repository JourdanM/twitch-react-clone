import axios from "axios";

let api = axios.create({
  headers: {
    "Client-ID": "ezo79jagtt5amy37aqor5nxzt6hmla",
    "Authorization": "Bearer mzwydudgfec8ih8fmp78jtrxhxrffm"
  },
});

/*
    CLIENT_ID = ezo79jagtt5amy37aqor5nxzt6hmla
    REDIRECT = 'http://localhost/'
    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    LIEN = https://id.twitch.tv/oauth2/authorize?client_id=ezo79jagtt5amy37aqor5nxzt6hmla&redirect_uri=http://localhost/&response_type=token
*/ 

export default api;
