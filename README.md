# 🌐 PI4Front - Painel de Monitoramento de Dados de Sensores

> 🔬 **Projeto Integrador 4 da Univesp** (Universidade Virtual do Estado de São Paulo)  
> 🚀 Um dashboard moderno para monitorar dados de sensores, como temperatura e umidade, com autenticação segura e visualizações em tempo real.

---

## ✨ Recursos

- 🔐 **Autenticação de Usuários**: Login seguro com tokens JWT
- 🔒 **Rotas Protegidas**: Controle de acesso a dados sensíveis
- 📊 **Visualização de Dados Interativa**: Gráficos dinâmicos de temperatura e umidade
- 📅 **Análise Histórica**: Visualize os dados em diferentes períodos (1h, 6h, 24h)
- 📈 **Dashboard de Estatísticas**: Valores mínimos, máximos e médios dos sensores
- ⚠️ **Detecção de Anomalias**: Identificação automática de medições fora do padrão
- 📱 **Design Responsivo**: Funciona perfeitamente em desktops e dispositivos móveis
- 💡 **Tema Escuro Moderno**: Experiência visual confortável em ambientes com pouca luz

---

## ⚙️ Tecnologias Utilizadas

| Categoria             | Ferramentas |
|-----------------------|------------|
| 🎮 Frontend            | React 19 + TypeScript |
| 🔧 Build Tool          | Vite |
| 🎨 Estilização          | Tailwind CSS |
| 🗺️ Roteamento          | React Router v7 |
| 📦 Gerenciamento de Estado | Redux Toolkit |
| 🌐 Comunicação com API  | Axios |
| 📊 Gráficos            | Chart.js + React Chart.js 2 |
| ☁️ Implantação          | Docker, Nginx |

---

## 🗂️ Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis (ex: cards, gráficos)
├── context/        # Contexto de autenticação com React
├── hooks/          # Hooks personalizados (ex: useAuth, useApi)
├── pages/          # Páginas do aplicativo (Login, Dashboard, etc.)
├── store/          # Configuração do Redux Toolkit
├── types/          # Tipos TypeScript para dados e interfaces
└── utils/          # Funções úteis (ex: formatação de datas)

public/
└── vite.svg        # Logo do aplicativo

docker-compose.yml  # Ambiente de desenvolvimento com serviços adicionais
Dockerfile          # Configuração de build para produção
nginx.conf         # Configuração do Nginx para hospedagem
```

---

## 🛠️ Pré-requisitos

- Node.js (versão 18 ou superior)  
- npm (geralmente instalado com o Node)

---

## 📥 Instalação

1. Clone este repositório:
```bash
git clone <repository-url>
cd pi4front
```

2. Instale as dependências:
```bash
npm install
```

---

## ▶️ Rodando a Aplicação

### Modo Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

---

### Build para Produção

Gere uma versão otimizada do projeto:

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/`.

---

### Pré-visualização da Versão de Produção

Veja como o app se comporta localmente antes de deploy:

```bash
npm run preview
```

---

## 🐳 Implantação com Docker

O aplicativo pode ser contêinerizado facilmente usando Docker.

### Construa a Imagem

```bash
npm run docker:build
```

### Execute o Container

```bash
npm run docker:run
```

A aplicação será acessível em `http://localhost:8080`.

---

### Desenvolvimento com Docker Compose (Ambiente Completo)

Se houver serviços backend conectados, use:

```bash
npm run docker:dev
```

> ✅ Ideal para simular um ambiente completo com banco de dados e API.

---

## 🌐 Variáveis de Ambiente

O frontend se conecta a uma API externa em `https://esp.savietto.app/`.  
Nenhuma variável adicional é necessária, mas você pode ajustar o endpoint caso use um servidor diferente.

---

## 🔐 Fluxo de Autenticação

1. O usuário acessa a página `/login`
2. Após login bem-sucedido → redirecionamento para o dashboard
3. Rotas protegidas exigem token válido
4. Tokens são renovados automaticamente ao expirar
5. O usuário pode sair, limpando sua sessão

---

## 📡 Endpoints da API Usados

| Método | Endpoint                              | Descrição |
|--------|---------------------------------------|----------|
| POST   | `/auth/login`                         | Autenticação do usuário |
| POST   | `/auth/refresh`                       | Renovação de token |
| GET    | `/measurements/`                      | Obter dados dos sensores |
| GET    | `/measurements/statistics`            | Estatísticas (min, max, avg) |
| GET    | `/anomaly/analyze-interval`           | Análise de anomalias nos dados |

---

## 🤝 Contribuição

Quer ajudar a melhorar o projeto?

1. Faça um **fork** do repositório
2. Crie uma nova branch: `git checkout -b feature/nova-funcionalidade`
3. Faça suas alterações e comite: `git commit -m 'Adiciona nova funcionalidade'`
4. Envie para o seu fork: `git push origin feature/nova-funcionalidade`
5. Abra um **Pull Request** aqui no GitHub

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License** — veja o arquivo [`LICENSE`](./LICENSE) para detalhes.

---

---

> ✅ **Desenvolvido como parte do Projeto Integrador 4 da Univesp (Universidade Virtual do Estado de São Paulo)**  
> 🎓 Em parceria com a equipe acadêmica para aplicar conhecimentos em desenvolvimento full-stack e IoT.

📌 *Código, design e funcionalidades criados por estudantes da Univesp — foco em inovação, segurança e usabilidade.*
```
