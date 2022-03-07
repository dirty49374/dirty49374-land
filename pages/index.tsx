import { blogsQuery } from '@/lib/queries'
import type { NextPage } from 'next'
import Head from 'next/head'
import client from '../lib/apollo-client'

const Home: NextPage = ({ blogs }: any) => {
  return (
    <div>
      <Head>
        <title>Welcome to Dirty49374&apos;s Land</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='max-w-4xl mx-auto p-5 bg-slate-600'>
        <h1 className='text-2xl font-serif'>welcome to Dirty49374&apos;s Land</h1>
        {JSON.stringify(blogs)}
      </section>
    </div>
  )
}

export default Home
export async function getServerSideProps() {
  const { data } = await client.query({
    query: blogsQuery,
  });

  return {
    props: {
      blogs: data.blogs,
    },
  };
}
