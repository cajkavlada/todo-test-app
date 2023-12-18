import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {selectIsAuthenticated} from 'src/features/login/store';

export function useAuthRedirect(
  redirectToIfAuthenticated: string | null,
  redirectToIfNotAuthenticated: string | null
) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated && redirectToIfAuthenticated) {
      navigate(redirectToIfAuthenticated);
    } else if (!isAuthenticated && redirectToIfNotAuthenticated) {
      navigate(redirectToIfNotAuthenticated);
    }
  }, [isAuthenticated, navigate, redirectToIfAuthenticated, redirectToIfNotAuthenticated]);

  return isAuthenticated;
}
