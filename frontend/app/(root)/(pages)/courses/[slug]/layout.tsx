
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: 'gitit Communities',
    default: 'gitit Communities',
  },
  description: 'The communities in gitit',
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