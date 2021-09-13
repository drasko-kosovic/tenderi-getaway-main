import * as dayjs from 'dayjs';

export interface IPostupci {
  id?: number;
  sifraPostupka?: number;
  brojTendera?: string | null;
  opisPostupka?: string | null;
  vrstaPostupka?: string | null;
  datumObjave?: dayjs.Dayjs | null;
  datumOtvaranja?: dayjs.Dayjs | null;
}

export class Postupci implements IPostupci {
  constructor(
    public id?: number,
    public sifraPostupka?: number,
    public brojTendera?: string | null,
    public opisPostupka?: string | null,
    public vrstaPostupka?: string | null,
    public datumObjave?: dayjs.Dayjs | null,
    public datumOtvaranja?: dayjs.Dayjs | null
  ) {}
}

export function getPostupciIdentifier(postupci: IPostupci): number | undefined {
  return postupci.id;
}
