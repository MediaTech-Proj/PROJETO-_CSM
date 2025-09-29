# MediaTech Store

**MediaTech Store** é uma aplicação web estática voltada para o entretenimento, exibindo uma seleção de filmes e séries gratuitos, organizados por categorias. A proposta é oferecer uma vitrine amigável e acessível para navegação de conteúdos variados, com destaque para os mais assistidos.

---

## Decisões de Design

- **Separação por Setores:**   Por enquanto o site é dividido em 3 páginas principais, com links acessíveis no menu superior:
  - Filmes e Séries
  - Login
  - Cadastro

- **Design unificado:** Todas as páginas utilizam a mesma estrutura base de navegação e o mesmo arquivo CSS, garantindo consistência visual.
- **Conteúdo simulado com imagens reais:** As imagens usadas são reais, mas ainda servem como demonstração de layout. Isso permite visualizar a estrutura de exibição antes da integração com banco de dados.
- **Responsividade inicial:** A tag `<meta viewport>` foi aplicada para garantir compatibilidade com dispositivos móveis, embora ainda não haja media queries específicas.

---

## Tecnologias Utilizadas

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- CSS3
- HTML5     

---

## Funcionalidades e Soluções

- **Menu funcional:** Links navegáveis entre todas as páginas dos setores.
- **Layout em grade:** Cada categoria apresenta os itens com imagens em grade (`div.filmes`, `div.filme`).
- **Rodapé institucional:** Presente em todas as páginas, com informações de contato e links úteis.
- **Diferenciação de cor nos menus:** As páginas destacam os setores com cores diferentes para melhor orientação do usuário.

---

## Motivações e Justificativas

- **Divisão temática:** Facilita a expansão do projeto, permitindo que cada setor evolua separadamente (ex: games podem futuramente ter filtros por gênero ou plataforma).
- **Facilidade de manutenção:** A estrutura modular permite que os arquivos sejam editados individualmente sem comprometer a página principal.
- **Foco no conteúdo visual:** Como se trata de um site de entretenimento e tecnologia, a ênfase foi dada a imagens grandes e impactantes.

---

### Conformidade com a LGPD

A MediaTech Store, implementou medidas de conformidade com a Lei Geral de Proteção de Dados (LGPD). Esta etapa visa garantir a privacidade e segurança dos dados pessoais dos usuários, abordando as seguintes áreas:

1. Identificação dos Tipos de Dados Pessoais e Sensíveis Tratados
Definição clara dos dados coletados, como nome, e-mail, endereço de entrega, dados de pagamento, entre outros.

Identificação de dados sensíveis que possam ser coletados, como informações financeiras.

2. Bases Legais Aplicáveis para o Tratamento de Dados
Consentimento, execução de contrato, cumprimento de obrigação legal e legítimo interesse serão as bases legais consideradas para o tratamento de dados pessoais.

3. Principais Riscos à Privacidade e Medidas de Mitigação
Implementação de criptografia, controle de acesso, monitoramento e auditoria para proteger dados pessoais.

Garantia de transparência no uso dos dados, com opções de controle por parte do usuário.

4. Estratégias de Implementação dos Direitos dos Titulares
Desenvolvimento de um painel de controle para que os usuários possam acessar, corrigir ou excluir seus dados, conforme os direitos previstos pela LGPD.

5. Proposta de Arquitetura Segura e Conformidade
Adoção de criptografia, autenticação multifatorial e backups seguros para proteger os dados e garantir a conformidade com a LGPD.

6. Mecanismo de Aceite das Condições de Uso e Armazenamento de Dados
Implementação de um sistema de consentimento explícito para coleta de dados, incluindo a aceitação da política de privacidade e a utilização de cookies, com a opção de configuração por parte do usuário.

---

## Como Executar Localmente

## Pré-requisitos

Certifique-se de que a máquina tenha instalado:

- Node.js e npm
- MySQL (ou XAMPP/WAMP)
- Editor de código (ex: VSCode)

## Clonar ou baixar projeto

   ```bash
   [git clone https://github.com/alicecustodiodecarvalho/MediaTechStore-proj.git](https://github.com/MediaTech-Proj/PROJETO-_CSM.git)
   ```

## Configurar o Backend

Abra o terminal e entre na pasta do backend:

- cd server
- npm install

Crie um arquivo .env com as variáveis de ambiente:

env
DATABASE_URL="mysql://root:suasenha@localhost:3306/filmesdb"
JWT_SECRET="supersecret"
PORT=3001
Substitua sua senha pela senha do MySQL da máquina.

Crie o banco de dados no MySQL:

sql
CREATE DATABASE filmesdb;

Rode as migrations do Prisma:

- npx prisma migrate dev --name init

Abra o Prisma Studio se quiser conferir as tabelas:

- npx prisma studio

Inicie o backend:

npm run dev
O backend ficará rodando em: http://localhost:3001

## Configurar o Frontend

Abra um segundo terminal e entre na pasta do frontend (diretório raiz mesmo):

bash
-npm install
-npm run dev
-O Vite mostrará o endereço local
-Abra no navegador para acessar o site.

## Observações
Certifique-se de que frontend e backend estão rodando ao mesmo tempo, ou seja são dois terminais um para o frontend e outro para o backend.

## Relatório (Implementação de CRUD)
Entidade escolhida e justificativa:
A entidade escolhida para o CRUD foi Usuário, incluindo distinção entre usuários comuns e administradores. Essa escolha se justifica porque o sistema precisava gerenciar acessos, controlar permissões e permitir que admins pudessem visualizar, criar, editar e deletar usuários. Além disso, gerenciar usuários é uma funcionalidade essencial para qualquer aplicação com login, garantindo que cada perfil tenha o acesso adequado às informações e funcionalidades.

Tecnologias/Linguagens utilizadas:

Frontend: React + TypeScript, React Router para navegação, Tailwind CSS para estilização, React Query para gerenciamento de dados assíncronos, componentes customizados como Input, Button, Tabs do seu próprio design system.

Backend: Node.js + Express, Prisma ORM para integração com o banco MySQL, bcrypt para hashing de senhas, JWT para autenticação e controle de sessões.

Banco de dados: MySQL, utilizado via Prisma ORM para persistência de dados.

Desafios encontrados:

Autenticação e controle de roles: Foi necessário criar middlewares requireAuth e requireAdmin para proteger rotas e permitir que apenas admins acessassem páginas específicas. Houve erros com user.role undefined, solucionado garantindo que todos os usuários tivessem a propriedade role no banco.

Gerenciamento de erros e tokens: Durante o login e requisições de admin, surgiam erros de token inválido ou expirado. Resolvido garantindo que o token fosse salvo no localStorage, incluído no header Authorization e validado em todas as rotas protegidas.

# PROJETO-_CSM

RGM: 39417778 - Alice Custódio de Carvalho: 
Linguagens e Ferramentas:
* Java
* Js
* Flutter
* React
* React Native
* TypeScript
* Python
* PHP
* HTML
* CSS
* VSCODE

RGM: 37421298 - Bruno Dias Da Rocha Machado: 
Linguagens e Ferramentas:
* HTML
* Java
* JS
* Python
* CSS
* C#
* VsCode

RGM: 037829289 - Luiz Eduardo Frias Lopes Cardoso Rubião: 
Linguagens e Ferramentas:
* Java
* JS
* Kotlin
* Python
* HTML
* CSS
* VSCODE

RGM: 38449871 - Luiz Felipe: 
Linguagens e Ferramentas:
* HTML
* CSS
* JS
* Python
* Java
* VsCode

RGM: 38506424 - Nelson Kimitsugu Higashi: 
Linguagens e Ferramentas:
* Python
* Html
* JS
* CSS
* Java
* VsCODE
