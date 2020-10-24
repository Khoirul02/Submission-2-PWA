  // Membuka Akses DB
  let dbPromised = idb.open("football", 1, upgradeDb => {
  let footballObjectStore = upgradeDb.createObjectStore("matches", {
    keyPath: "id"
    });
  });

  //Insert Data Matches
  function insertMatches(matchId){
    let match = dataMatches.matches.filter(el => el.id == matchId)[0]
    dbPromised.then(db => {
      let tx = db.transaction("matches", "readwrite");
      let store = tx.objectStore("matches");
      console.log(match);
      store.put(match);
      return tx.complete;
    }).then(function() {
      M.toast({html: 'Berhasil disimpan.', classes: 'rounded'});
      console.log('Pertandingan berhasil disimpan.');
    }).catch(function(e) {
      console.error('Pertandingan gagal disimpan', e);
    });
  }

  //Hapus Pertandingan
  function deleteMatch(matchId){
    let notif = confirm("Hapus Pertandingan dari daftar Favorit?")
    if (notif === true) {
      deleteMatches(matchId);
    }
  }

  //Delete Data Matches
  function deleteMatches(matchId){
    dbPromised.then(db => {
      let tx = db.transaction("matches", "readwrite");
      let store = tx.objectStore("matches");
      store.delete(matchId);
      return tx.complete;
    }).then(function() {
      saveMatches();
      M.toast({html: 'Berhasil dihapus.', classes: 'rounded'});
      console.log('Pertandingan berhasil dihapus.');
    }).catch(function(e) {
      console.error('Pertandingan gagal dihapus', e);
    });
  }