let base_url = "https://api.football-data.org/";
const API_KEY = '4c8733888eae4660b489567ce4391664';
let get_teams = `${base_url}v2/competitions/2021/teams/`;
let get_standings = `${base_url}v2/competitions/2021/standings?standingType=TOTAL`;
let dataMatches;
function fetchApi(url) {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function loading() {
  let loadingClubsHTML =`
  <p style="text-align: center">
    <img src="gambar/loading.gif">
  </p>
  `;
  document.getElementById("loading").innerHTML = loadingClubsHTML;
}

function hiddenLoading(){
  document.getElementById("loading").innerHTML = '';
}
function getClubs() {
  loading();
  if ("caches" in window) {
    caches.match(get_teams).then(response => {
      if (response) {
        response.json().then(data => {
          let clubsHTML = "";
          let bodyClubsHTML = "";
          data.teams.forEach(clubs => {
            bodyClubsHTML += `
              <tr>
                <td><img style="max-width: 100px" alt="icon Logo Clubs" src="${clubs.crestUrl}"/></td>
                <td>${clubs.name}</td>
                <td>${clubs.address}</td>
                <td><a href="${clubs.website}">${clubs.website}</a></td>
                <td>${clubs.venue}</td>
              </tr>
                `;
          });
          clubsHTML +=`
            <div class="col s12">
                <div class="card">
                  <div class="card-content">
                   <div class="auto-overflow">
                    <table class="responsive-table striped">
                      <head>
                        <tr>
                          <th style="text-align: center;">Logo</th>
                          <th style="text-align: center;">Nama</th>
                          <th style="text-align: center;">Alamat</th>
                          <th style="text-align: center;">Website</th>
                          <th style="text-align: center;">Stadion</th>
                        </tr>
                      </head>
                      <body>${bodyClubsHTML}</body>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
          `;
          document.getElementById("tim").innerHTML = clubsHTML;
          hiddenLoading();
        });
      }
    });
  }

  fetchApi(get_teams)
    .then(status)
    .then(json)
    .then(data => {
          let clubsHTML = "";
          let bodyClubsHTML = "";
          data.teams.forEach(clubs => {
            bodyClubsHTML += `
              <tr>
                <td><img style="max-width: 100px" alt="icon Logo Clubs" src="${clubs.crestUrl}" /></td>
                <td>${clubs.name}</td>
                <td>${clubs.address}</td>
                <td><a href="${clubs.website}">${clubs.website}</a></td>
                <td>${clubs.venue}</td>
              </tr>
                `;
          });
          clubsHTML +=`
            <div class="col s12">
                <div class="card">
                  <div class="card-content">
                   <div class="auto-overflow">
                    <table class="responsive-table striped">
                      <head>
                        <tr>
                          <th style="text-align: center;">Logo</th>
                          <th style="text-align: center;">Nama</th>
                          <th style="text-align: center;">Alamat</th>
                          <th style="text-align: center;">Website</th>
                          <th style="text-align: center;">Stadion</th>
                        </tr>
                      </head>
                      <body>${bodyClubsHTML}</body>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
          `;
          document.getElementById("tim").innerHTML = clubsHTML;
          hiddenLoading();
        })
    .catch(error);
  }

  function getStandings(){
    loading();
    if ("caches" in window) {
      caches.match(get_standings).then(response => {
        if (response) {
          response.json().then(data=> {
            let standingsHTML = "";
            data.standings.forEach(standings => {
              let bodyStandings = "";
              standings.table.forEach(result => {
                bodyStandings += `
                <tr>
                  <td>${result.position}</td>
                  <td>${result.team.name}</td>
                  <td>${result.playedGames}</td>
                  <td>${result.won}</td>
                  <td>${result.draw}</td>
                  <td>${result.lost}</td>
                  <td>${result.points}</td>
                  <td>${result.goalsFor}</td>
                  <td>${result.goalsAgainst}</td>
                  <td>${result.goalDifference}</td>
                </tr>
                `;
              });
              standingsHTML += `
              <div class="col s12 m12">
                <div class="card">
                  <div class="card-content">
                    <table class="responsive-table striped">
                      <head>
                        <tr>
                          <th>Position</th>
                          <th>Team</th>
                          <th>Played</th>
                          <th>Won</th>
                          <th>Draw</th>
                          <th>Lost</th>
                          <th>Points</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                        </tr>
                      </head>
                      <body>${bodyStandings}</body>
                    </table>
                  </div>
                </div>
              </div>
            `;
            });
            document.getElementById("kelasmen").innerHTML = standingsHTML;
            hiddenLoading();
          });
        }
      });
    }

    fetchApi(get_standings)
    .then(status)
    .then(json)
    .then(data=> {
      let standingsHTML = "";
            data.standings.forEach(standings=> {
              let bodyStandings = "";
              standings.table.forEach(result=>{
                bodyStandings += `
                <tr>
                  <td>${result.position}</td>
                  <td>${result.team.name}</td>
                  <td>${result.playedGames}</td>
                  <td>${result.won}</td>
                  <td>${result.draw}</td>
                  <td>${result.lost}</td>
                  <td>${result.points}</td>
                  <td>${result.goalsFor}</td>
                  <td>${result.goalsAgainst}</td>
                  <td>${result.goalDifference}</td>
                </tr>
                `;
              });
              standingsHTML += `
              <div class="col s12 m12">
                <div class="card">
                  <div class="card-content">
                    <table class="responsive-table striped">
                      <head>
                        <tr>
                          <th>Position</th>
                          <th>Team</th>
                          <th>Played</th>
                          <th>Won</th>
                          <th>Draw</th>
                          <th>Lost</th>
                          <th>Points</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                        </tr>
                      </head>
                      <body>${bodyStandings}</body>
                    </table>
                  </div>
                </div>
              </div>
            `;
            });
            document.getElementById("kelasmen").innerHTML = standingsHTML;
            hiddenLoading();
        })
    .catch(error);
  }

  function getMatchesSelected(){
    if ("caches" in window) {
    caches.match(get_teams).then(response => {
      if (response) {
        response.json().then(data => {
          let selectClubsHTML = `<option value="">Pilih Tim</option>`;
          data.teams.forEach(clubs => {
            selectClubsHTML += `
                    <option value="${clubs.id}">${clubs.name}</option>
                `;
          });
          document.getElementById("select").innerHTML = selectClubsHTML;
        });
      }
    });
  }

  fetchApi(get_teams)
    .then(status)
    .then(json)
    .then(data => {
      let selectClubsHTML = `<option value="">Pilih Tim</option>`;
          data.teams.forEach(clubs => {
            selectClubsHTML += `
                    <option value="${clubs.id}">${clubs.name}</option>
                `;
          });
          document.getElementById("select").innerHTML = selectClubsHTML;
        })
    .catch(error);
  }

  function getValueOption(){
    const value = document.getElementById("select").value;
    if (value !== "") {
      getMatchesClubs(value);
      document.getElementById("jadwal").innerHTML = "";
      loading();
    }
  }

  function getMatchesClubs(id){
    if ("caches" in window) {
    caches.match(`${base_url}v2/teams/${id}/matches`).then(response => {
      if (response) {
        response.json().then(data => {
          dataMatches = data;
          let jadwalClubsHTML = "";
          let bodyJadwalClubsHTML = "";
          data.matches.forEach(matches => {
            if (matches.status === "FINISHED") {
              var score = `${matches.score.fullTime.homeTeam}-${matches.score.fullTime.awayTeam}`;
            }else if (matches.status === "SCHEDULED" || matches.status === "POSTPONED"){
              var score = `-`;
            }
            bodyJadwalClubsHTML += `
              <tr>
                <td>${matches.competition.name}</td>
                <td>${matches.utcDate}</td>
                <td>${matches.homeTeam.name} VS ${matches.awayTeam.name}</td>
                <td>${score}</td>
                <td>${matches.status}</td>
                <td><a class="waves-effect waves-light btn" onclick="insertMatch(${matches.id})">Simpan</a></td>
              </tr>
            `;
          });
          jadwalClubsHTML = `
              <div class="col s12">
                <div class="card">
                  <div class="card-content">
                    <table class="responsive-table striped centered">
                      <head>
                        <tr>
                          <th style="text-align: center;">Kompetisi</th>
                          <th style="text-align: center;">Jadwal</th>
                          <th style="text-align: center;">Home VS Away</th>
                          <th style="text-align: center;">Score</th>
                          <th style="text-align: center;">Status</th>
                          <th style="text-align: center">Aksi</th>
                        </tr>
                      </head>
                      <body>${bodyJadwalClubsHTML}</body>
                    </table>
                  </div>
                </div>
              </div>
          `;
          document.getElementById("jadwal").innerHTML = jadwalClubsHTML;
          hiddenLoading();
        });
      }
    });
  }

  fetchApi(`${base_url}v2/teams/${id}/matches`)
    .then(status)
    .then(json)
    .then(data => {
      dataMatches = data;
      let jadwalClubsHTML = "";
          let bodyJadwalClubsHTML = "";
          data.matches.forEach(matches => {
            if (matches.status === "FINISHED") {
              var score = `${matches.score.fullTime.homeTeam}-${matches.score.fullTime.awayTeam}`;
            }else if (matches.status === "SCHEDULED" || matches.status === "POSTPONED"){
              var score = `-`;
            }
            bodyJadwalClubsHTML += `
              <tr>
                <td>${matches.competition.name}</td>
                <td>${matches.utcDate}</td>
                <td>${matches.homeTeam.name} VS ${matches.awayTeam.name}</td>
                <td>${score}</td>
                <td>${matches.status}</td>
                <td><a class="waves-effect waves-light btn" onclick="insertMatches(${matches.id})">Simpan</a></td>
              </tr>
            `;
          });
          jadwalClubsHTML = `
              <div class="col s12">
                <div class="card">
                  <div class="card-content">
                    <table class="responsive-table striped centered">
                      <head>
                        <tr>
                          <th style="text-align: center;">Kompetisi</th>
                          <th style="text-align: center;">Jadwal</th>
                          <th style="text-align: center;">Home VS Away</th>
                          <th style="text-align: center;">Score</th>
                          <th style="text-align: center;">Status</th>
                          <th style="text-align: center">Aksi</th>
                        </tr>
                      </head>
                      <body>${bodyJadwalClubsHTML}</body>
                    </table>
                  </div>
                </div>
              </div>
          `;
          document.getElementById("jadwal").innerHTML = jadwalClubsHTML;
          hiddenLoading();
        })
    .catch(error);
  }

  function saveMatches(){
    loading();
    return dbPromised.then(db =>{
      let tx = db.transaction("matches", "readonly");
      let store = tx.objectStore("matches");
      return store.getAll();
    }).then(data => {
      dataMatches = data;
      let jadwalClubsHTML = "";
      let bodyJadwalClubsHTML = "";
      data.forEach(matches => {
        if (matches.status === "FINISHED") {
          var score = `${matches.score.fullTime.homeTeam}-${matches.score.fullTime.awayTeam}`;
        }else if (matches.status === "SCHEDULED" || matches.status === "POSTPONED"){
          var score = `-`;
        }
        bodyJadwalClubsHTML += `
          <tr>
            <td>${matches.competition.name}</td>
            <td>${matches.utcDate}</td>
            <td>${matches.homeTeam.name} VS ${matches.awayTeam.name}</td>
            <td>${score}</td>
            <td>${matches.status}</td>
            <td><a class="waves-effect waves-light btn" onclick="deleteMatch(${matches.id})">Hapus</a></td>
          </tr>
        `;
      });
      jadwalClubsHTML = `
           <div class="col s12">
            <div class="card">
              <div class="card-content">
                <table class="responsive-table striped centered">
                   <head>
                    <tr>
                      <th style="text-align: center;">Kompetisi</th>
                      <th style="text-align: center;">Jadwal</th>
                      <th style="text-align: center;">Home VS Away</th>
                      <th style="text-align: center;">Score</th>
                      <th style="text-align: center;">Status</th>
                      <th style="text-align: center">Aksi</th>
                    </tr>
                  </head>
                  <body>${bodyJadwalClubsHTML}</body>
                </table>
              </div>
            </div>
          </div>
      `;
      if (dataMatches.lenght === 0) {
        bodyJadwalClubsHTML += `
           <tr>
              <td colspan="6">Data Jadwal Anda yang Tersimpan Kosong.</td>
           </tr>`;
        jadwalClubsHTML += `
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <table class="responsive-table striped centered">
                   <head>
                    <tr>
                      <th style="text-align: center;">Kompetisi</th>
                      <th style="text-align: center;">Jadwal</th>
                      <th style="text-align: center;">Home VS Away</th>
                      <th style="text-align: center;">Score</th>
                      <th style="text-align: center;">Status</th>
                      <th style="text-align: center">Aksi</th>
                    </tr>
                  </head>
                  <body>${bodyJadwalClubsHTML}</body>
                </table>
              </div>
            </div>
          </div>
        `; 
      }
      document.getElementById("favorite").innerHTML = jadwalClubsHTML;
      hiddenLoading();
    });
  }

  function showNotification(){
    const title = 'Notifikasi Football Apps';
    const options = {
        'body': 'Ini adalah konten notifikasi.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
  }

  