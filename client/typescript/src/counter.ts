export function setupCounter(element: HTMLDivElement) {
  const setCounter = () => {
    element.innerHTML = `
    <h1>
       How fast it is?
    </h1>
    <p>Yeah! it response quite well</p>
`
  }
  setCounter()
}
