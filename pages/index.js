import useSwr from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSwr('/api', fetcher)



  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  if(data){
    console.log(data)
  }

  if(error){
    console.log(error)
  }

  return (
    <ul>
      {data.map((sparepart) => (
        <li key={sparepart.index}>
          <Link href="/api/sparepart/[address]" as={`/api/sparepart/${sparepart.address}`}>
            <a>{`Spare Part Contract ${sparepart.index} : ${sparepart.address}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
