import React, { useEffect, useRef, useState } from 'react';

export default function Menu() {
  const [isOpen, open] = useState(false)
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    open((state) => !state)
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuContainerRef.current && event.target.className !== 'css-menu__button' && !menuContainerRef.current.contains(event.target)) {
        open(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuContainerRef])

  return <div className={`css-menu ${isOpen && 'open'}`}>
    <button className='css-menu__button' onClick={toggle}>
      <div className='css-menu__button__dash'></div>
      <div className='css-menu__button__dash'></div>
    </button>
    <div className='css-menu__main'>
      <div ref={menuContainerRef} className='css-menu__item__wrapper'>
        <div className='css-menu__item'><a href='/'>1</a></div>
        <div className='css-menu__item'><a href='/'>2</a></div>
        <div className='css-menu__item'><a href='/'>3</a></div>
        <div className='css-menu__item'><a href='/'>4</a></div>
        <div className='css-menu__item'><a href='/'>5</a></div>
      </div>
    </div>
  </div>;
}
