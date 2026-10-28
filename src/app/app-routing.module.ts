import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPensamentoComponent } from './componentes/pensamento/criar-pensamento/criar-pensamento.component';
import { ListarPensamentosComponent } from './componentes/pensamento/listar-pensamentos/listar-pensamentos.component';
import { ExcluirPensamentoComponent } from './componentes/pensamento/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './componentes/pensamento/editar-pensamento/editar-pensamento.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar-pensamento', pathMatch: 'full' },
  { path: 'criar-pensamento', component: CriarPensamentoComponent},
  { path: 'listar-pensamento', component: ListarPensamentosComponent},
  { path: 'pensamentos/excluir-pensamento/:id', component: ExcluirPensamentoComponent},
  { path: 'pensamentos/editar-pensamento/:id', component: EditarPensamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
