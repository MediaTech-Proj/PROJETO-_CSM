# MediaTech Store

**MediaTech Store** é uma aplicação web estática voltada para o entretenimento, exibindo uma seleção de filmes e séries gratuitos, organizados por categorias. A proposta é oferecer uma vitrine amigável e acessível para navegação de conteúdos variados, com destaque para os mais assistidos.

---

## Estrutura do Projeto

```
MediaTechStore/
├── index.html              # Página principal do projeto
├── series.html             # Página de Séries
├── games.html              # Página de Jogos 
├── tecnologia.html         # Página de Acessórios e Tecnologia
├── contato.html            # Página de Contato
├── css/
│   └── style.css           # Estilos da página
└── imagens e recursos      # As imagens atualmente são carregadas por URL externa
```

---

## Decisões de Design

- **Separação por Setores:** O site agora é dividido em seis páginas principais, com links acessíveis no menu superior:
  - Filmes (index.html)
  - Séries (series.html)
  - Games (games.html)
  - Acessórios (tecnologia.html)
  - Tecnologia (também em tecnologia.html)
  - Contato (contato.html)

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

### Etapa Futura: Conformidade com a LGPD
A MediaTech Store, como parte de suas ações futuras, implementará medidas de conformidade com a Lei Geral de Proteção de Dados (LGPD). Esta etapa visa garantir a privacidade e segurança dos dados pessoais dos usuários, abordando as seguintes áreas:

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

Essa etapa será incluída no roadmap do projeto, com a implementação detalhada a ser realizada após a conclusão das funcionalidades principais do e-commerce. Toda a documentação será atualizada com os procedimentos e ferramentas utilizados para garantir a conformidade com a LGPD.

---

## Como Executar Localmente

1. **Baixe ou clone o projeto:**

   ```bash
   git clone https://github.com/alicecustodiodecarvalho/MediaTechStore-proj.git
   ```

2. **Abra o projeto:**

   Basta abrir o arquivo `index.html` com um navegador. Você pode fazer isso de duas formas:

   - Clicando duas vezes no arquivo
   - Ou pelo terminal:
     ```bash
     start index.html       # Windows
     open index.html        # macOS
     xdg-open index.html    # Linux
     ```



# PROJETO-_CSM

RGM: 39417778 - Alice Custódio de Carvalho
RGM: 39417778 - Alice Custódio de Carvalho: 
Linguagens e Ferramentas:
* Java
* Js
@@ -11,11 +11,16 @@ Linguagens e Ferramentas:
* Flutter
* VSCODE

RGM: 37421298 - Bruno Dias Da Rocha Machado
RGM: 37421298 - Bruno Dias Da Rocha Machado: 
Linguagens e Ferramentas:
* 
* Java
* JS
* Python
* CSS
* C#
* VsCode

RGM: 037829289 - Luiz Eduardo Frias Lopes Cardoso Rubião
RGM: 037829289 - Luiz Eduardo Frias Lopes Cardoso Rubião: 
Linguagens e Ferramentas:
* Java
* Kotlin
@@ -26,10 +31,20 @@ Linguagens e Ferramentas:
* Python
* VSCODE

RGM: 38449871 - Luiz Felipe
RGM: 38449871 - Luiz Felipe: 
Linguagens e Ferramentas:
*
* HTML
* CSS
* JS
* Python
* Java
* VsCode

RGM: 38506424 - Nelson Kimitsugu Higashi
RGM: 38506424 - Nelson Kimitsugu Higashi: 
Linguagens e Ferramentas:
*
* Python
* Html
* JS
* CSS
* Java
* VsCODE
