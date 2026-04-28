'use client'
import { useEffect } from 'react'

export default function LoginPasswordToggle() {
  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>('input[name="password"]')
    if (!input) return

    const wrapper = input.parentElement
    if (!wrapper || wrapper.querySelector('.pass-toggle')) return

    wrapper.style.position = 'relative'
    input.style.paddingRight = '2.75rem'

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'pass-toggle'
    btn.setAttribute('aria-label', 'Show password')

    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    svg.setAttribute('width', '15')
    svg.setAttribute('height', '15')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
    svg.setAttribute('aria-hidden', 'true')

    const updateIcon = () => {
      svg.innerHTML = ''
      if (input.type === 'text') {
        const eyeOffPath = document.createElementNS(ns, 'path')
        eyeOffPath.setAttribute('d', 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24')
        eyeOffPath.setAttribute('stroke-width', '2')
        const line = document.createElementNS(ns, 'line')
        line.setAttribute('x1', '1')
        line.setAttribute('y1', '1')
        line.setAttribute('x2', '23')
        line.setAttribute('y2', '23')
        line.setAttribute('stroke-width', '2')
        svg.appendChild(eyeOffPath)
        svg.appendChild(line)
      } else {
        const path = document.createElementNS(ns, 'path')
        path.setAttribute('d', 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z')
        const circle = document.createElementNS(ns, 'circle')
        circle.setAttribute('cx', '12')
        circle.setAttribute('cy', '12')
        circle.setAttribute('r', '3')
        svg.appendChild(path)
        svg.appendChild(circle)
      }
    }

    updateIcon()
    btn.appendChild(svg)

    btn.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password'
      btn.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password')
      if (input.type === 'text') {
        btn.dataset.visible = 'true'
      } else {
        btn.removeAttribute('data-visible')
      }
      updateIcon()
    })

    wrapper.appendChild(btn)
  }, [])

  return null
}
