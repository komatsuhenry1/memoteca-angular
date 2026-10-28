# Resumo Angular: Memoteca

Leitura de ~5 minutos com o que vimos até aqui.

---

## 1. Rodando o projeto

- `npm install` instala as dependências na pasta `node_modules`. Sem isso, o `ng serve` falha com *"Could not find the '@angular-devkit/build-angular:dev-server' builder"*.
- `ng serve` sobe o projeto em `localhost:4200`.
- `ng generate component caminho/nome` cria um componente e já o declara no `app.module.ts`.
- **Erro comum:** importar no `app.module.ts` um componente cujo arquivo não existe. O build quebra com `NG1010 ... Unknown reference`.
- Não rode `npm audit fix --force` num projeto de curso: ele atualiza pacotes e quebra a versão do Angular.

---

## 2. Componentes

Um componente é formado por 3 arquivos:

| Arquivo | Papel |
|---|---|
| `.ts` | Lógica: propriedades e métodos |
| `.html` | Template (o que aparece na tela) |
| `.css` | Estilo, só daquele componente |

```ts
@Component({
  selector: 'app-criar-pensamento',          // tag usada no HTML
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent { }
```

Todo componente precisa estar em `declarations` no `app.module.ts`.

---

## 3. Métodos em TypeScript

Dentro de uma **classe**, não se usa a palavra `function`:

```ts
export class CriarPensamentoComponent {
  criarPensamento() {
    alert('clicou em criar');
  }
}
```

- Fora de classe: `function nome() {}` ou `const nome = () => {}`.
- No `.ts`, use `this.` para acessar propriedades e métodos da classe.
- No `.html`, use o nome direto, sem `this`.

---

## 4. HTML: cuidados e semântica

- **Toda tag aberta precisa ser fechada.** Um `<div>` sem `</div>` gera `NG5002: Unexpected closing tag`.
- `<input type="textarea">` não existe. Para várias linhas, use `<textarea></textarea>`.
- **Tags semânticas** dão significado ao conteúdo (acessibilidade e SEO):

| Tag | Uso |
|---|---|
| `<section>` | Bloco temático com título próprio |
| `<div>` | Só agrupar ou estilizar, sem significado |
| `<header>` / `<footer>` | Cabeçalho / rodapé |
| `<nav>` | Menu de navegação |
| `<main>` | Conteúdo principal (um por página) |
| `<article>` | Conteúdo independente (ex.: um card de pensamento) |

---

## 5. Data binding

É a ligação entre o `.ts` e o `.html`.

| Sintaxe | Nome | Direção |
|---|---|---|
| `{{ valor }}` | Interpolação | componente → tela (vira texto) |
| `[prop]="valor"` | Property binding | componente → tela |
| `(evento)="metodo()"` | Event binding | tela → componente |
| `[(ngModel)]="valor"` | Two-way binding | os dois sentidos |

```html
<p>{{ pensamento.conteudo }}</p>
<button [disabled]="botaoDesabilitado">Salvar</button>
<button (click)="criarPensamento()">Salvar</button>
<input [(ngModel)]="pensamento.autoria">  <!-- precisa do FormsModule -->
```

**Atenção aos colchetes:**

```html
<img src="imagem">     <!-- texto literal "imagem" -->
<img [src]="imagem">   <!-- valor da variável imagem -->
```

---

## 6. Rotas

Rotas trocam o componente exibido conforme a URL, sem recarregar a página (SPA).

**1. Definir as rotas** em `app-routing.module.ts`:

```ts
const routes: Routes = [
  { path: '', redirectTo: 'listarPensamento', pathMatch: 'full' },
  { path: 'criarPensamento', component: CriarPensamentoComponent },
  { path: 'listarPensamento', component: ListarPensamentosComponent },
];
```

O `path` vai sem a barra inicial.

**2. Onde o componente aparece:**

```html
<app-cabecalho></app-cabecalho>
<main>
  <router-outlet></router-outlet>  <!-- aqui entra o componente da rota -->
</main>
<app-rodape></app-rodape>
```

**3. Navegar:**

```html
<a routerLink="/criarPensamento" routerLinkActive="active">Novo</a>
```

```ts
constructor(private router: Router) {}
cancelar() { this.router.navigate(['/listarPensamento']); }
```

- `routerLink` é o `href` do Angular, sem recarregar a página.
- `routerLinkActive="active"` adiciona a classe `active` quando aquela rota está aberta, para destacar o item do menu.

**Fluxo:** clique → URL muda → Angular procura nas `routes` → renderiza no `<router-outlet>`.

---

## 7. Ferramentas do VS Code

- **Angular Language Service**: autocomplete e erros dentro dos templates HTML. É a extensão mais importante.
- **Path Intellisense**: completa caminhos de arquivos.
- **IntelliSense for CSS class names**: sugere classes CSS no `class=""` (opcional).
- O IntelliSense básico já vem no VS Code. O IntelliCode (IA) foi descontinuado e o substituto é o GitHub Copilot.

---

## 8. Diretivas do Angular

**Diretivas são instruções que você coloca no HTML para mudar a aparência, o comportamento ou a estrutura dos elementos.** Elas são classes com o decorator `@Directive`. Você já usou várias sem perceber.

Existem 3 tipos:

### 8.1 Componentes

Um componente é uma **diretiva com template**. Toda vez que você escreve `<app-cabecalho>`, está usando uma diretiva.

### 8.2 Diretivas de atributo

Mudam a **aparência ou o comportamento** de um elemento que já existe. Elas não criam nem removem elementos.

```html
<!-- adiciona classes CSS conforme uma condição -->
<div [ngClass]="{ 'modelo1': modelo === 'modelo1', 'destaque': favorito }"></div>

<!-- aplica estilos dinâmicos -->
<p [ngStyle]="{ 'font-size': tamanho + 'px' }">Texto</p>

<!-- liga um input a uma propriedade (two-way) -->
<input [(ngModel)]="pensamento.conteudo">
```

`routerLink` e `routerLinkActive` também são diretivas de atributo.

### 8.3 Diretivas estruturais

Mudam a **estrutura do DOM**: adicionam, removem ou repetem elementos. Elas começam com **`*`**.

```html
<!-- *ngIf: só renderiza se a condição for verdadeira -->
<div *ngIf="listaPensamentos.length > 0; else semPensamentos">
  <!-- *ngFor: repete o elemento para cada item da lista -->
  <app-pensamento
    *ngFor="let pensamento of listaPensamentos"
    [pensamento]="pensamento">
  </app-pensamento>
</div>

<ng-template #semPensamentos>
  <p>Ainda não há pensamentos no mural!</p>
</ng-template>
```

```html
<!-- ngSwitch: escolhe um entre vários blocos -->
<div [ngSwitch]="modelo">
  <p *ngSwitchCase="'modelo1'">Modelo 1</p>
  <p *ngSwitchCase="'modelo2'">Modelo 2</p>
  <p *ngSwitchDefault>Escolha um modelo</p>
</div>
```

**Atenção:** um elemento só pode ter **uma** diretiva estrutural. Para usar `*ngIf` e `*ngFor` juntos, coloque um dentro do outro, por exemplo usando `<ng-container>`, que não gera tag no HTML final.

### Resumo das diretivas

| Tipo | O que faz | Exemplos |
|---|---|---|
| Componente | Diretiva com template próprio | `<app-cabecalho>` |
| Atributo | Muda aparência ou comportamento | `ngClass`, `ngStyle`, `ngModel`, `routerLink` |
| Estrutural (`*`) | Adiciona, remove ou repete elementos | `*ngIf`, `*ngFor`, `*ngSwitchCase` |

> Nas versões mais novas do Angular (17+), existem também `@if`, `@for` e `@switch` direto no template. No curso (Angular 14), use `*ngIf` e `*ngFor`.
