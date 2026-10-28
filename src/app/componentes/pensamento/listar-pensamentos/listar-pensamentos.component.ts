import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';


@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  constructor(
    private router: Router,
    private service: PensamentoService
  ) { }

  listaPensamentos: Pensamento[] = []

  ngOnInit(): void {
    this.service.listar().subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
  }

  redirecionarCriarPensamento(){
    this.router.navigate(['/criar-pensamento'])
  }

}
