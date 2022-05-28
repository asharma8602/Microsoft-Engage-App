import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Movie } from '../typings'

function useFavourites(uid: string | undefined) {
  const [favourites, setFavourites] = useState<DocumentData[] | Movie[]>([])

  useEffect(() => {
    if (!uid) return

    return onSnapshot(
      collection(db, 'customers', uid, 'myFavourites'),
      (snapshot) => {
        setFavourites(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db, uid])

  return favourites
}

export default useFavourites