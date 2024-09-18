import "@/styles/globals.css";
import Layout from '@/components/Layout';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import useAuth from "@/hooks/useAuth";
import PasswordModal from "@/components/PasswordModal";

export default function App({ Component, pageProps }) {
  const { isAuthenticated, handlePasswordSubmit } = useAuth();

  if (!isAuthenticated) {
    return <PasswordModal onPasswordSubmit={handlePasswordSubmit} />;
  }

  return (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);
}
