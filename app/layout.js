// app/layout.js
import '@/styles/global.css';                   // ✅ global styles only
import '@fortawesome/fontawesome-free/css/all.min.css';
import SmoothScrollWrapper from '@/components/utils/SmoothScrollWrapper';
import Chatbot from '@/components/chatbot/Chatbot';

export const metadata = {
  title: 'Digital Marketing Agency',
  description: 'We help brands grow through strategy and performance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
        <Chatbot />           {/* ✅ always mounted */}
      </body>
    </html>
  );
}