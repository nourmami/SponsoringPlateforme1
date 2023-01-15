import { useParams } from 'react-router-dom'

export default function Index() {
  const { id } = useParams()
  return (
    <div>
      <h1>Hello {id}</h1>
    </div>
  )
}
