
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: 'quantaIQ',
    default: 'quantaIQ',
  },
  description: 'Courses in the QuantaIQ platform.',
}; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    
      <main className="flex min-h-screen flex-col p-24 pt-20 pl-48 pr-6">
        
        {children}
      </main>
      <Toaster />
    </>
  );
}