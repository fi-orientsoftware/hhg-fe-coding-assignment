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
    <input type="checkbox" id="btnControl" />
    <label className="btn" htmlFor="btnControl">Click me!</label>
    <div className='css-menu__main'>
      <a href='/'><div className='css-menu__item'>1</div></a>
      <a href='/'><div className='css-menu__item'>2</div></a>
      <a href='/'><div className='css-menu__item'>3</div></a>
      <a href='/'><div className='css-menu__item'>4</div></a>
      <a href='/'><div className='css-menu__item'>5</div></a>
    </div>
  </div>;
}
