import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo : ''
  }

  constructor(private router: Router, private service: PensamentoService) { }

  ngOnInit(): void {

  }

  criarPensamento(){
    this.service.criar(this.pensamento).subscribe(() => {
    this.router.navigate(['/listar-pensamento'])
    })
    //alert("clicou em criar")
  }

  cancelarPensamento() {
    this.router.navigate(['/listar-pensamento'])
  }

}
