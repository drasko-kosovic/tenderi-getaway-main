import * as dayjs from 'dayjs';

export interface IViewPonude {
  id?: number;
  sifraPostupka?: number | null;
  sifraPonude?: number | null;
  brojPartije?: number | null;
  sifraPonudjaca?: number | null;
  nazivPonudjaca?: string | null;
  nazivProizvodjaca?: string | null;
  zasticeniNaziv?: string | null;
  ponudjenaVrijednost?: number | null;
  rokIsporuke?: number | null;
  selected?: boolean | null;
  datumPonude?: dayjs.Dayjs | null;
}

export class ViewPonude implements IViewPonude {
  constructor(
    public id?: number,
    public sifraPostupka?: number | null,
    public sifraPonude?: number | null,
    public brojPartije?: number | null,
    public sifraPonudjaca?: number | null,
    public nazivPonudjaca?: string | null,
    public nazivProizvodjaca?: string | null,
    public zasticeniNaziv?: string | null,
    public ponudjenaVrijednost?: number | null,
    public rokIsporuke?: number | null,
    public selected?: boolean | null,
    public datumPonude?: dayjs.Dayjs | null
  ) {
    this.selected = this.selected ?? false;
  }
}

export function getViewPonudeIdentifier(viewPonude: IViewPonude): number | undefined {
  return viewPonude.id;
}
