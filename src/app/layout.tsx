import type { Metadata } from 'next';
import { Golos_Text } from 'next/font/google';
import '@styles/globals.scss';
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo';
import Providers from '@/components/Layouts/Providers';
import { Toaster } from '@/components/ui/toaster';
import logo_img from '@images/logo.svg';
import favicon from '@public/favicon.ico';

const golosText = Golos_Text({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: `${SITE_NAME} | %s`,
    default: `${SITE_NAME} | Главная`,
  },
  openGraph: {
    images: [logo_img.src],
  },
  icons: favicon.src,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ru">
      <Providers>
        <Toaster />
        <body className={`${golosText.className} antialiased`}>{children}</body>
      </Providers>
    </html>
  );
}
