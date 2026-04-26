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

    const path = document.createElementNS(ns, 'path')
    path.setAttribute('d', 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z')
    const circle = document.createElementNS(ns, 'circle')
    circle.setAttribute('cx', '12')
    circle.setAttribute('cy', '12')
    circle.setAttribute('r', '3')

    svg.appendChild(path)
    svg.appendChild(circle)
    btn.appendChild(svg)

    btn.addEventListener('click', () => {
      const visible = input.type === 'text'
      input.type = visible ? 'password' : 'text'
      btn.setAttribute('aria-label', visible ? 'Show password' : 'Hide password')
      btn.dataset.visible = visible ? '' : 'true'
    })

    wrapper.appendChild(btn)
  }, [])

  return null
}
