import "../styles/Navigation.css"

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/public">Public</a>
        </li>
        <li>
          <a href="/private">Private</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  )
}