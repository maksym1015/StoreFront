import { useContext, useEffect } from 'react';
import { AppContextComponent } from 'lib/context';
import { RepositoryFactory } from 'repositories/RepositoryFactory';

export const ClientWrapper: React.FC = ({ children }) => {
  const { state, dispatch } = useContext(AppContextComponent);

  useEffect(() => {
    if (state.loggedIn) {
      const fetchUser = async () => {
        try {
          const user = await RepositoryFactory.get('company').getCurrentUser();
          dispatch({ type: 'set-user', payload: user });
        } catch (e) {
          console.log(e);
        }
      };

      fetchUser();
    }
  }, [state.loggedIn]);
  return <>{children}</>;
};
