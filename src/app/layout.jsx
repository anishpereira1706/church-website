import '../index.css'

export const metadata = {
  title: 'Infant Mary Church, Katipalla',
  description: 'Welcome to Infant Mary Church, Katipalla.',
  keywords: 'Infant Mary Church, Katipalla Church, Katipalla Parish, Roman Catholic Church Katipalla, Mass Timings Katipalla',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
