import NewsList from '@/components/news/NewsList'
import PriceWidget from '@/components/widgets/PriceWidget'
import TopNews from '@/components/news/TopNews'
import PopularNews from '@/components/home/PopularNews'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <TopNews />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <NewsList />
            </div>
          </div>
          
          <aside className="lg:block">
            <div className="space-y-8">
              <PriceWidget />
              <PopularNews />
              {/* Future ad space will go here */}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
