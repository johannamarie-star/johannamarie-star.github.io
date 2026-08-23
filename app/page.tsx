const projects = [
  ["01", "Content Strategy · [Industry]", "[Add a results-led title for your strongest project]", "Briefly explain the challenge, what you created, and why your approach mattered.", "[Add a measurable result or meaningful outcome]", "rose"],
  ["02", "Campaign Marketing · [Industry]", "[Add a project that shows strategic thinking]", "Describe your role, the audience, and the idea that guided the work.", "[Add reach, engagement, leads, or another result]", "sage"],
  ["03", "Copywriting · [Format]", "[Add a project that demonstrates your writing voice]", "Share the communication goal and how your writing made the message clearer or more persuasive.", "[Add the outcome, feedback, or lesson learned]", "peach"],
];

const capabilities = [
  ["01", "Content strategy", "Planning audience-aware content around clear communication and business goals."],
  ["02", "Content writing", "Turning ideas and information into focused, engaging copy across the right formats."],
  ["03", "Campaign support", "Contributing research, messaging, coordination, and content that keep campaigns moving."],
  ["04", "Brand communication", "Helping brands communicate with a voice that feels consistent and human."],
];

export default function Home() {
  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Johanna Marie, back to top"><span>Johanna Marie</span><small>Marketing Specialist / Content Writer</small></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a><a className="nav-cta" href="#resume">Résumé ↗</a></nav>
    </header>

    <section className="hero shell" id="top">
      <div><p className="eyebrow"><span/>Thoughtful words. Purposeful marketing.</p><h1>I turn ideas into content that <em>connects.</em></h1>
        <p className="hero-intro">I&apos;m Johanna Marie, a marketing specialist and content writer focused on creating clear, engaging work that helps brands communicate with intention.</p>
        <div className="actions"><a className="button primary" href="#work">Explore my work ↓</a><a className="text-link" href="#contact">Let&apos;s connect ↗</a></div>
      </div>
      <div className="hero-art"><span className="spark">✦</span><p>WORDS<br/>WITH<br/><i>purpose.</i></p><small>Replace this panel with your portrait, signature visual, or featured campaign.</small></div>
    </section>

    <div className="marquee">Content Strategy　✦　Copywriting　✦　Brand Storytelling　✦　Campaigns　✦　Content Strategy　✦　Copywriting</div>

    <section className="work shell section" id="work">
      <div className="section-head"><div><p className="eyebrow"><span/>Selected work</p><h2>Ideas made <em>meaningful.</em></h2></div><p>A curated selection showing how I think, write, collaborate, and contribute to results.</p></div>
      <div className="project-list">{projects.map(([number,type,title,summary,impact,tone]) => <article className="project" key={number}>
        <div className={`project-art ${tone}`}><span>{number}</span><b>PROJECT<br/>PREVIEW</b></div>
        <div className="project-copy"><p className="project-type">{type}</p><h3>{title}</h3><p>{summary}</p><div className="impact"><small>Impact</small>{impact}</div><a href="#contact">View case study ↗</a></div>
      </article>)}</div>
    </section>

    <section className="capabilities section">
      <div className="shell"><div className="section-head"><div><p className="eyebrow"><span/>What I bring</p><h2>A blend of strategy<br/>and <em>storytelling.</em></h2></div><p>Editable starting points—keep only the capabilities your work and experience support.</p></div>
      <div className="cap-grid">{capabilities.map(([number,title,description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div>
    </section>

    <section className="about shell section" id="about"><div className="portrait"><span>YOUR<br/>PHOTO</span><i>✦</i></div><div className="about-copy"><p className="eyebrow"><span/>A little about me</p><h2>Curious by nature.<br/><em>Intentional</em> by practice.</h2><p>[Add a concise introduction to your background, the work you enjoy, and the perspective you bring to a team. Let this sound like you—not a résumé summary.]</p><p>[Add one personal detail, working principle, or professional interest that makes you memorable.]</p><a className="text-link" href="#resume">More about my experience ↗</a></div></section>

    <section className="testimonial shell section"><p className="eyebrow"><span/>Kind words</p><blockquote>“Add a concise recommendation that speaks to your strengths, reliability, communication, or the impact you made.”</blockquote><div className="person"><span>JM</span><p><b>[Person&apos;s name]</b><small>[Role · Company]</small></p></div></section>

    <section className="resume shell" id="resume"><div><p className="eyebrow"><span/>Experience at a glance</p><h2>Want the full story?</h2><p>Add your downloadable résumé here when it is ready for public sharing.</p></div><a className="button light" href="#contact">View résumé ↗</a></section>

    <section className="contact shell section" id="contact"><p className="eyebrow"><span/>Let&apos;s connect</p><h2>Have an opportunity in mind?<br/><em>I&apos;d love to hear about it.</em></h2><p>Whether you&apos;re hiring, building a team, or simply want to say hello—my inbox is open.</p><a className="button primary" href="mailto:your@email.com">your@email.com ↗</a></section>

    <footer className="site-footer shell"><a className="brand" href="#top"><span>Johanna Marie</span><small>Marketing Specialist / Content Writer</small></a><p>© 2026 Johanna Marie. All rights reserved.</p><div><a href="#">LinkedIn</a><a href="#">Email</a><a href="#top">Back to top ↑</a></div></footer>
  </main>;
}
