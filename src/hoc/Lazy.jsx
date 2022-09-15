import { lazy, Suspense } from 'react'

function Lazy(chunk) {
  const WrappedComponent = lazy(chunk)

  const Fallback = () => (
    <div className="position-fixed top-50 start-50">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">加载中Loading...</span>
      </div>
    </div>
  )

  return ({ ...props }) => (
    <Suspense fallback={<Fallback />}>
      <WrappedComponent {...props} />
    </Suspense>
  )
}

export default Lazy
