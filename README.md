🎬 CineFinder
Aplicação web para descoberta de filmes — busque por título ou encontre sugestões baseadas no seu humor do momento.
🔗 Demo
https://cine-finder-six.vercel.app/

✨ Funcionalidades

Busca por título — encontre qualquer filme digitando o nome
Poster, nota e ano — informações essenciais exibidas em cada card
Streaming no Brasil — veja em quais plataformas o filme está disponível
Busca por Mood — selecione como você está se sentindo e receba sugestões
Filtro por gênero — combine mood e gênero para refinar os resultados


🛠️ Tecnologias

React — biblioteca para construção de interfaces
Vite — ferramenta de build e servidor de desenvolvimento
React Router — navegação entre páginas
Tailwind CSS — estilização utilitária
TMDB API — dados de filmes, posters e streaming


🚀 Como rodar localmente
Pré-requisitos: Node.js instalado
bash# Clone o repositório
git clone https://github.com/seu-usuario/cine-finder.git

# Entre na pasta
cd cine-finder

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
# Crie um arquivo .env na raiz com o seguinte conteúdo:
# VITE_TMDB_API_KEY=sua_chave_aqui

# Rode o projeto
npm run dev

Para obter sua chave da API, crie uma conta gratuita em themoviedb.org e acesse Settings → API.


📁 Estrutura do projeto
src/
├── components/       # Componentes reutilizáveis (Navbar, MovieCard)
├── pages/            # Páginas da aplicação (Home, Mood)
├── services/         # Comunicação com a API do TMDB
└── hooks/            # Hooks customizados


📸 Screenshots

<img width="1903" height="1070" alt="image" src="https://github.com/user-attachments/assets/e86e450a-7f6f-489d-8cb0-d3d2c21a7021" />
<img width="1874" height="1070" alt="image" src="https://github.com/user-attachments/assets/4dd91cf8-c840-495f-9c4e-f696c24eab36" />




👨‍💻 Autor
Desenvolvido por Raul Gonçalves — estudante de ADS aprendendo desenvolvimento front-end.
