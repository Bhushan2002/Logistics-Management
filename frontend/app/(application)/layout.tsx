import { Header } from './_components/header';
import { Toaster } from '@/components/ui/toaster'
import { SidebarNav } from './_components/sidebar-nav';

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <SidebarNav />
        </div>

        <div className="lg:pl-72">
          <Header />

          <main className="py-8">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </section>
  )
}