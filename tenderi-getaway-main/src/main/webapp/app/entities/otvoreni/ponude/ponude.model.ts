import * as dayjs from 'dayjs';

export interface IPonude {
  id?: number;
  sifraPonude?: number;
  sifraPostupka?: number;
  brojPartije?: number;
  nazivProizvodjaca?: string | null;
  zasticeniNaziv?: string | null;
  ponudjenaVrijednost?: number | null;
  rokIsporuke?: number | null;
  datumPonude?: dayjs.Dayjs | null;
  sifraPonudjaca?: number | null;
  selected?: boolean | null;
}

export class Ponude implements IPonude {
  constructor(
    public id?: number,
    public sifraPonude?: number,
    public sifraPostupka?: number,
    public brojPartije?: number,
    public nazivProizvodjaca?: string | null,
    public zasticeniNaziv?: string | null,
    public ponudjenaVrijednost?: number | null,
    public rokIsporuke?: number | null,
    public datumPonude?: dayjs.Dayjs | null,
    public sifraPonudjaca?: number | null,
    public selected?: boolean | null
  ) {
    this.selected = this.selected ?? false;
  }
}

export function getPonudeIdentifier(ponude: IPonude): number | undefined {
  return ponude.id;
}
