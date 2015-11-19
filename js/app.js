angular.module('app', ['spotify'])
.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('456095fae6884551b223950e2a72f04a');
  SpotifyProvider.setRedirectUri('http://localhost:8080/auth');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  
  // If you already have an auth token
  SpotifyProvider.setAuthToken('BQAxN1A4Ve2cyHgOKFoGZqfC--0M3DHjq2DD_WHjuwjc_Z30atU1siiKlp_Y0iXKq9xhOanjTEWemsTyUvL-TaAeJrqs3wo-alfTbif3rGr9LrC2nOHOFYsFG8NfdLGg2gWzt4Uxo8Zf7fL67pHNl5NTArUrgnx4vOE5GSo3H3EwDZ_wFmYqE6SBHh7CQyun9QmZowH2HpgfB3SnWgIQTpUZgnfgHKnj_3dBo2UlhFZtmb_Ti9eiIb39_VRwLl818Mg');
});