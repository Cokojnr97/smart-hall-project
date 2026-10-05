import App from '../App.jsx'
import HomePage from '../pages/HomePage/HomePage.jsx'
import ResourceManagementPanel from '../pages/ResourceManagementPanel/ResourceManagementPane.jsx'
import BookmarksPanel from '../pages/BookmarksPanel/BookmarksPanel.jsx'
import ProfileSettings from '../pages/ProfileSettings/ProfileSettings.jsx'
import BrowseResources from '../pages/BrowseResources/BrowseResources.jsx'
import CreateResourcePanel from '../pages/CreateResourcePanel.jsx/CreateResourcePanel.jsx'

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
                path: 'browse',
                element: <BrowseResources />
            },
            {
                path: 'create-resource',
                element: <CreateResourcePanel />
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
]