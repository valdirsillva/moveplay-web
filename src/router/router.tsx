import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../login/login'
import { Navigator } from '../layout/Navigator'
import { VideoPlayer } from "../components/video-player/VideoPlayer";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Navigator />} >
                    <Route index element={<Login />} />
                    <Route path="home" element={<VideoPlayer />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}