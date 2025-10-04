declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
  }
  
  export const Upload: FC<LucideProps>;
  export const AlertCircle: FC<LucideProps>;
  export const Loader2: FC<LucideProps>;
  // Add other icons as needed
}