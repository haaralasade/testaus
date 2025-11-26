/*
TIKO RAVINTOLA
OHJELMAKOODI
*/

const Ravintola = function () {
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 4 },
    { ruoka: 'Leipä', hinta: 2 },
    { ruoka: 'Vihersalaatti', hinta: 3 },
    { ruoka: 'Salsa', hinta: 2 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 7 },
    { ruoka: 'Makaroonilaatikko', hinta: 6 },
    { ruoka: 'Kasvispihvi', hinta: 8 },
    { ruoka: 'Kanasalaatti', hinta: 7 },
  ];
  this.jalkiruoat = [
    { ruoka: 'Hedelmäsalaatti', hinta: 4 },
    { ruoka: 'Jäätelö', hinta: 3 },
    { ruoka: 'Pulla', hinta: 2 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { ruoka: 'Tee', hinta: 2 },
    { ruoka: 'Kahvi', hinta: 3 },
    { ruoka: 'Maito', hinta: 2 },
    { ruoka: 'Mehu', hinta: 3 },
  ];

  this.paikkojenMaara = 15;
  this.paikat = null;
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Luo paikat-taulukon ja täyttää sen false-arvoilla.
 * Taulukon koko määräytyy paikkojenMaara-muuttujasta.
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
};

/**
 * Varaa paikkoja ravintolasta.
 *
 * 1. Jos paikat-taulukkoa ei ole, se luodaan generoiPaikat-funktiolla.
 * 2. Jos varauksenMaara on undefined, arvoksi asetetaan 1.
 * 3. Lasketaan vapaiden paikkojen määrä (false-arvot).
 * 4. Jos vapaita paikkoja < varauksenMaara → palautetaan false.
 * 5. Muuten muutetaan tarvittava määrä false → true.
 *
 * @param {number} varauksenMaara Kuinka monta paikkaa halutaan varata.
 * @return {boolean} Onnistuiko varaus.
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara = 1) {
  if (!Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  const vapaat = this.paikat.filter(p => p === false).length;

  if (vapaat < varauksenMaara) {
    return false;
  }

  let varattavia = varauksenMaara;

  for (let i = 0; i < this.paikat.length && varattavia > 0; i++) {
    if (this.paikat[i] === false) {
      this.paikat[i] = true;
      varattavia--;
    }
  }

  return true;
};

/**
 * Tarkistaa paikkamäärän.
 */
Ravintola.prototype.tarkistaPaikkojenMaara = function (asiakkaidenMaara) {
  if (typeof asiakkaidenMaara !== 'number') {
    throw new TypeError();
  }
  if (asiakkaidenMaara <= 0) {
    console.log(
      'Ikävä kyllä emme voi tarjoilla ' + asiakkaidenMaara + ' asiakkaalle.'
    );
    return false;
  } else if (asiakkaidenMaara <= this.paikkojenMaara) {
    console.log(
      'Tilaa on ' + asiakkaidenMaara + ' asiakkaalle. Tervetuloa ravintolaamme!'
    );
    return true;
  } else {
    console.log(
      'Ikävä kyllä ravintolaamme ei mahdu ' + asiakkaidenMaara + ' asiakasta.'
    );
    return false;
  }
};

/**
 * Luo tilaukset ja hoitaa paikkavaraukset.
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  const onTilaa = this.tarkistaPaikkojenMaara(asiakkaidenMaara);
  if (!onTilaa) return;

  // 🔥 UUSI: varaa paikat ennen syömistä
  if (!this.varaaPaikat(asiakkaidenMaara)) {
    console.log('Paikkoja ei onnistuttu varaamaan.');
    return;
  }

  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. Mitä teille saisi olla?'
    );
    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean())
    );
    console.log('Asiakkaalle tarjoiltu. Hyvää ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * Luo tilaus ja palauttaa ruoat + laskun.
 */
Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  ) {
    throw new TypeError();
  }

  const ruoat = [];
  let ruokaObj;

  // Alkuruoka
  if (ottaaAlkuruoan) {
    ruokaObj = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log('Ottaisin alkuruoaksi: ' + ruokaObj.ruoka);
    ruoat.push(ruokaObj);
  }

  // Pääruoka (aina otetaan)
  ruokaObj = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log('Ottaisin pääruoaksi: ' + ruokaObj.ruoka);
  ruoat.push(ruokaObj);

  // Jälkiruoka
  if (ottaaJalkiruoan) {
    ruokaObj = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log('Ottaisin jälkiruoaksi: ' + ruokaObj.ruoka);
    ruoat.push(ruokaObj);
  }

  // Juoma
  if (ottaaJuoman) {
    ruokaObj = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log('Ottaisin juomaksi: ' + ruokaObj.ruoka);
    ruoat.push(ruokaObj);
  }

  const summa = this.laskeLasku(ruoat);

  return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee laskun ruokaobjektien hinnoista.
 *
 * @param {{ruoka:string, hinta:number}[]} ruoat Ruokaobjektit
 * @return {number} Laskun loppusumma
 */
Ravintola.prototype.laskeLasku = function (ruoat) {
  return ruoat.reduce((sum, r) => sum + r.hinta, 0);
};

const ravintola = new Ravintola();

export default ravintola;

