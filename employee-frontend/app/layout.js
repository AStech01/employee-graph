// app/layout.js (Server Component)
import './globals.css';
import ApolloProviderWrapper from '../app/components/ApolloProviderWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap your entire app with the client provider */}
        <ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}