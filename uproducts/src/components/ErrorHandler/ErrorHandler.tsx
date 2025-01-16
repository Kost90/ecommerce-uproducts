'use client';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

type ErrorProps = {
  error?: {
    statusCode: number;
    message: string;
    type: string;
  };
};

function ErrorHandler({ error }: ErrorProps): null {
  const { toast } = useToast();
  const lastErrorRef = useRef<string | null>(null);

  useEffect(() => {
    const errorString = error ? JSON.stringify(error) : null;

    if (errorString && errorString !== lastErrorRef.current) {
      lastErrorRef.current = errorString;
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    }
  }, [error, toast]);

  return null;
}

export default ErrorHandler;
