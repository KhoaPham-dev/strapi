/* eslint-disable check-file/filename-naming-convention */

import { RouteObject } from 'react-router-dom';

import { getEERoutes as getBaseEERoutes } from '../../ee/admin/src/constants';
import { getEERoutes as getSettingsEERoutes } from '../../ee/admin/src/pages/SettingsPage/constants';

import { AuthPage } from './pages/Auth/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ROUTES_CE } from './pages/Settings/constants';

const getInitialRoutes = (): RouteObject[] => [
  {
    path: 'usecase',
    lazy: async () => {
      const { PrivateUseCasePage } = await import('./pages/UseCasePage');

      return {
        Component: PrivateUseCasePage,
      };
    },
  },
  // this needs to go before auth/:authType because otherwise it won't match the route
  ...getBaseEERoutes(),
  {
    path: 'auth/:authType',
    element: <AuthPage />,
  },
  {
    path: '/*',
    lazy: async () => {
      const { PrivateAdminLayout } = await import('./layouts/AuthenticatedLayout');

      return {
        Component: PrivateAdminLayout,
      };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import('./pages/HomePage');

          return {
            Component: HomePage,
          };
        },
      },
      {
        path: 'me',
        lazy: async () => {
          const { ProfilePage } = await import('./pages/ProfilePage');

          return {
            Component: ProfilePage,
          };
        },
      },
      {
        path: 'list-plugins',
        lazy: async () => {
          const { ProtectedInstalledPluginsPage } = await import('./pages/InstalledPluginsPage');

          return {
            Component: ProtectedInstalledPluginsPage,
          };
        },
      },
      {
        path: 'marketplace',
        lazy: async () => {
          const { ProtectedMarketplacePage } = await import('./pages/Marketplace/MarketplacePage');

          return {
            Component: ProtectedMarketplacePage,
          };
        },
      },
      {
        path: 'settings/*',
        lazy: async () => {
          const { Layout } = await import('./pages/Settings/Layout');

          return {
            Component: Layout,
          };
        },
        children: [
          {
            path: 'application-infos',
            lazy: async () => {
              const { ApplicationInfoPage } = await import(
                './pages/Settings/pages/ApplicationInfo/ApplicationInfoPage'
              );

              return {
                Component: ApplicationInfoPage,
              };
            },
          },
          // ...Object.values(this.settings).flatMap(({ links }) =>
          //   links.map(({ to, Component }) => ({
          //     path: `${to}/*`,
          //     element: (
          //       <React.Suspense fallback={<Page.Loading />}>
          //         <Component />
          //       </React.Suspense>
          //     ),
          //   }))
          // ),
          ...[...getSettingsEERoutes(), ...ROUTES_CE].filter(
            (route, index, refArray) =>
              refArray.findIndex((obj) => obj.path === route.path) === index
          ),
        ],
      },
      // ...this.menu.map(({ to, Component }) => ({
      //   path: `${to}/*`,
      //   element: (
      //     <React.Suspense fallback={<Page.Loading />}>
      //       <Component />
      //     </React.Suspense>
      //   ),
      // })),

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export { getInitialRoutes };
