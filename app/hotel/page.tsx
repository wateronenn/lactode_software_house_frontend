import { Suspense } from 'react'
import HotelPageClient from './HotelPageClient'

function HotelPageFallback() {
  return <div>Loading...</div>
}

export default function HotelPage() {
  return (
    <Suspense fallback={<HotelPageFallback />}>
      <HotelPageClient />
    </Suspense>
  )
}