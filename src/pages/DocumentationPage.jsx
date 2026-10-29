const documentation = {
  'report-history': {
    title: 'Report history',
    intro: 'Review reports and safety concerns submitted to Smart Class Hall.',
    sections: [
      ['Current availability', 'Report history tools are currently under development.'],
      ['Privacy', 'Do not include passwords or unnecessary personal information in a report.'],
    ],
  },
  about: {
    title: 'About Smart Class Hall',
    intro: 'Smart Class Hall is an educational platform for discovering, creating, organizing, and sharing learning resources.',
    sections: [
      ['Our purpose', 'We are building tools that help learners and educators find useful resources and manage their learning activities in one place.'],
      ['Educational use', 'Smart Class Hall is designed for educational use. Information and resources may be incomplete, user-generated, or still under review.'],
      ['Project designers', 'Smart Class Hall was designed by Christopher Díaz and Juan Andrés Velásquez, students at CESDE.'],
    ],
  },
  press: {
    title: 'Press',
    intro: 'For press, media, or partnership inquiries, contact us at jvelasquezan1@cesde.net.',
    sections: [['Requests', 'Please include your name, organization, deadline, and the subject of your request. We will review requests and respond when possible.']],
  },
  copyright: {
    title: 'Copyright',
    intro: 'Respecting intellectual property is important to Smart Class Hall.',
    sections: [
      ['Your content', 'You retain ownership of content you submit. By submitting content, you grant Smart Class Hall the limited permissions needed to store, display, and operate the service.'],
      ['Third-party content', 'Do not upload content unless you own it or have permission to use it. If you believe content infringes your rights, contact jvelasquezan1@cesde.net with the relevant details.'],
    ],
  },
  contact: {
    title: 'Contact us',
    intro: 'For questions, support, privacy requests, or legal notices, email jvelasquezan1@cesde.net.',
    sections: [['Response times', 'Please provide enough information for us to understand your request. We aim to respond within a reasonable time, subject to the nature and complexity of the request.']],
  },
  creators: {
    title: 'Creators',
    intro: 'Smart Class Hall was designed by Christopher Díaz and Juan Andrés Velásquez from CESDE. Creators can also contribute educational resources for the community.',
    sections: [
      ['Designers', 'The project designers are Christopher Díaz and Juan Andrés Velásquez, both students at CESDE.'],
      ['Creator responsibility', 'Creators are responsible for the accuracy, legality, accessibility, and permissions associated with the resources they submit.'],
      ['Moderation', 'We may review, restrict, or remove resources that violate our rules, applicable law, or the rights of others.'],
    ],
  },
  advertise: {
    title: 'Advertise',
    intro: 'Advertising and partnership opportunities are not currently available.',
    sections: [['Future updates', 'If advertising becomes available, this page will explain the formats, eligibility requirements, disclosure practices, and contact process.']],
  },
  developers: {
    title: 'Developers',
    intro: 'Developer documentation and integrations are currently under development.',
    sections: [['Responsible use', 'Future APIs, integrations, and developer tools must be used lawfully, securely, and without disrupting the service or exposing user data.']],
  },
  terms: {
    title: 'Terms of Service',
    intro: 'These terms describe the basic rules for using Smart Class Hall.',
    sections: [
      ['Acceptance', 'By using Smart Class Hall, you agree to these terms and to comply with applicable Colombian law. If you do not agree, do not use the service.'],
      ['Acceptable use', 'Do not misuse the service, upload unlawful or harmful material, impersonate others, attempt unauthorized access, or interfere with the service.'],
      ['User content', 'You are responsible for content you submit and must have the rights and permissions necessary to share it.'],
      ['Changes and availability', 'We may modify, suspend, or discontinue features. We may also update these terms and will publish the updated version on this page.'],
      ['Contact', 'Questions about these terms can be sent to jvelasquezan1@cesde.net.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'This policy explains how Smart Class Hall handles personal information.',
    sections: [
      ['Information we collect', 'We may collect account and profile information, resources you create, bookmarks, and activity needed to provide and improve the service. We do not currently request payment information.'],
      ['How we use information', 'We use information to provide the platform, secure accounts, show resources and bookmarks, communicate with users, troubleshoot issues, and improve educational features.'],
      ['Sharing', 'We do not sell personal information. Information may be shared with service providers only when needed to operate, secure, or maintain the platform, or when required by law.'],
      ['Children and education', 'The platform may be used for educational purposes by users of different ages. Schools, families, and responsible adults should help younger users use the service safely and should avoid submitting unnecessary sensitive information.'],
      ['Rights and requests', 'Subject to applicable Colombian law, you may request access, correction, updating, deletion, or information about the handling of your personal data by contacting jvelasquezan1@cesde.net.'],
      ['Updates', 'We may update this policy as the platform changes. The latest version will be published on this page.'],
    ],
  },
  'policy-and-safety': {
    title: 'Policy & Safety',
    intro: 'These guidelines help keep Smart Class Hall useful and safe.',
    sections: [
      ['Not allowed', 'Do not share illegal, abusive, threatening, hateful, sexually exploitative, deceptive, or privacy-invasive content. Do not harass others or attempt to compromise accounts or systems.'],
      ['Reporting', 'Report safety or policy concerns to jvelasquezan1@cesde.net with the relevant resource, account, and explanation.'],
      ['Enforcement', 'We may remove content, limit features, suspend accounts, or take other appropriate action when these guidelines are violated.'],
    ],
  },
  'how-smart-class-hall-works': {
    title: 'How Smart Class Hall works',
    intro: 'Smart Class Hall brings educational resources, bookmarks, and creator tools together in one platform.',
    sections: [
      ['Browse', 'Explore resources organized for discovery and future recommendations.'],
      ['Create', 'Use the creator tools to submit and manage educational resources.'],
      ['Organize', 'Save useful resources to bookmarks so you can find them again.'],
      ['Review', 'Some resources may be reviewed before or after publication to support quality and safety.'],
    ],
  },
  'test-new-features': {
    title: 'Test new features',
    intro: 'Experimental features may be released while Smart Class Hall is being developed.',
    sections: [
      ['What to expect', 'Experimental features may change, be unavailable, or contain errors. They should not be relied on for critical records.'],
      ['Feedback', 'Send feedback or problem reports to jvelasquezan1@cesde.net. Please do not include passwords or unnecessary sensitive information.'],
    ],
  },
}

export default function DocumentationPage({ pageKey }) {
  const page = documentation[pageKey]

  return (
    <article className="panel documentation-page">
      <p className="eyebrow">Smart Class Hall documentation</p>
      <h1 className="page-title">{page.title}</h1>
      <p className="page-subtitle">{page.intro}</p>
      <p className="documentation-date">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <div className="documentation-sections">
        {page.sections.map(([heading, content]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{content}</p>
          </section>
        ))}
      </div>
      <p className="documentation-disclaimer">
        This information is a general product notice and is not legal advice.
        Please have the final versions reviewed by qualified counsel before
        launch.
      </p>
    </article>
  )
}
