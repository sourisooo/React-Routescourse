import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

export default function Article() {
  const { id } = useParams()
  const url = 'http://localhost:3000/articles/' + id
  const { data: article, isPending, error } = useFetch(url)
  const history = useHistory()

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // history.goBack()
        history.push('/')
      }, 2000)
    }
  }, [error, history])

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  )
}

//Commentaires
//Meme principe que le dojoblog. La fonction retourne un template HTML avec un des données dynamiques accessibles grace à 
//la création de variables (id, url; data; isPending, error) qui vont venir s'ajuster à l'objet retourné par la fonction useFetch.