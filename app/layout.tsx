// app/layout.tsx
'use client'
import './globals.css'
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import {Provider} from "react-redux";
import store from "@/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient({
    defaultOptions: {
        queries: {
          // staleTime: 1000 * 60 * 5,
          // refetchOnWindowFocus: true,
          // refetchOnMount: true,
        }
      }
  }));

  return (
    <>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}>
              <html lang="en">
                <body className={"relative bg-gray-50"}>
                  <Navbar/>
                  <ToastContainer
                    position={"bottom-right"}
                    limit={8}
                    autoClose={3000}
                  />
                  <main className="md:pt-24 min-h-[calc(100vh-226px)]">{children}</main>
                  <Footer/>
                  <ReactQueryDevtools initialIsOpen={false}/>
                </body>
              </html>
            </GoogleReCaptchaProvider>
          </Provider>
        </QueryClientProvider>
    </>
    )
}