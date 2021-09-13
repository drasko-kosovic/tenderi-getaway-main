export interface INarucilac {
  id?: number;
  naziv?: string | null;
  racun?: string | null;
  telefon?: string | null;
  pib?: string | null;
  pdv?: string | null;
  odgovornoLiceNarucioca?: string | null;
  email?: string | null;
  adresa?: string | null;
}

export class Narucilac implements INarucilac {
  constructor(
    public id?: number,
    public naziv?: string | null,
    public racun?: string | null,
    public telefon?: string | null,
    public pib?: string | null,
    public pdv?: string | null,
    public odgovornoLiceNarucioca?: string | null,
    public email?: string | null,
    public adresa?: string | null
  ) {}
}

export function getNarucilacIdentifier(narucilac: INarucilac): number | undefined {
  return narucilac.id;
}
