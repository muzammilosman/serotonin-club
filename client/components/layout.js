import NavApp from "./nav"

const Layout = ({ children, categories, seo }) => {
  return (
    <div>
      <NavApp categories={categories} />
      {children}
    </div>
  )
}

export default Layout
