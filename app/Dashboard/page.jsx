import Link from 'next/link'
import React from 'react'

const Page = () => {
  return( <main className='p-10'>
    <h2>Tableau de bord</h2>
    <Link href={'/admin'}>Admin</Link>
  </main>)
}

export default Page