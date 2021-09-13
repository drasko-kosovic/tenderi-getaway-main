export interface IAnex {
  id?: number;
  sifra_postupka?: number | null;
  sifra_ponude?: number | null;
  atc?: string | null;
  inn?: string | null;
  zasticeni_naziv?: string | null;
  farmaceutski_oblik_lijeka?: string | null;
  jacina_lijeka?: string | null;
  pakovanje?: string | null;
  trazena_kolicina?: number | null;
  procijenjena_vrijednost?: number | null;
  rok_isporuke?: number | null;
  naziv_ponudjaca?: string | null;
  naziv_proizvodjaca?: string | null;
}

export class Anex implements IAnex {
  constructor(
    public id?: number,
    public sifra_postupka?: number | null,
    public sifra_ponude?: number | null,
    public atc?: string | null,
    public inn?: string | null,
    public zasticeni_naziv?: string | null,
    public farmaceutski_oblik_lijeka?: string | null,
    public jacina_lijeka?: string | null,
    public pakovanje?: string | null,
    public trazena_kolicina?: number | null,
    public procijenjena_vrijednost?: number | null,
    public rok_isporuke?: number | null,
    public naziv_ponudjaca?: string | null,
    public naziv_proizvodjaca?: string | null
  ) {}
}

export function getAnexIdentifier(anex: IAnex): number | undefined {
  return anex.id;
}
