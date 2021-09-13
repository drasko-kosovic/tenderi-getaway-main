export interface ISpecifikacije {
  id?: number;
  sifraPostupka?: number;
  brojPartije?: number;
  atc?: string | null;
  inn?: string | null;
  farmaceutskiOblikLijeka?: string | null;
  jacinaLijeka?: string | null;
  jedinicaMjere?: string | null;
  procijenjenaVrijednost?: number | null;
  pakovanje?: string | null;
  trazenaKolicina?: number | null;
}

export class Specifikacije implements ISpecifikacije {
  constructor(
    public id?: number,
    public sifraPostupka?: number,
    public brojPartije?: number,
    public atc?: string | null,
    public inn?: string | null,
    public farmaceutskiOblikLijeka?: string | null,
    public jacinaLijeka?: string | null,
    public jedinicaMjere?: string | null,
    public procijenjenaVrijednost?: number | null,
    public pakovanje?: string | null,
    public trazenaKolicina?: number | null
  ) {}
}

export function getSpecifikacijeIdentifier(specifikacije: ISpecifikacije): number | undefined {
  return specifikacije.id;
}
