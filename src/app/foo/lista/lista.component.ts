import { Component, OnInit } from '@angular/core';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit{
  foos: Foo[];
  constructor(private fooService:FooService){}

  ngOnInit():void{
    this.loadFoos();
  }

  loadFoos():void{
    this.fooService.list().subscribe({
      next: (data)=>{
        this.foos = data;
      },
      error:(err)=>{
        console.log(err)}
    })
  }
}
