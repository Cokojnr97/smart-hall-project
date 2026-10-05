import App from './App';
import HomePage from './pages/HomePage/HomePage';
import ResourceManagementPanel from './pages/ResourceManagementPanel/ResourceManagementPane';
import BookmarksPanel from './pages/BookmarksPanel/BookmarksPanel';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings'; 

export const routerApp = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'resources',
                element: <ResourceManagementPanel />
            },
            {
                path: 'bookmarks',
                element: <BookmarksPanel />
            },
            {
                path: 'profile',
                element: <ProfileSettings />
            }
        ]
    }
];