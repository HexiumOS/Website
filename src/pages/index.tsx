import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Lightweight operating system written in Rust"
    >
      <main>
        <div className="hero-div">
          <div className="hero-text-div">
            <h1 className="hero-header">Welcome to Hexium OS</h1>

            <p className="hero-paragraph">
              A lightweight and secure operating system written in Rust,
              designed for speed, safety, and efficiency. 🦀
            </p>
          </div>

          <div className="hero-button-container">
            <a href="https://github.com/HexiumOS/Hexium/releases" target="_blank">
              <span>Download Hexium OS</span>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
