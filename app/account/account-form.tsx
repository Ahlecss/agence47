// @ts-nocheck

'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [nameEcole, setNameEcole] = useState<string | null>(null)
  const [lastRenovationYear, setLastRenovationYear] = useState<string | null>(null)
  const [priceLastRenovation, setPriceLastRenovation] = useState<string | null>(null)
  const [nameCollectivity, setNameCollectivity] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('Collectivities')
        .select(`NameCollectivity, NameEcole, LastRenovationYear, PriceLastRenovation, ElectedId`)
        .eq('ElectedId', user?.id)
        //.single()
        //.limit(1)

        
        if (error && status !== 406) {
          throw error
        }
        
        if (data) {
          // setFullname(data.full_name)
          setNameCollectivity(data[0].NameCollectivity)
          setNameEcole(data[0].NameEcole)
          setLastRenovationYear(data[0].LastRenovationYear)
          setPriceLastRenovation(data[0].PriceLastRenovation)
          console.log(data)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    nameCollectivity,
    nameEcole,
    lastRenovationYear,
    priceLastRenovation,
  }: {
    nameCollectivity: string | null
    nameEcole: string | null
    lastRenovationYear: string | null
    priceLastRenovation: string | null
  }) {
    try {
      setLoading(true)
      console.log(nameCollectivity, user?.id)
      const { error } = await supabase.from('Collectivities').update({
        NameCollectivity: nameCollectivity as string,
        NameEcole: nameEcole as string,
        LastRenovationYear: lastRenovationYear as string,
        PriceLastRenovation: priceLastRenovation as string,
      }).eq('ElectedId', user?.id)
      if (error) throw error
      alert('Vos informations ont correctement étés mises à jour !')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div className='mt-12 mb-8'>
        <label htmlFor="email" className="mr-8">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="NameCollectivity">Nom de votre collectivité</label>
        <input
          id="NameCollectivity"
          type="text"
          value={nameCollectivity || ''}
          onChange={(e) => setNameCollectivity(e.target.value)}
          className="text-black mb-4 ml-12 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="NameEcole">Nom de l'école de votre collectivité</label>
        <input
          id="NameEcole"
          type="text"
          value={nameEcole || ''}
          onChange={(e) => setNameEcole(e.target.value)}
          className="text-black mb-4 ml-12 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="LastRenovationYear">Année de la dernière rénovation de l'école</label>
        <input
          id="LastRenovationYear"
          type="text"
          value={lastRenovationYear || ''}
          onChange={(e) => setLastRenovationYear(e.target.value)}
          className="text-black mb-4 ml-12 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="PriceLastRenovation">Prix de la dernière rénovation</label>
        <input
          id="PriceLastRenovation"
          type="text"
          value={priceLastRenovation || ''}
          onChange={(e) => setPriceLastRenovation(e.target.value)}
          className="text-black mb-4 ml-12 px-4 py-2"
        />
      </div>

      <div>
        <button
          className="button primary block font-bold mb-12 border border-white px-2 py-2"
          onClick={() => updateProfile({ nameCollectivity, nameEcole, lastRenovationYear, priceLastRenovation })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Mettre à jour vos informations'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Deconnexion
          </button>
        </form>
      </div>
    </div>
  )
}