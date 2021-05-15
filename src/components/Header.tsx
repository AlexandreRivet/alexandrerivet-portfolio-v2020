import Link from 'next/link';

const Header = () => (
  <header>
    <Link href="/">
      <a>HOME</a>
    </Link>
    <nav>
      <ul>
        <li>
          <Link href="/about">
            <a>ABOUT</a>
          </Link>
        </li>
        <li>
          <Link href="/projects">
            <a>PROJECTS</a>
          </Link>
        </li>
        <li>
          <Link href="/playground">
            <a>PLAYGROUND</a>
          </Link>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      header * {
        position: relative!important;
        z-index: 1;
        color: white;
        cursor: auto;
      }
    `}</style>
  </header>
);

export default Header;