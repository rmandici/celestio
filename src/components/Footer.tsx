import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 text-center text-xs text-white/50">
      © {new Date().getFullYear()} Celestio Festival — All rights reserved.
    </footer>
  );
}
