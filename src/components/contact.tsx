import { Briefcase } from 'lucide-react'

export function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-col gap-12 px-6 py-25 lg:flex-row lg:gap-20 lg:px-20"
    >
      <div className="flex flex-1 flex-col gap-7">
        <span className="w-fit rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-wider text-accent">
          // CONTACT
        </span>

        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-[44px] md:leading-[1.15]">
          Let&apos;s build
          <br />
          something great.
        </h2>

        <p className="max-w-120 text-base leading-relaxed text-text-secondary">
          Whether you have a project in mind or just want to chat — I&apos;m
          always open to new work.
        </p>

        <a
          href="https://www.fiverr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-3 rounded-xl bg-accent px-6 py-4 text-[15px] font-bold text-background transition-opacity hover:opacity-90"
        >
          <Briefcase className="size-5" />
          Hire Me on Fiverr
        </a>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-1 flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-[13px] font-semibold text-text-secondary"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="h-12 rounded-[10px] border border-border bg-surface px-4 text-[15px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-[13px] font-semibold text-text-secondary"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@company.com"
            className="h-12 rounded-[10px] border border-border bg-surface px-4 text-[15px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-[13px] font-semibold text-text-secondary"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell me about your project..."
            className="resize-none rounded-[10px] border border-border bg-surface p-4 text-[15px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-[10px] bg-accent px-8 py-4 text-base font-bold text-background shadow-[0_8px_24px_#32D58340] transition-opacity hover:opacity-90"
        >
          Send Message
        </button>
      </form>
    </section>
  )
}
