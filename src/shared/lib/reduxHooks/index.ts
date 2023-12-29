import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux'
import { type RootState, type AppDispatch } from 'app/providers/StoreProvider/config/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
