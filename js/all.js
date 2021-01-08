
'use strict';

/* Media Queries */

let above768 = window.matchMedia( '( min-width: 768px )' );

let above920 = window.matchMedia( '( min-width: 920px )' );

/* Scrollbar */

{

  function updateScrollbarWidth() {

    let root = document.documentElement;

    root.style.setProperty( '--scrollbar-width', `${ window.innerWidth - root.clientWidth }px` );

  }

  document.addEventListener( 'DOMContentLoaded', updateScrollbarWidth );

  window.addEventListener( 'resize', updateScrollbarWidth );

}

/* Header */

{

  const DOCUMENT_LOAD_DELAY = 250;

  const WINDOW_RESIZE_DEBOUNCE = 250;
  
  let header = document.getElementById( 'header' );

  let menu = document.getElementById( 'menu' );

  let toggleMenuButton = document.getElementById( 'toggle-menu' );

  let collapseMenuButton = menu.querySelector( '.collapse' );

  let toggleMenuNavButtons = Array.from( menu.querySelectorAll( 'button:not( .collapse )' ) );

  let menuNavs = Array.from( menu.querySelectorAll( 'nav' ) );

  /*let searchForm = document.getElementById( 'search' );

  let searchQuery = document.getElementById( 'search-query' );

  let searchCollapseButton = searchForm.querySelector( '.collapse' );*/

  let utilityToggleSearchButton = document.getElementById( 'utility-toggle-search' );

  let principalToggleSearchButton = document.getElementById( 'principal-toggle-search' );

  // let searchIsNotCollapsable = search.dataset.collapsable === "false";

  let windowResizeTimeoutReference = null;

  let windowResizing = false;

  let lastScrollTop = null;

  function disableBodyScroll() {

    document.body.style.paddingRight = `${ window.innerWidth - document.body.clientWidth }px`;

    document.body.style.overflow = 'hidden';

  }

  function enableBodyScroll() {

    document.body.style.paddingRight = null;

    document.body.style.overflow = null;

  }

  function toggleMenu() {

    if ( menu.hidden ) expandMenu(); else collapseMenu();

  }

  function expandMenu() {

    if ( above768.matches ) {

      enableBodyScroll();

      collapseAllMenuNavs();

    }

    else {

      disableBodyScroll();

      expandAllMenuNavs();

    }

    collapseMenuButton.setAttribute( 'aria-expanded', 'true' );

    toggleMenuButton.setAttribute( 'aria-expanded', 'true' );

    menu.hidden = false;

  }

  function collapseMenu() {

    enableBodyScroll();

    collapseAllMenuNavs();

    toggleMenuButton.setAttribute( 'aria-expanded', 'false' );

    menu.hidden = true;

  }

  function onMenuTransitionEnd( event ) {

    if ( event.target === menu && event.propertyName === 'visibility' && ! above768.matches ) {

      if ( menu.hidden ) menu.scrollTop = 0;

      else collapseMenuButton.focus();

    }

  }

  function onMenuKeyDown( event ) {

    if ( event.key === 'Escape' && ! above768.matches ) collapseMenu();

  }

  function onMenuFocusOut( event ) {

    if ( ! above768.matches && ! menu.hidden  && ! menu.contains( event.relatedTarget ) ) collapseMenu();

  }

  function toggleMenuNav( event ) {

    let button = event.target.closest( 'button' );

    if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {

      collapseMenuNav( button );

    }

    else {

      collapseAllMenuNavs( button );

      expandMenuNav( button );

    }

  }

  function expandMenuNav( button ) {

    let nav = button.nextElementSibling;

    button.setAttribute( 'aria-expanded', 'true' );

    nav.hidden = false;

  }

  function collapseMenuNav( button ) {

    let nav = button.nextElementSibling;

    button.setAttribute( 'aria-expanded', 'false' );

    nav.hidden = true;

  }

  function expandAllMenuNavs() {

    toggleMenuNavButtons.forEach( button => expandMenuNav( button ) );

  }

  function collapseAllMenuNavs( excludeButton ) {

    toggleMenuNavButtons.forEach( button => {

      if ( excludeButton !== button ) collapseMenuNav( button );

    } );

  }

  function onSharedMenuNavKeyDown( event ) {

    if ( event.key === 'Escape' && above768.matches ) collapseAllMenuNavs();

  }

  function onSharedMenuNavFocusOut( event ) {

    let button = event.target.closest( 'button' );

    let nav = event.target.closest( 'nav' );

    if ( button ) nav = button.nextElementSibling;

    else button = nav.previousElementSibling;

    if ( above768.matches && ! nav.hidden && ! nav.contains( event.relatedTarget ) && event.relatedTarget !== button ) collapseMenuNav( button );

  }
/*
  function toggleSearchForm() {

    if ( searchForm.hidden ) expandSearchForm(); else collapseSearchForm();

  }

  function expandSearchForm() {

    searchCollapseButton.setAttribute( 'aria-expanded', 'true' );

    utilityToggleSearchButton.setAttribute( 'aria-expanded', 'true' );

    principalToggleSearchButton.setAttribute( 'aria-expanded', 'true' );

    utilityToggleSearchButton.disabled = true;

    principalToggleSearchButton.disabled = true;

    searchForm.hidden = false;

  }

  function collapseSearchForm() {

    if ( searchIsNotCollapsable ) return;

    searchCollapseButton.setAttribute( 'aria-expanded', 'false' );

    utilityToggleSearchButton.setAttribute( 'aria-expanded', 'false' );

    principalToggleSearchButton.setAttribute( 'aria-expanded', 'false' );

    utilityToggleSearchButton.disabled = false;

    principalToggleSearchButton.disabled = false;

    searchForm.hidden = true;

  }

  function onSearchFormTransitionEnd( event ) {

    if ( event.target === search && event.propertyName === 'visibility' ) {

      if ( searchForm.hidden ) searchQuery.value = null;

      else searchQuery.focus();

    }

  }

  function onSearchFormSharedKeyDown( event ) {

    if ( event.key === 'Escape' ) collapseSearchForm();

  }*/

  function onDocumentLoad( event ) {

    setTimeout( () => {

      lastScrollTop = document.documentElement.scrollTop;

      window.addEventListener( 'resize', onWindowResize );

      window.addEventListener( 'scroll', onWindowScroll );
      
    }, DOCUMENT_LOAD_DELAY );

  }

  function onWindowResize( event ) {

    windowResizing = true;

    clearTimeout( windowResizeTimeoutReference );

    windowResizeTimeoutReference = setTimeout( () => {

      lastScrollTop = document.documentElement.scrollTop;

      windowResizing = false;

    }, WINDOW_RESIZE_DEBOUNCE );

  }

  function onWindowScroll( event ) {

    if ( windowResizing ) return;
    
    let scrollTop = document.documentElement.scrollTop;

    let scrollDelta = scrollTop - lastScrollTop;

    if ( scrollTop < header.clientHeight || scrollDelta < 0 ) {

      header.hidden = false;

    }
    /*
    else if ( scrollDelta > 0 && searchForm.hidden ) {

      collapseAllMenuNavs();

      header.hidden = true;

    }*/
  
    lastScrollTop = scrollTop;

  }

  function onCrossing768() {

    header.classList.add( 'no-transitions' );

    if ( above768.matches ) expandMenu(); else collapseMenu();

    setTimeout( () => header.classList.remove( 'no-transitions' ), 0 );

  }

  menu.addEventListener( 'focusout', onMenuFocusOut );

  menu.addEventListener( 'keydown', onMenuKeyDown );

  menu.addEventListener( 'transitionend', onMenuTransitionEnd );

  toggleMenuButton.addEventListener( 'click', toggleMenu );

  collapseMenuButton.addEventListener( 'click', collapseMenu );

  toggleMenuNavButtons.forEach( button => {

    button.addEventListener( 'click', toggleMenuNav );

    button.addEventListener( 'focusout', onSharedMenuNavFocusOut );

    button.addEventListener( 'keydown', onSharedMenuNavKeyDown );

  } );

  menuNavs.forEach( nav => {

    nav.addEventListener( 'focusout', onSharedMenuNavFocusOut );

    nav.addEventListener( 'keydown', onSharedMenuNavKeyDown );

  } );
/*
  searchForm.addEventListener( 'keydown', onSearchFormSharedKeyDown );

  searchForm.addEventListener( 'transitionend', onSearchFormTransitionEnd );

  searchCollapseButton.addEventListener( 'click', collapseSearchForm );

  utilityToggleSearchButton.addEventListener( 'click', toggleSearchForm );

  utilityToggleSearchButton.addEventListener( 'keydown', onSearchFormSharedKeyDown );

  principalToggleSearchButton.addEventListener( 'click', toggleSearchForm );

  principalToggleSearchButton.addEventListener( 'keydown', onSearchFormSharedKeyDown );*/

  document.addEventListener( 'DOMContentLoaded', onDocumentLoad );

  above768.addListener( onCrossing768 );

  onCrossing768();

}

/* Subheader */

{

  let toggles = Array.from( document.querySelectorAll( '#subheader .expandable' ) );

  for ( let toggle of toggles ) {

    let region = document.getElementById( toggle.getAttribute( 'aria-controls' ) );

    let expanded = region.querySelector( 'input[ name = "expanded" ]' );

    function expandRegion( noTransition = false ) {

      if ( noTransition ) {

        region.classList.add( 'no-transitions' );

        region.style.height = null;

        setTimeout( () => region.classList.remove( 'no-transitions' ), 0 );

      }

      else {

        region.style.height = `${ region.scrollHeight }px`;

      }

      toggle.setAttribute( 'aria-expanded', 'true' );

      if ( expanded ) expanded.value = 'true';

    }

    function collapseRegion( noTransition = false ) {

      if ( noTransition ) {

        region.classList.add( 'no-transitions' );

        region.style.height = null;

        setTimeout( () => region.classList.remove( 'no-transitions' ), 0 );

      }

      else {

        region.style.height = `${ region.scrollHeight }px`;

        setTimeout( () => region.style.height = null, 0 );

      }

      toggle.setAttribute( 'aria-expanded', 'false' );

      if ( expanded ) expanded.value = 'false';

    }

    function onSharedKeyDown( event ) {

      if ( ! above768.matches ) {

        if ( event.key === 'Escape' && toggle.getAttribute( 'aria-expanded' ) === 'true' ) collapseRegion();

      }

    }

    function onToggleClick( event ) {

      if ( ! above768.matches ) {

        if ( toggle.getAttribute( 'aria-expanded' ) === 'true' ) collapseRegion();

        else expandRegion();

      }

    }

    function onRegionTransitionEnd( event ) {

      if ( event.target === region && event.propertyName === 'height' ) region.style.height = null;

    }

    function onCrossing768( event ) {

      toggle.disabled = above768.matches;

      if ( above768.matches ) expandRegion( true ); else collapseRegion( true );

    }

    function onDocumentLoad( event ) {

      toggle.disabled = above768.matches;

      if ( above768.matches || expanded && expanded.value === 'true' ) expandRegion( true );

      else collapseRegion( true );

    }

    toggle.addEventListener( 'click', onToggleClick );

    toggle.addEventListener( 'keydown', onSharedKeyDown );

    region.addEventListener( 'keydown', onSharedKeyDown );

    region.addEventListener( 'transitionend', onRegionTransitionEnd );

    above768.addListener( onCrossing768 );

    document.addEventListener( 'DOMContentLoaded', onDocumentLoad );

  }

  let filters = document.getElementById( 'filters' );

  if ( filters ) filters.addEventListener( 'change', event => filters.submit() );

}

/* Raised Hours */

{
  
  let hours = Array.from( document.querySelectorAll( 'main section.raised.hours' ) );

  hours.forEach( section => {
    
    section.addEventListener( 'click', event => {
      
      let current = event.target.closest( '.rich-text' );
      
      let button = event.target.closest( 'button' );
      
      if ( ! current || ! button ) return;
      
      let previous = current.previousElementSibling;
      
      let next = current.nextElementSibling;
        
      if ( button.classList.contains( 'previous' ) && previous ) {
        
        previous.hidden = false;
        
        current.hidden = true;
        
      }
      
      if ( button.classList.contains( 'next' ) && next ) {
        
        next.hidden = false;
        
        current.hidden = true;
        
      }
      
    } );
    
  } );
  
}

/* Reel */

{
  
  const DIRECTIONS = {
    
    upward: { current: 'downward', next: 'upward' },
    
    rightward: { current: 'leftward', next: 'rightward' },
    
    downward: { current: 'upward', next: 'downward' },
    
    leftward: { current: 'rightward', next: 'leftward' }
    
  }
  
  let reels = Array.from( document.querySelectorAll( 'main section.reel' ) );

  reels.forEach( section => {
    
    let top = section.querySelector( '.top .items' );

    let bottom = section.querySelector( '.bottom .items' );

    let control = section.querySelector( '.control button' );

    let circle = control.querySelector( 'circle:last-child' );

    let dots = section.querySelector( '.dots' );
    
    let currentTopItem, currentTopItemVideo, currentBottomItem, currentDot, currentDuration;

    let radius = circle.r.baseVal.value;
    
    let circumference = Math.PI * radius * 2;
    
    circle.style.strokeDasharray = `${ circumference } ${ circumference }`;

    let transitioning = false;
    
    let currentIndex = 0;

    let frameId = null;
    
    let elapsed = 0;
    
    let then = null;
   
    function bind() {

      currentTopItem = top.children[ currentIndex ];
      
      currentTopItemVideo = currentTopItem.querySelector( 'video' );
      
      currentBottomItem = bottom.children[ currentIndex ];

      currentDot = dots.children[ currentIndex ];

      currentDuration = parseFloat( currentDot.dataset.duration ) * 1000;
        
      currentDot.classList.add( 'current' );

    }

    function transition( nextIndex, direction = 'downward' ) {
      
      if ( transitioning || dots.children.length < 2 || currentIndex === nextIndex ) return;
      
      pause();
      
      update( 0 );
      
      elapsed = 0;
      
      transitioning = true;
      
      section.dataset.state = direction;
      
      direction = DIRECTIONS[ direction ];
      
      let nextTopItem = top.children[ nextIndex ];
      
      let nextTopItemVideo = nextTopItem.querySelector( 'video' );
      
      let nextBottomItem = bottom.children[ nextIndex ];

      currentIndex = nextIndex;
      
      currentDot.classList.remove( 'current' );
      
      nextTopItem.classList.add( 'no-transitions' );
      
      nextTopItem.setAttribute( 'hidden', direction.next );
        
      if ( nextTopItemVideo ) nextTopItemVideo.currentTime = 0;  
      
      setTimeout( () => {
              
        currentTopItem.setAttribute( 'hidden', direction.current );
        
        nextTopItem.classList.remove( 'no-transitions' );
        
        currentBottomItem.hidden = true;
      
        nextTopItem.hidden = false;
        
        nextBottomItem.hidden = false;
        
      }, 100 );
      
    }
    
    function next() {
     
      transition( currentIndex + 1 > dots.children.length - 1 ? 0 : currentIndex + 1 ); 
      
    }
   
    function play() {

      then = null;

      frameId = requestAnimationFrame( onFrame );
      
      if ( currentTopItemVideo ) currentTopItemVideo.play();
      
      section.dataset.state = 'playing'; 

    }
    
    function pause() {
      
      cancelAnimationFrame( frameId );
      
      if ( currentTopItemVideo ) currentTopItemVideo.pause();

      section.dataset.state = 'paused';
      
    }

    function update( progress ) {
      
      circle.style.strokeDashoffset = circumference - progress * circumference;
    
    }

    function onFrame( now ) {

      if ( ! then ) then = now;
      
      elapsed += now - then;
      
      then = now;

      let progress = Math.max( 0, Math.min( 1, elapsed / currentDuration ) );
      
      update( progress );

      if ( progress < 1 ) frameId = requestAnimationFrame( onFrame ); else next();

    }

    function onTopTransitionEnd( event ) {

      if ( transitioning && event.target === currentTopItem ) {
        
        currentTopItem.hidden = true;
        
        bind();
        
        play();
        
        transitioning = false;

      }

    }
    
    function onControlClick() {
      
      if ( transitioning ) return;
      
      if ( section.dataset.state === 'playing' ) pause(); else play();
      
    }
    
    function onDotsClick( event ) {

      if ( event.target.hasAttribute( 'data-index' ) ) {

        let nextIndex = parseInt( event.target.dataset.index );

        transition( nextIndex, nextIndex > currentIndex ? 'downward' : 'upward' );

      }

    }

    top.addEventListener( 'transitionend', onTopTransitionEnd );
    
    control.addEventListener( 'click', onControlClick );
    
    dots.addEventListener( 'click', onDotsClick );
    
    update( 0 );
    
    bind();
    
    play();

  } );
  
}

/* Carousel */

{

  const TICK_DELAY = 100;

  let carousels = Array.from( document.querySelectorAll( 'main section.carousel' ) );

  carousels.forEach( section => {

    let carousel = section.querySelector( '.carousel' );

    let items = carousel.firstElementChild;

    let previousButton = carousel.querySelector( '.previous' );

    let nextButton = carousel.querySelector( '.next' );
    
    let remove = null;
        
    let watch = null;

    function transpose( backward = false ) {

      if ( watch ) return;

      if ( backward ) {

        remove = items.lastElementChild;

        let clone = watch = remove.cloneNode( true );

        clone.setAttribute( 'hidden', 'to-left' );

        items.prepend( clone );

        remove.hidden = true;

        setTimeout( () => clone.hidden = false, TICK_DELAY );

      }

      else {

        watch = remove = items.firstElementChild;

        let clone = remove.cloneNode( true );

        clone.hidden = true;

        items.append( clone );

        remove.setAttribute( 'hidden', 'to-left' );

        setTimeout( () => clone.hidden = false, TICK_DELAY );

      }

    }

    function onItemsTransitionEnd( event ) {

      if ( watch && event.target === watch ) {

        remove.remove();
        
        remove = watch = null;

      }

    }

    items.addEventListener( 'transitionend', onItemsTransitionEnd );

    previousButton.addEventListener( 'click', event => transpose( true ) );

    nextButton.addEventListener( 'click', event => transpose() );

  } );

}

/* Accordion */

{

  let accordions = Array.from( document.querySelectorAll( 'main section.accordion' ) );

  accordions.forEach( accordion => {

    let buttons = Array.from( accordion.querySelectorAll( 'button' ) );

    buttons.forEach( button => {

      let item = document.getElementById( button.getAttribute( 'aria-controls' ) );

      function expandItem() {

        item.style.height = `${ item.scrollHeight }px`;

        button.setAttribute( 'aria-expanded', 'true' );

      }

      function collapseItem() {

        item.style.height = `${ item.scrollHeight }px`;

        setTimeout( () => item.style.height = null, 0 );

        button.setAttribute( 'aria-expanded', 'false' );

      }

      function onButtonKeyDown( event ) {

        if ( event.key === 'Escape' && button.getAttribute( 'aria-expanded' ) === 'true' ) collapseItem();

      }

      function onButtonClick( event ) {

        if ( button.getAttribute( 'aria-expanded' ) === 'true' ) collapseItem();

        else expandItem();

      }

      function onItemTransitionEnd( event ) {

        if ( event.target === item && event.propertyName === 'height' ) item.style.height = null;

      }

      button.addEventListener( 'click', onButtonClick );

      button.addEventListener( 'keydown', onButtonKeyDown );

      item.addEventListener( 'transitionend', onItemTransitionEnd );

    } );

  } );

}

/* Dialogs */

{

  let main = document.querySelector( 'main' );

  let buttons = Array.from( document.querySelectorAll( 'button[ data-dialog ]' ) );

  buttons.forEach( button => {

    let options = JSON.parse( button.dataset.dialog.replace( /'/g, '"' ) );

    button.addEventListener( 'click', event => {

      let dialog = null;

      switch ( options.type ) {

        case 'video':

          dialog = new VideoDialog( options );

          break;

      }

      if ( dialog ) {

        let section = button.closest( 'section' );

        if ( main.lastElementChild === section ) main.append( dialog );

        else main.insertBefore( dialog, section.nextElementSibling );

        setTimeout( () => dialog.hidden = false, 0 );

      }

    } );

  } );

  function VideoDialog( options, relatedTarget ) {

    let embed = {

      vimeo: identifier => `

        <iframe src="https://player.vimeo.com/video/${ identifier }?autoplay=1"

          frameborder="0" allow="autoplay" allowfullscreen

        ></iframe>

      `,

      youtube: identifier => `

        <iframe src="https://www.youtube-nocookie.com/embed/${ identifier }?&rel=0&modestbranding=1&autoplay=1"

          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen

        ></iframe>

      `

    };

    let self = document.createElement( 'div' );

    self.setAttribute( 'role', 'dialog' );

    self.classList.add( 'video' );

    self.setAttribute( 'tabindex', 0 );

    self.hidden = true;

    self.innerHTML = `

      <button>

        <i class="nai-icon-close-x"></i>

        <span class="sr-only">close this video dialog<span>

      </button>

      ${ embed[ options.source ]( options.identifier ) }

    `;

    let button = self.querySelector( 'button' );

    function hideDialog() {

      self.hidden = true;

    }

    function onDialogKeyDown( event ) {

      if ( event.key === 'Escape' ) hideDialog();

    }

    function onDialogTransitionEnd( event ) {

      if ( event.target === self && event.propertyName === 'visibility' ) {

        if ( self.hidden ) {

          document.body.removeEventListener( 'focusin', onBodyFocusIn );

          self.remove();

        }

        else {

          self.focus();

        }

      }

    }

    function onBodyFocusIn( event ) {

      if ( self !== event.target && ! self.contains( event.target ) ) {

        event.stopPropagation();

        event.preventDefault();

        hideDialog();

      }

    }

    self.addEventListener( 'keydown', onDialogKeyDown );

    self.addEventListener( 'transitionend', onDialogTransitionEnd );

    button.addEventListener( 'click', hideDialog );

    document.body.addEventListener( 'focusin', onBodyFocusIn );

    return self;

  }

}
