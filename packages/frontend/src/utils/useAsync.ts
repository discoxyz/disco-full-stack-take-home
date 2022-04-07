import * as React from 'react'

function useSafeDispatch(dispatch: any) {
  const mounted = React.useRef<boolean>(false)
  React.useLayoutEffect(():any => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [])
  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

type returnType = {
    isIdle: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    setData: (data: any) => void ;
    setError: (error: any) => void ;
    reset: () => void ;
    error: any;
    status: string;
    data: any;
    run: (data: any) => void;
}

const defaultInitialState = {status: 'idle', data: null, error: null}
const useAsync = (): returnType => {
  const initialStateRef = React.useRef({
    ...defaultInitialState
  })

    const [{status, data, error}, setState] = React.useState({
        status:'',
        data:{},
        error:''
    })


  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    data => safeSetState({data, status: 'resolved'}),
    [safeSetState],
  )
  const setError = React.useCallback(
    error => safeSetState({error, status: 'rejected'}),
    [safeSetState],
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState],
  )

  const run = React.useCallback(
    promise => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({status: 'pending'})
      return promise.then(
        (data:any) => {
          setData(data)
          return data
        },
        (error:any) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export {useAsync}
