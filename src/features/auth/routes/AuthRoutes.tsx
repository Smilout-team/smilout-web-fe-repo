import {type RouteObject} from 'react-router-dom';
import SignIn from '@/features/auth/pages/SignIn';
import Unauthorized from '@/features/auth/pages/Unauthorized';

export const AuthRoutes: RouteObject[] = [
    {
        path: 'sign-in',
        element: (
            <SignIn />
        )
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />
    }
];