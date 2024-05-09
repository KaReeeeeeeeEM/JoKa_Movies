/* eslint-disable no-unused-vars */
import { SignInSide, SignUp, ForgotPassword, SentCode, ChangeCredentials, SocialMediaList, Dashboard,NetworkError, Error401, Error404, Error500, SelectedMovie, SelectedShow,Results, PlayMovie } from './components';

const routes = [
    { path:'*', element: <Error404 />},
    { path:'/', element: <SignInSide />},
    { path:'/SignInSide', element: <SignInSide />},
    { path:'/SignUp', element: <SignUp />},
    { path:'/NetworkError', element: <NetworkError />},
    { path:'/Error401', element: <Error401 />},
    { path:'/Error500', element: <Error500 />},
    { path:'/ForgotPassword', element: <ForgotPassword />},
    { path:'/SentCode', element:<SentCode />},
    { path:'/SentCode/:data', element:<SentCode />},
    { path:'/Dashboard', element:<Dashboard />},
    { path:'/Dashboard/:user', element:<Dashboard />},
    { path:'/ChangeCredentials', element:<ChangeCredentials />},
    { path:'/ChangeCredentials/:data', element:<ChangeCredentials />},
    { path:'/SocialMediaList', element:<SocialMediaList />},
    { path:'/SelectedMovie', element:<SelectedMovie />},
    { path:'/SelectedMovie/:movie_id', element:<SelectedMovie />},
    { path:'/SelectedMovie/:movie_id/:user', element:<SelectedMovie />},
    { path:'/SelectedShow', element:<SelectedShow />},
    { path:'/SelectedShow/:movie_id', element:<SelectedShow />},
    { path:'/SelectedShow/:movie_id/:user', element:<SelectedShow />},
    { path:'/Results', element:<Results />},
    { path:'/Results/:search', element:<Results />},
    { path:'/Results/:search/:user', element:<Results />},
    { path:'/PlayMovie', element:<PlayMovie />},
    { path:'/PlayMovie/:search', element:<PlayMovie />},
]

export default routes;