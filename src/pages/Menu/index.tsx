import React, { useEffect, useRef, useState } from 'react';

export default function Menu() {
  const [isChecked, check] = useState(false)
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const handleCheckbox = () => check(value => !value)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuContainerRef.current && event.target.className !== 'toggle-button' && !menuContainerRef.current.contains(event.target)) {
        check(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuContainerRef])

  return <div className='css-menu'>
    <input type="checkbox" id="toggle-control" checked={isChecked} onChange={handleCheckbox} />
    <label className="toggle-button" htmlFor="toggle-control" />
    <div className='menu-container'>
      <div ref={menuContainerRef} className='menu-item-wrapper'>
        <a href='/'><div className='menu-item'>1</div></a>
        <a href='/'><div className='menu-item'>2</div></a>
        <a href='/'><div className='menu-item'>3</div></a>
        <a href='/'><div className='menu-item'>4</div></a>
        <a href='/'><div className='menu-item'>5</div></a>
      </div>
    </div>
  </div>;
}
