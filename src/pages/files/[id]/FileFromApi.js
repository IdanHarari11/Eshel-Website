import useAuth from "@/hooks/useAuth";

import Files from "../../../components/Files";
import PasswordModal from "@/components/PasswordModal";

const FilesPage = () => {
  const { isAuthenticated, handlePasswordSubmit } = useAuth();

  if (!isAuthenticated) {
    return <PasswordModal onPasswordSubmit={handlePasswordSubmit} />;
  }

  return <Files />;
};

export default FilesPage
