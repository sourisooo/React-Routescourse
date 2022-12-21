import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

// styles
import './Home.css'

export default function Home() {
  const { data: articles, isPending, error } = useFetch('http://localhost:3000/articles')

  return (
    <div className="home">
      <h2>Articles</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
        </div>
      ))}
    </div>
  )
}

//Commentaires
//Meme chose que l'onglet Article. La différence réside dans le fait que le template HTLM ne contient pas le body de l'article
//mais dispose d'un lien HTML vers l'article. Par ailleurs, tous les articles de la base de donnée JSON sont affichés: le fetchage
//est réalisé sur 'http://localhost:3000/articles' et non http://localhost:3000/articles+id'.