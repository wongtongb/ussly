import ContactForm from "./ContactForm";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-36 bg-accent text-paper overflow-hidden"
    >
      <div className="relative max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start">
          {/* Headline + direct contact */}
          <div className="col-span-12 lg:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/70">
              § V · Get in touch
            </span>

            <h2 className="mt-6 font-display text-[clamp(48px,8vw,140px)] text-paper leading-[0.9] tracking-tight">
              Tell me about
              <br />
              <span className="font-display-italic">your place.</span>
            </h2>

            <p className="mt-8 max-w-xl text-paper/85 text-lg leading-[1.5]">
              A new site, a refresh, or a gut-check on what you already have. I
              read every message myself and reply within a day.
            </p>

            {/* Direct contact pills */}
            <div className="mt-10 pt-6 border-t border-paper/20">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60 mb-5">
                Or skip the form
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 mb-1">
                    Email
                  </dt>
                  <dd>
                    <a
                      href="mailto:hello@ussly.design"
                      className="font-display text-2xl lg:text-3xl text-paper hover:underline underline-offset-4 break-all"
                    >
                      hello@ussly.design
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 mb-1">
                    Phone
                  </dt>
                  <dd>
                    <a
                      href="tel:+14259543019"
                      className="font-display text-2xl lg:text-3xl text-paper hover:underline underline-offset-4"
                    >
                      (425) 954-3019
                    </a>
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 mb-1">
                    Based in
                  </dt>
                  <dd className="font-display-italic text-xl text-paper">
                    Lynnwood, WA · Remote-friendly
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Contact form */}
          <div className="col-span-12 lg:col-span-5 lg:pt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
