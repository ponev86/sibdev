import './scss/index.scss'

const burger = document.querySelector('.burger__btn')
const headerTitle = document.querySelector('.header__title')
const navWrapper = document.querySelector('.nav')
const navLinks = document.querySelectorAll('.nav__link')
let isScrolling

burger.addEventListener('click', () => {
  burger.classList.toggle('burger__btn_active')
  document.querySelector('.logo').classList.toggle('logo_active')
  document.querySelector('.nav').classList.toggle('nav_active')
  document.querySelector('.wrapper').classList.toggle('opened')
})

navWrapper.addEventListener('click', event => {
  event.preventDefault()
  const target = event.target
  const navLink = target.closest('a')
  if (navLink) {
    navLinks.forEach(item => {
      item.classList.remove('nav__link_active')
    })
    navLink.classList.add('nav__link_active')

    const title = navLink.querySelector('span').textContent
    headerTitle.textContent = title
  }
})


window.addEventListener('scroll', event => {
  if (window.pageYOffset > 99) {
    document.querySelector('.header').classList.add('header__scrolling')
  }
  clearTimeout(isScrolling)
  isScrolling = setTimeout(() => {
    if (window.pageYOffset < 100) {
      document.querySelector('.header').classList.remove('header__scrolling')
    }
  }, 50)
},
false)