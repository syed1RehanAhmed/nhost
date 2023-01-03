import { AuthProvider, Refine, useLogin } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  AuthPage,
  ErrorComponent,
  Input,
  Button,
} from "@pankod/refine-antd";
import routerProvider, { useNavigate } from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-nhost";
import { NhostAuthProvider } from "@nhost/react-auth";

import "@pankod/refine-antd/dist/reset.css";

import { nhost } from "utility";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
  CategoriesList,
  CategoriesCreate,
  CategoriesEdit,
} from "pages/categories";
import Login from "pages/LoginPage";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { error } = await nhost.auth.signIn({
      email,
      password,
    });

    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  },
  logout: async () => {
    const { error } = await nhost.auth.signOut();
    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve("/");
  },
  checkError: (error) => {
    if (error.status === 401) {
      return nhost.auth.refreshSession();
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
    const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
    if (isAuthenticated) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => {
    const user = nhost.auth.getUser();
    if (user) {
      return Promise.resolve(user.roles);
    }

    return Promise.resolve([]);
  },
  getUserIdentity: () => {
    const user = nhost.auth.getUser();
    if (user) {
      return Promise.resolve({
        ...user,
        name: user.displayName,
        avatar: user.avatarUrl,
      });
    }

    return Promise.resolve({});
  },

  register: async ({ email, password }) => {
    const { error } = await nhost.auth.signUp({
      email,
      password,
    });
    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  },
};

const App: React.FC = () => {
  return (
    <NhostAuthProvider nhost={nhost}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(nhost)}
        authProvider={authProvider}
        resources={[
          {
            name: "job",
            list: PostList,
            create: PostCreate,
            edit: PostEdit,
            show: PostShow,
          },
        ]}
        notificationProvider={notificationProvider}
        Layout={Layout}
        LoginPage={Login}
        catchAll={<ErrorComponent />}
      />
    </NhostAuthProvider>
  );
};

export default App;
