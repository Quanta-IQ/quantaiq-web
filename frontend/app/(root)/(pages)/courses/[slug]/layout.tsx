
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
    
        
        {children}
     
      <Toaster />
    </>
  );
}