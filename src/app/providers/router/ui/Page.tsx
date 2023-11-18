import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { type RouteConfigType } from 'shared/config/routeConfig/types'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'

export interface PageProps {
    routes: RouteConfigType
}

const Page: React.FC<PageProps> = ({ routes }) => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routes).map(({ element, path }) => (
                    <Route
                        key={path}
                        element={(
                            <div className="page-wrapper">
                                {element}
                            </div>
                        )}
                        path={path}
                    />
                ))}
                <Route path="*" element={<div>Not found Page</div>} />
            </Routes>
        </Suspense>
    )
}

export default Page
