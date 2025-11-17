export default function Footer() {
  return (
    <footer className="py-12 text-center text-xs text-white/50 space-y-1">
      <div>
        © {new Date().getFullYear()} Celestio Festival — All rights reserved.
      </div>
      <div>
        Created by{" "}
        <a
          href="https://mdcwebcraft.com"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline text-white/60"
        >
          mdcwebcraft.com
        </a>
      </div>
    </footer>
  );
}
