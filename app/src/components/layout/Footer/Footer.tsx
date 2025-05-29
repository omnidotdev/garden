import Link from "next/link";

/**
 * Layout header.
 */
const Footer = () => (
  <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
    <p className="text-muted-foreground text-xs">
      © {new Date().getFullYear()} Omni
    </p>

    <nav className="flex gap-4 sm:ml-auto sm:gap-6">
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
        Privacy
      </Link>
    </nav>
  </footer>
);

export default Footer;
