import { lazy, Suspense } from 'react'

function Lazy(chunk) {
  const WrappedComponent = lazy(chunk)

  return ({ ...props }) => (
    <Suspense fallback={<Fallback />}>
      <WrappedComponent {...props} />
    </Suspense>
  )
}

function Fallback() {
  return (
    <div className="position-fixed top-50 start-50">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">加载中Loading...</span>
      </div>
    </div>
  )
}

export default Lazy
export { Fallback }
