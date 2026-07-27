# Portfólio · Yuri Donizete

Portfólio profissional em **Next.js 14 (App Router) + TypeScript + TailwindCSS + Framer Motion + Lucide**.
Tema escuro, minimalista, com animações suaves no padrão Vercel/Linear.

## Rodar localmente

Precisa ter o **Node.js 18+** instalado.

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Build de produção

```bash
npm run build
npm start
```

## Deploy

O jeito mais simples é a **Vercel** (mesma empresa do Next.js):

1. Suba este projeto para um repositório no GitHub.
2. Entre em vercel.com, clique em **Add New > Project** e importe o repositório.
3. A Vercel detecta o Next.js sozinho. É só clicar em **Deploy**.

Também funciona na Netlify conectando o repositório (ela roda o build). O que **não** funciona é arrastar a pasta pronta, porque Next.js precisa de build.

## O que editar (tudo em um lugar)

Quase todo o conteúdo está em **`src/data/site.ts`**. Abra esse arquivo e edite:

- `profile` — nome, cargo, frase, avatar, currículo
- `socials` — **confirme GitHub, LinkedIn e Instagram** (estão com um palpite, marcados com `TODO`)
- `about`, `techGroups`, `experience`, `projects`, `differentials`, `process`, `testimonials`

### Trocar as imagens

As imagens atuais são **placeholders abstratos** (gradientes azuis), só pra não abrir vazio. Substitua os arquivos mantendo os mesmos nomes:

- `public/avatar.jpg` — sua foto (quadrada fica melhor)
- `public/projects/pages.jpg`, `crm.jpg`, `media.jpg`, `automation.jpg` — prints reais dos projetos

### Currículo

Coloque seu PDF em `public/curriculo.pdf`. O botão "Currículo" no topo já aponta pra ele.
Enquanto não colocar, esse botão vai dar erro 404, então adicione antes de publicar.

## Projetos privados

Projetos com `private: true` em `site.ts` **não mostram botão de acesso**. Em vez disso aparece
o selo "Projeto privado" e a nota de confidencialidade, mas continuam exibindo problema,
resultado, arquitetura e tecnologias. Para um projeto público com repositório, preencha o
campo `github` (e `link` se tiver site no ar).

## Estrutura

```
src/
  app/            layout, página e estilos globais
  components/     seções (Hero, Sobre, Projetos, Contato...)
    ui/           peças reutilizáveis (Section, Reveal, Button)
  data/site.ts    TODO O CONTEÚDO fica aqui
  lib/utils.ts    utilitário de classes
public/           imagens e currículo
```
