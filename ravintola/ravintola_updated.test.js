import { describe, it, expect, beforeEach } from 'vitest';
import ravintola from '../ravintola/ravintola_updated.js';
 
describe('Ravintola-testit', () => {
  // Resetoi paikat ennen jokaista testiä
  beforeEach(() => {
    ravintola.paikat = undefined;
  });
 
  // --------------------------------------------------------------------------
  // TESTITAPAUS 1
  // --------------------------------------------------------------------------
  it('Testitapaus 1: syoRavintolassa toimii kun asiakasmäärä ≤ paikkojen määrä', () => {
    const tulos = ravintola.syoRavintolassa(5);
    expect(tulos).toBeTruthy();
    expect(Array.isArray(tulos)).toBe(true);
    expect(tulos.length).toBe(5);
  });
 
  // --------------------------------------------------------------------------
  // TESTITAPAUS 2
  // --------------------------------------------------------------------------
  it('Testitapaus 2: Paikat täyttyvät kahdella peräkkäisellä kutsulla', () => {
    // Ensimmäinen kutsu 10 asiakkaalla
    const eka = ravintola.syoRavintolassa(10);
    expect(eka).toBeTruthy(); // onnistuu
 
    // Toinen kutsu 6 asiakkaalla -> ei pitäisi onnistua (enää 5 paikkaa jäljellä)
    const toka = ravintola.syoRavintolassa(6);
    expect(toka).toBeUndefined(); // syoRavintolassa palauttaa undefined kun varaus ei onnistu
  });
 
  // --------------------------------------------------------------------------
  // TESTITAPAUS 3
  // --------------------------------------------------------------------------
  it('Testitapaus 3: laskeLasku laskee ruokaobjektien hinnat oikein', () => {
    const ruoat = [
      { ruoka: 'Testi1', hinta: 4 },
      { ruoka: 'Testi2', hinta: 7 },
      { ruoka: 'Testi3', hinta: 3 },
    ];
 
    const summa = ravintola.laskeLasku(ruoat);
    expect(summa).toBe(14); // 4 + 7 + 3 = 14
  });
});