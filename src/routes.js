import OpeningPage from './Pages/Opening_Page'
import ListPage from './Pages/List_Page'
import { Route, Routes } from 'react-router-dom'

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<OpeningPage />} />
            <Route path='products_list' element={<ListPage />} />
        </Routes>
    )
}