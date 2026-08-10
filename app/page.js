// app/page.js
import PayPalButton from "./components/PayPalButton";

export default function Home() {
  return (
    <div className="wrap">
      <nav>
        <div className="logo">
          <svg className="mark" viewBox="0 0 24 24" fill="none">
            <path d="M4 20 L18 6 M14 4 L20 4 L20 10" stroke="#B99155" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="4" cy="20" r="1.6" fill="#B99155" />
          </svg>
          TailorApply
        </div>
        <div className="nav-links">
          <span>The Process</span><span>Pricing</span><span>Enquiries</span>
        </div>
        <button className="btn btn-primary">Begin Tailoring</button>
      </nav>

      <section className="hero" style={{ border: "none", paddingBottom: 0 }}>
        <div className="label center">bespoke, for every application</div>
        <h1 className="headline">
          One resume. <em>Cut to fit</em><br />every role you apply for.
        </h1>
        <p className="sub">
          Present your resume and the role you want. We re-cut every line to the posting&apos;s own
          measurements — a tailored resume and cover letter, finished in under a minute.
        </p>
        <div className="cta-row">
          <button className="btn btn-primary">Begin Tailoring — First Two Free</button>
        </div>
        <p className="cta-note" style={{ marginTop: 14 }}>no card on file required</p>

        <div className="demo">
          <div className="swatch">
            <div className="swatch-label"><span>The Posting</span><span>Senior Data Analyst</span></div>
            <div className="job-text">
              Seeking a candidate with strong <b>SQL</b> craftsmanship and a record of building{" "}
              <b>dashboards</b> for cross-functional stakeholders — comfortable presenting{" "}
              <b>data-driven insight</b> in a fast-moving room.
            </div>
          </div>
          <div className="needle-col">
            <svg viewBox="0 0 44 44" fill="none">
              <path d="M8 34 Q 16 14, 34 10" stroke="#B99155" strokeWidth="1" strokeDasharray="3 4" fill="none" />
              <circle cx="34" cy="10" r="2.2" fill="#B99155" />
            </svg>
          </div>
          <div className="swatch">
            <div className="swatch-label"><span>Your Resume, Re-Cut</span><span style={{ color: "var(--brass)" }}>fit: 91%</span></div>
            <div className="resume-line">
              <span className="before">Made reports for the marketing team using spreadsheets.</span>
              <span className="after">Built <b>SQL</b>-driven <b>dashboards</b> delivering <b>data-driven insight</b> to cross-functional stakeholders.</span>
            </div>
            <div className="resume-line">
              <span className="before">Worked with different teams on projects.</span>
              <span className="after">Partnered across teams in a fast-moving room to ship weekly reporting.</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div className="label center">the fitting</div>
          <h2>Three measurements. No alterations needed.</h2>
        </div>
        <div className="steps">
          <div className="step"><div className="num">I</div><h3>Present your resume</h3><p>Paste it in, or upload the PDF. Nothing is kept beyond your session unless you choose to save it.</p></div>
          <div className="step"><div className="num">II</div><h3>Name the role</h3><p>Share the posting. We take its exact measurements — the language its own screening is built around.</p></div>
          <div className="step"><div className="num">III</div><h3>Receive it, tailored</h3><p>A re-cut resume and matching cover letter, ready in PDF or DOCX. Ask for a second fitting, free.</p></div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div className="label center">the house rates</div>
          <h2>Simple terms. No hidden seams.</h2>
        </div>
        <div className="pricing">
          <div className="plan">
            <h3>Off the Rack</h3>
            <div className="price">$0</div>
            <ul>
              <li>Two fittings monthly</li>
              <li>Cover letter included</li>
              <li>Standard cut</li>
            </ul>
            <button className="btn">Begin, free</button>
          </div>
          <div className="plan featured">
            <h3>Made to Measure</h3>
            <div className="price">$9<span>/ month</span></div>
            <ul>
              <li>Unlimited fittings</li>
              <li>Unlimited cover letters</li>
              <li>Fine templates, DOCX finish</li>
              <li>Fit-score breakdown</li>
            </ul>
            <PayPalButton />
          </div>
          <div className="plan">
            <h3>The Atelier</h3>
            <div className="price">$29<span>/ month</span></div>
            <ul>
              <li>Five client seats</li>
              <li>Unbranded finish</li>
              <li>Client ledger</li>
            </ul>
            <button className="btn">Enquire</button>
          </div>
        </div>
      </section>

      <footer>
        <span>TailorApply — a resume, cut to fit</span>
        <span>Est. 2026</span>
      </footer>
    </div>
  );
}
