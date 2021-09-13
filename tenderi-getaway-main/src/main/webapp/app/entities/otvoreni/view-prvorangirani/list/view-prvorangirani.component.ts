import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';


import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {IViewPrvorangirani} from "app/entities/otvoreni/view-prvorangirani/view-prvorangirani.model";
import {IPonudePonudjaci} from "app/entities/otvoreni/ponude/ponude_ponudjaci.model";
import {ViewPrvorangiraniService} from "app/entities/otvoreni/view-prvorangirani/service/view-prvorangirani.service";
import {PonudeService} from "app/entities/otvoreni/ponude/service/ponude.service";


@Component({
  selector: 'jhi-view-prvorangirani',
  templateUrl: './view-prvorangirani.component.html',
  styleUrls:['./view-prvorangirani.component.scss'],
})
export class ViewPrvorangiraniComponent implements OnChanges, AfterViewInit  {
  prvorangiranis?: IViewPrvorangirani[];
  ponude_ponudjaci?: IPonudePonudjaci[];
  ukupnaPonudjena?: number | null | undefined;
  ukupnaProcijenjena?: number | null | undefined;
  nadjiPonudjaca?: any;
  public displayedColumns = [
    'sifra postupka',
    'sifra ponude',
    'broj partije',
    'atc',
    'inn',
    'zasticeni naziv',
    'farmaceutski oblik',
    'jacina lijeka',
    'pakovanje',
    'procijenjena vrijednost',
    'kolicina',
    'ponudjena vrijednost',
    'rok isporuke',
    'naziv ponudjaca',
    'naziv proizvodjaca',
    'bod cijena',
    'bod rok',
    'bod ukupno',
  ];

  public dataSource = new MatTableDataSource<IViewPrvorangirani>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected prvorangiraniService: ViewPrvorangiraniService, protected ponudeService: PonudeService) {}

  public getAllPrvorangiraniPostupak(): void {
    this.prvorangiraniService.findPostupak(this.postupak).subscribe((res: IViewPrvorangirani[]) => {
      this.dataSource.data = res;
      this.prvorangiranis = res;
      this.getTotalCost();
    });
  }
  public getSifraPostupkaPonudePonudjaci(): void {
    this.ponudeService.findSiftraPostupakPonudePonudjaci(this.postupak).subscribe((res: IPonudePonudjaci[]) => {
      this.ponude_ponudjaci = res;
    });
  }
  public getSifraPonude(): void {
    this.prvorangiraniService.findPonude(this.nadjiPonudjaca).subscribe((res: IViewPrvorangirani[]) => {
      this.dataSource.data = res;
      this.prvorangiranis = res;
      this.getTotalCost();
      this.getTotalCostProcijenjena();
    });
  }
  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
    this.ukupnaProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  ngOnChanges(): void {
    this.getAllPrvorangiraniPostupak();
    this.getSifraPostupkaPonudePonudjaci();
    this.getTotalCost();
    this.getTotalCostProcijenjena();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTotalCost(): number {
    return <number>this.prvorangiranis?.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }
  getTotalCostProcijenjena(): any {
    return this.prvorangiranis?.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }
}
