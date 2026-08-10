// app/page.js
export default function Home() {
  return (
    <div className="wrap">
      <nav>
        <div className="logo"><span className="mark"></span>TailorApply</div>
        <div className="nav-links">
          <span>How it works</span><span>Pricing</span><span>FAQ</span>
        </div>
        <button className="btn btn-primary">Tailor my resume</button>
      </nav>

      <section className="hero" style={{ border: "none", paddingBottom: 0 }}>
        <div className="eyebrow">for people applying to more than one job</div>
        <h1 className="headline">
          One resume.<br />
          Every job posting{" "}
          <span className="hl">
            rewrites it
            <svg viewBox="0 0 300 16" preserveAspectRatio="none">
              <path d="M2 11 C 60 4, 140 15, 298 6" stroke="#F5D90A" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.85" />
            </svg>
          </span>{" "}
          for you.
        </h1>
        <p className="sub">
          Paste your resume and a job link. TailorApply rewrites your bullets to match the posting&apos;s
          language and drafts a cover letter — in under 30 seconds, not 30 minutes.
        </p>
        <div className="cta-row">
          <button className="btn btn-primary">Try it free — 2 tailors/month</button>
          <span className="cta-note">no card required</span>
        </div>

        <div className="demo">
          <div className="panel">
            <div className="panel-label"><span>Job posting</span><span>Senior Data Analyst</span></div>
            <div className="job-text">
              Looking for a candidate with strong <mark>SQL</mark> skills and experience building{" "}
              <mark>dashboards</mark> for cross-functional stakeholders. Must be comfortable presenting{" "}
              <mark>data-driven insights</mark> to leadership and working in a <mark>fast-paced</mark> environment...
            </div>
          </div>
          <div className="arrow-col">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 12h16M14 6l6 6-6 6" stroke="#F5D90A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="panel">
            <div className="panel-label"><span>Your resume, tailored</span><span className="mono" style={{ color: "var(--felt)" }}>match: 91%</span></div>
            <div className="resume-line">
              <span className="before">Made reports for the marketing team using spreadsheets.</span>
              <span className="after"><span className="strike-wrap">
                <svg viewBox="0 0 400 18" preserveAspectRatio="none"><path d="M2 13 C 80 5, 250 17, 398 8" stroke="#F5D90A" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.35" /></svg>
                <span>Built <b>SQL-driven dashboards</b> delivering <b>data-driven insights</b> to cross-functional stakeholders.</span>
              </span></span>
            </div>
            <div className="resume-line">
              <span className="before">Worked with different teams on projects.</span>
              <span className="after"><span className="strike-wrap">
                <svg viewBox="0 0 400 18" preserveAspectRatio="none"><path d="M2 13 C 80 5, 250 17, 398 8" stroke="#F5D90A" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.35" /></svg>
                <span>Partnered with stakeholders across teams in a <b>fast-paced</b> environment to ship weekly reporting.</span>
              </span></span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div className="eyebrow">how it works</div>
          <h2>Three steps. No editing required.</h2>
        </div>
        <div className="steps">
          <div className="step"><div className="num">01</div><h3>Paste your resume</h3><p>Upload a PDF or paste the text. We never store it longer than your session unless you save it.</p></div>
          <div className="step"><div className="num">02</div><h3>Drop in the job link</h3><p>We pull the posting&apos;s language — the exact skills and phrases the ATS is scanning for.</p></div>
          <div className="step"><div className="num">03</div><h3>Download, tailored</h3><p>Get a rewritten resume and a matching cover letter as PDF or DOCX. Regenerate free if it&apos;s off.</p></div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div className="eyebrow">pricing</div>
          <h2>Free to try. Cheap to keep.</h2>
        </div>
        <div className="pricing">
          <div className="plan">
            <h3>Free</h3>
            <div className="price">$0</div>
            <ul>
              <li>2 tailored resumes / month</li>
              <li>Cover letter draft included</li>
              <li>Standard template</li>
            </ul>
            <button className="btn">Start free</button>
          </div>
          <div className="plan featured">
            <h3>Pro</h3>
            <div className="price">$9<span>/mo</span></div>
            <ul>
              <li>Unlimited tailored resumes</li>
              <li>Unlimited cover letters</li>
              <li>Premium templates + DOCX export</li>
              <li>Match-score breakdown</li>
            </ul>
            <button className="btn btn-primary">Go Pro</button>
          </div>
          <div className="plan">
            <h3>Career Coach</h3>
            <div className="price">$29<span>/mo</span></div>
            <ul>
              <li>5 client seats</li>
              <li>White-labeled output</li>
              <li>Client dashboard</li>
            </ul>
            <button className="btn">Contact</button>
          </div>
        </div>
      </section>

      <footer>
        <span>TailorApply — built for people who apply to more than one job.</span>
        <span className="mono">v0.1 MVP</span>
      </footer>
    </div>
  );
}
