import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { type RouteConfigType } from 'shared/config/routeConfig/types'

export interface PageProps {
  routes: RouteConfigType
}

const Page: React.FC<PageProps> = ({ routes }) => {
  return (
        <Suspense fallback={<div>Loading...</div>}>
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
