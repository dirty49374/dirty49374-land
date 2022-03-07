import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = ({ blogs }: any) => {
  return (
    <div>
      <Head>
        <title>Welcome to Dirty49374&apos;s Land</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='max-w-4xl mx-auto p-5 bg-slate-600'>
        <h1 className='text-2xl font-serif'>welcome to Dirty49374&apos;s Land</h1>
      </section>
    </div>
  )
}

export default Home
