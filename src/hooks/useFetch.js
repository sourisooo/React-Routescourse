import { useState, useEffect } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }

  }, [url])

  return { data, isPending, error }
}

//Commentaires
//Très similaire au projet Ninjablog. Creation de 3 variables disposant des états REACT useState à travers la
//la fonction useFetch. Cette fonction retourne un objet disposant des 3 variables qui ont été crée initialement
//mais après avoir récupérer les données de la base JSON. 
// Une fonction useEffect est crée de la meme manière que le projet NinjaBlog pour lancer une fonction à chaque accès
// à une URL. Une variable stocke la demande de fetch, une autre la réponse du serveur JSON en précisant que les fonctions
//fetch et .json sont asynchrone avec l'intitulé await. Ensuite, les variables useState sont incrémentés à travers la
//méthodes SetData. Pour rappel, dans le projet dojoblog, la méthode then est utilisé consécutivement à la demande de 
//fetch sans passer par des variables puis then retourne la réponse qui représente égalment la réponse.