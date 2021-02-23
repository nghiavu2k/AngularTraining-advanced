import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/service/hero.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})


export class ListComponent implements OnInit {
  list: Hero[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'address',
    'dob',
    'email',
    'career',
    'hobby',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Hero>();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.list = this.heroService.getHeros();
    this.dataSource.data = this.list;
  }

  delete(id: number) {
    for (let [index, item] of this.list.entries()) {
      if (item.id == id) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.heroService.deleteHero(index + 1);
        break;
      }
    }
  }
}