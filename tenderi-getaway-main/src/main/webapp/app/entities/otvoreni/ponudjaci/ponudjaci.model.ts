export interface IPonudjaci {
  id?: number;
  nazivPonudjaca?: string | null;
  odgovornoLice?: string | null;
  adresaPonudjaca?: string | null;
  bankaRacun?: string | null;
}

export class Ponudjaci implements IPonudjaci {
  constructor(
    public id?: number,
    public nazivPonudjaca?: string | null,
    public odgovornoLice?: string | null,
    public adresaPonudjaca?: string | null,
    public bankaRacun?: string | null
  ) {}
}

export function getPonudjaciIdentifier(ponudjaci: IPonudjaci): number | undefined {
  return ponudjaci.id;
}
