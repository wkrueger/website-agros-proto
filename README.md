# simfaz-site

Feito usando o [next.js](https://nextjs.org/docs). (usado em sites como [nubank](nubank.com.br), [netflix jobs](https://jobs.netflix.com/), [square enix](https://plot.ly/), [plot.ly](plot.ly)).

Instalar: `npm i`. (necessário node.js 10+)

## Tasks

- `npm run dev` servidor local
- `npm run build && npm run static` gera export estático na pasta `out`

## Estrutura/editando

A maior parte do texto editável fica na pasta `components/Pages`, sendo que os blocos maiores de texto estão em arquivos markdown (.md).

(Se estiver configurado o CI) as atualizações no repositório devem ser refletidas no site no push. Ou seja, dá pra editar até direto no bitbucket pra fazer pequenas alterações de texto.

## Notas de dev

Foi feito experimento com o framework tailwind CSS. Algumas notas (que podem ser também obtidas lendo as docs do framework):

- O build de produção passa pelo "purgecss", o que PODE ser uma origem de problemas dependendo de como são colocadas as classes no styles.css
- O styles.css passa pelo pós-processador "postcss", conforme indicado na doc do framework, então apesar da extensão CSS ele aceita aninhamento e alguns operadores do tailwind como o @apply;
- Plugin "tailwind intellisense" pro VSCode;
- O `tailwind.config.js` permite personalizar padrões da framework, adicionar cores, fontes, etc...
