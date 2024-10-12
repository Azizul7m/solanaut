import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="wallet">
    Wallet
  </div>
`

setupCounter(document.querySelector<HTMLDivElement>('#wallet')!)
