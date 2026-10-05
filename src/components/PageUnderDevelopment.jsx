export default function PageUnderDevelopment({ pageName }) {
  return (
    <section className="panel under-development" aria-labelledby="under-development-title">
      <p className="eyebrow">Coming soon</p>
      <h1 id="under-development-title">{pageName} is currently under development</h1>
      <p className="page-subtitle">
        This page will be available in a future version of Smart Hall.
      </p>
    </section>
  )
}
