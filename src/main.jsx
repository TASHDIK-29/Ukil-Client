import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import { router } from './routes/Routes';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from './provider/UserProvider';
import SearchProvider from './provider/SearchProvider';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
