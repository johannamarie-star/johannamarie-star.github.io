import Image from "next/image";
import siteContent from "@/content/site.json";

type HeadingContent = {
  beforeEmphasis: string;
  emphasis: string;
  afterEmphasis: string;
};

function ContentHeading({ content }: { content: HeadingContent }) {
  return (
    <>
      <span className="heading-copy">{content.beforeEmphasis}</span>
      <em>{content.emphasis}</em>
      {content.afterEmphasis}
    </>
  );
}

const projects = [
  { number: "01", tone: "rose", content: siteContent.work.project1 },
  { number: "02", tone: "sage", content: siteContent.work.project2 },
  { number: "03", tone: "peach", content: siteContent.work.project3 },
] as const;

const capabilities = [
  { number: "01", content: siteContent.capabilities.item1 },
  { number: "02", content: siteContent.capabilities.item2 },
  { number: "03", content: siteContent.capabilities.item3 },
  { number: "04", content: siteContent.capabilities.item4 },
] as const;

const capabilityStripItems = [
  siteContent.capabilityStrip.item1,
  siteContent.capabilityStrip.item2,
  siteContent.capabilityStrip.item3,
  siteContent.capabilityStrip.item4,
];

const capabilityStripText = [...capabilityStripItems, ...capabilityStripItems].join("　✦　");
const placeholderEmail = "your@email.com";

export default function Home() {
  const hasPublicEmail = siteContent.contact.email !== "" && siteContent.contact.email !== placeholderEmail;
  const testimonialRole = [siteContent.testimonial.personRole, siteContent.testimonial.personCompany]
    .filter(Boolean)
    .join(" · ");

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Johanna Marie, back to top">
          <span>Johanna Marie</span>
          <small>{siteContent.profile.professionalTitle}</small>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a className="nav-cta" href="#resume">Résumé ↗</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div>
          <p className="eyebrow"><span />{siteContent.hero.eyebrow}</p>
          <h1><ContentHeading content={siteContent.hero.heading} /></h1>
          <p className="hero-intro">{siteContent.hero.introduction}</p>
          <div className="actions">
            <a className="button primary" href="#work">{siteContent.hero.primaryActionLabel}</a>
            <a className="text-link" href="#contact">{siteContent.hero.secondaryActionLabel}</a>
          </div>
        </div>
        <div className={`hero-art${siteContent.hero.visual.image ? " has-image" : ""}`}>
          {siteContent.hero.visual.image ? (
            <Image
              className="content-image"
              src={siteContent.hero.visual.image}
              alt={siteContent.hero.visual.alt}
              fill
              loading="eager"
              sizes="(max-width: 850px) 94vw, 40vw"
            />
          ) : (
            <>
              <span className="spark">✦</span>
              <p>WORDS<br />WITH<br /><i>purpose.</i></p>
              <small>{siteContent.hero.visual.placeholderMessage}</small>
            </>
          )}
        </div>
      </section>

      <div className="marquee">{capabilityStripText}</div>

      <section className="work shell section" id="work">
        <div className="section-head">
          <div>
            <p className="eyebrow"><span />{siteContent.work.eyebrow}</p>
            <h2><ContentHeading content={siteContent.work.heading} /></h2>
          </div>
          <p>{siteContent.work.introduction}</p>
        </div>
        <div className="project-list">
          {projects.map(({ number, tone, content }) => (
            <article className="project" key={number}>
              <div className={`project-art ${tone}${content.image ? " has-image" : ""}`}>
                <span>{number}</span>
                {content.image ? (
                  <Image
                    className="content-image"
                    src={content.image}
                    alt={content.imageAlt}
                    fill
                    sizes="(max-width: 850px) 100vw, 45vw"
                  />
                ) : (
                  <b>PROJECT<br />PREVIEW</b>
                )}
              </div>
              <div className="project-copy">
                <p className="project-type">{content.category}</p>
                <h3>{content.title}</h3>
                <p>{content.summary}</p>
                <div className="impact"><small>Impact</small>{content.impact}</div>
                {content.caseStudyUrl ? (
                  <a href={content.caseStudyUrl} target="_blank" rel="noreferrer">View case study ↗</a>
                ) : (
                  <span className="unavailable-link" aria-label="Case study not available yet">Case study coming soon</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities section">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="eyebrow"><span />{siteContent.capabilities.eyebrow}</p>
              <h2><ContentHeading content={siteContent.capabilities.heading} /></h2>
            </div>
            <p>{siteContent.capabilities.introduction}</p>
          </div>
          <div className="cap-grid">
            {capabilities.map(({ number, content }) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{content.title}</h3>
                <p>{content.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about shell section" id="about">
        <div className={`portrait${siteContent.about.portrait.image ? " has-image" : ""}`}>
          {siteContent.about.portrait.image ? (
            <Image
              className="content-image"
              src={siteContent.about.portrait.image}
              alt={siteContent.about.portrait.alt}
              fill
              sizes="(max-width: 850px) 90vw, 36vw"
            />
          ) : (
            <span>YOUR<br />PHOTO</span>
          )}
          <i>✦</i>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span />{siteContent.about.eyebrow}</p>
          <h2><ContentHeading content={siteContent.about.heading} /></h2>
          <p>{siteContent.about.paragraph1}</p>
          <p>{siteContent.about.paragraph2}</p>
          <a className="text-link" href="#resume">{siteContent.about.resumeActionLabel}</a>
        </div>
      </section>

      <section className="testimonial shell section">
        <p className="eyebrow"><span />{siteContent.testimonial.eyebrow}</p>
        <blockquote>“{siteContent.testimonial.quote}”</blockquote>
        <div className="person">
          <span>JM</span>
          <p><b>{siteContent.testimonial.personName}</b><small>{testimonialRole}</small></p>
        </div>
      </section>

      <section className="resume shell" id="resume">
        <div>
          <p className="eyebrow"><span />{siteContent.resume.eyebrow}</p>
          <h2>{siteContent.resume.heading}</h2>
          <p>{siteContent.resume.introduction}</p>
        </div>
        {siteContent.resume.file ? (
          <a className="button light" href={siteContent.resume.file} target="_blank" rel="noreferrer">
            {siteContent.resume.actionLabel}
          </a>
        ) : (
          <span className="button light unavailable-link" aria-disabled="true">Résumé coming soon</span>
        )}
      </section>

      <section className="contact shell section" id="contact">
        <p className="eyebrow"><span />{siteContent.contact.eyebrow}</p>
        <h2><ContentHeading content={siteContent.contact.heading} /></h2>
        <p>{siteContent.contact.introduction}</p>
        {hasPublicEmail ? (
          <a className="button primary" href={`mailto:${siteContent.contact.email}`}>
            {siteContent.contact.email} ↗
          </a>
        ) : (
          <span className="button primary unavailable-link" aria-disabled="true">
            {siteContent.contact.email || placeholderEmail} ↗
          </span>
        )}
      </section>

      <footer className="site-footer shell">
        <a className="brand" href="#top">
          <span>Johanna Marie</span>
          <small>{siteContent.profile.professionalTitle}</small>
        </a>
        <p>© {new Date().getFullYear()} Johanna Marie. All rights reserved.</p>
        <div>
          {siteContent.contact.linkedInUrl ? (
            <a href={siteContent.contact.linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          ) : (
            <span className="footer-unavailable" aria-disabled="true">LinkedIn</span>
          )}
          <a href={hasPublicEmail ? `mailto:${siteContent.contact.email}` : "#contact"}>Email</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
