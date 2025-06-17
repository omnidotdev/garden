import Link from "next/link";

/**
 * Layout footer.
 */
const Footer = () => (
  <footer className="mt-auto flex w-full shrink-0 flex-col items-center gap-1 border-border border-t p-4 sm:flex-row md:px-6">
    <p className="text-muted-foreground text-xs">
      © {new Date().getFullYear()} Omni
    </p>

    <nav className="flex gap-4 sm:ml-auto sm:gap-6">
      <Link
        className="text-muted-foreground text-xs transition-colors hover:text-primary"
        href="https://docs.omni.dev/garden/overview"
        target="_blank"
        rel="noopener noreferrer"
      >
        Docs
      </Link>

      <Link
        className="text-muted-foreground text-xs transition-colors hover:text-primary"
        href="https://omni.dev/terms-of-service"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </Link>

      <Link
        className="text-muted-foreground text-xs transition-colors hover:text-primary"
        href="https://omni.dev/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </Link>

      {/* TODO enable */}
      {/* <div className="inline-block min-h-[1em] w-[1.5px] bg-muted-foreground/60" /> */}

      {/* <Link
        className="text-muted-foreground text-xs transition-colors hover:text-primary"
        href="https://backfeed.omni.dev/organizations/omni/projects/garden"
        target="_blank"
        rel="noopener noreferrer"
      >
        Provide Feedback →
      </Link> */}
    </nav>
  </footer>
);

export default Footer;
