# Projeto Study Webpack

Baseado no curso do Alura [Webpack: Manipulando módulos na sua webapp](https://cursos.alura.com.br/course/webpack)

## Como executa o cliente
Não esqueçam de entrar dentro da pasta `client` e executar o comando `npm install` antes de utilizar o projeto.

Para ativar a compilação em tempo real, dentro de `client`, execute o comando `npm run watch`.

## Como executar o servidor

`npm start`

## Como realizar o build:

* Desenvolvimento:
    * `npm run build-dev`

* Produção
    * `npm run build-prod`

## Esse projeto possui:
* Bundle de CSS minificado
* Bundle de JS em módulos minificado
* Carregamento lazy loading de classes através do import
* Geração do arquivo index.html com os imports de css e js gerados automaticamente
* Alteração do uso da URL da aplicação de maneira "global"