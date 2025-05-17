import deploy from '../assets/deploy_what_could_go_wrong.jpg'
export default function NoPage() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <img src={deploy} />
    </div>
  )
}