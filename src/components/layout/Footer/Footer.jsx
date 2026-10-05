const footerLinkGroups = [
  [
    ['About', '#about'],
    ['Press', '#press'],
    ['Copyright', '#copyright'],
    ['Contact us', '#contact'],
    ['Creators', '#creators'],
    ['Advertise', '#advertise'],
    ['Developers', '#developers'],
  ],
  [
    ['Terms', '#terms'],
    ['Privacy', '#privacy'],
    ['Policy & Safety', '#policy-and-safety'],
    ['How Smart Hall works', '#how-smart-hall-works'],
    ['Test new features', '#test-new-features'],
  ],
]

const Footer = () => {
  return (
    <footer className="app-footer">
      <a className="app-footer-report" href="#report-history">
        <svg
          aria-hidden="true"
          className="app-footer-report-icon"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 20V4m0 1c4-2 7 2 12 0v8c-5 2-8-2-12 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
        <span>Report history</span>
      </a>

      <nav className="app-footer-links" aria-label="Footer navigation">
        {footerLinkGroups.map((group, groupIndex) => (
          <ul className="app-footer-link-group" key={groupIndex}>
            {group.map(([label, href]) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        ))}
      </nav>

      <p className="app-footer-copyright">
        &copy; {new Date().getFullYear()} Smart Hall
      </p>
    </footer>
  )
}

export default Footer
