import App from '../App.jsx'
import HomePage from '../pages/HomePage/HomePage.jsx'
import ResourceManagementPanel from '../pages/ResourceManagementPanel/ResourceManagementPane.jsx'
import BookmarksPanel from '../pages/BookmarksPanel/BookmarksPanel.jsx'
import ProfileSettings from '../pages/ProfileSettings/ProfileSettings.jsx'
import BrowseResources from '../pages/BrowseResources/BrowseResources.jsx'
import CreateResourcePanel from '../pages/CreateResourcePanel.jsx/CreateResourcePanel.jsx'
import DocumentationPage from '../pages/DocumentationPage.jsx'

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
            },
            {
                path: 'about',
                element: <DocumentationPage pageKey="about" />
            },
            {
                path: 'press',
                element: <DocumentationPage pageKey="press" />
            },
            {
                path: 'copyright',
                element: <DocumentationPage pageKey="copyright" />
            },
            {
                path: 'contact',
                element: <DocumentationPage pageKey="contact" />
            },
            {
                path: 'creators',
                element: <DocumentationPage pageKey="creators" />
            },
            {
                path: 'advertise',
                element: <DocumentationPage pageKey="advertise" />
            },
            {
                path: 'developers',
                element: <DocumentationPage pageKey="developers" />
            },
            {
                path: 'terms',
                element: <DocumentationPage pageKey="terms" />
            },
            {
                path: 'privacy',
                element: <DocumentationPage pageKey="privacy" />
            },
            {
                path: 'policy-and-safety',
                element: <DocumentationPage pageKey="policy-and-safety" />
            },
            {
                path: 'how-smart-class-hall-works',
                element: <DocumentationPage pageKey="how-smart-class-hall-works" />
            },
            {
                path: 'test-new-features',
                element: <DocumentationPage pageKey="test-new-features" />
            },
            {
                path: 'report-history',
                element: <DocumentationPage pageKey="report-history" />
            }
        ]
    }
]