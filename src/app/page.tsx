'use client';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { HeroContent } from "@/components/home/HeroContent";
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-content',
        pin: true,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        invalidateOnRefresh: true
      }, defaults: {
        ease: 'none'
      }
    })
    .to('#t1', {
        opacity: 0
      }, "start")
    .to('#t3', {
        opacity: 0
      }, "<")
    .to('#t4', {
        rotate: -190,
        x: -300
      })
    .to('#t5', {
        rotate: 190,
        x: 300
      }, '<')
    .to('#t2', {
        scale: 50
      })
    .to('.top-hero', {
        opacity: 0
      }, "<")
    .to('.try-text', {
        opacity: 100
      })
    .to('#button-combo', {
        opacity: 100
      })
  })


  return (
    <HeroContent/>
  )
}
