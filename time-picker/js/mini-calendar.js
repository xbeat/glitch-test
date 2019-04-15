			/**
			 * calendar.js
			 */

			class calendar {

				constructor ( selector, events ) {

					this.current = new Date();
					this.today =  new Date();
					this.current.setDate( 1 );
					this.drawMonth();
				};

				async drawMonth () {

					const _this = this;

					if( !this.headerHTML ) {

						this.headerHTML = true;

						document.querySelectorAll( ".mini-calendar-prev-button" )[0].addEventListener( 'click', function() { _this.prevMonth(); } );
						document.querySelectorAll( ".mini-calendar-next-button" )[0].addEventListener( 'click', function() { _this.nextMonth(); } );

					};

					document.querySelectorAll( ".mini-calendar-month-name" )[0].innerText = this.monthsAsString( this.current.getMonth() ) + ' ' + this.current.getFullYear();
				
					if ( this.calendarGrid ){
						this.calendarGrid.remove();
						this.calendarGrid = "";
					};

					this.backFill();
					this.currentMonth();
					this.forwardFill();

				};

				nextMonth () {

					this.current.setMonth( this.current.getMonth() + 1 );
					this.drawMonth();

				};

				prevMonth () {

					this.current.setMonth( this.current.getMonth() - 1 );
					this.drawMonth();

				};

				backFill () {

					var clone = new Date( this.current );
					var dayOfWeek = clone.getDay();
					dayOfWeek = dayOfWeek - 1 == -1 ? dayOfWeek = 6 : dayOfWeek - 1;// shifting day of the week to start from monday

					if( !dayOfWeek ) { return; }

					clone.setDate( clone.getDate() - ( dayOfWeek + 1 ) );

					for( var i = dayOfWeek; i > 0; i-- ) {
						clone.setDate( clone.getDate() + 1 )
						this.drawDay( clone, true );
					};

				};

				currentMonth () {

					var clone = new Date( this.current );

					while( clone.getMonth() === this.current.getMonth() ) {	
						this.drawDay( clone, false );
						clone.setDate( clone.getDate() + 1 );
					};

				};

				async forwardFill () {

					var clone = new Date( this.current );
					clone.setMonth( clone.getMonth() + 1 );
					clone.setDate( clone.getDate() - 1 );

					var dayOfWeek = clone.getDay();
					dayOfWeek = dayOfWeek - 1 == -1 ? dayOfWeek = 6 : dayOfWeek - 1;// shifting day of the week to start from monday

					if( dayOfWeek === 6 ) { 
						return; 
					}

					for( var i = dayOfWeek; i < 6 ; i++ ) {
						clone.setDate( clone.getDate() + 1 );
						this.drawDay( clone, true );
					};

				};

				async drawDay ( day, other ){

					if ( !this.calendarGrid ){
						this.calendarGrid = this.createElement( "div", "mini-calendar-grid" );
						document.getElementById( "mini-calendar" ).appendChild( this.calendarGrid );
					};

					let dayContainer = this.createElement( "div", "mini-calendar-day-container" );
					this.calendarGrid.appendChild( dayContainer );

					dayContainer.addEventListener( "click", ( ev ) => { 
													ev.stopPropagation()
													alert( ev.currentTarget.dataset.date );
												}, false );

					dayContainer.dataset.date = day.getFullYear() + '-' + ( "0" + ( day.getMonth() + 1 ) ).slice( -2 ) + '-' + ( "0" + day.getDate()).slice( -2 ) ;

					let dayNumber = this.createElement( "div", "mini-calendar-day-number" );
					dayNumber.dataset.target = "#modalListEvent";
					dayNumber.innerText = day.getDate();

					if ( day.getDate() == this.today.getDate() && day.getMonth() == this.today.getMonth() && day.getFullYear() == this.today.getFullYear() ){
						dayContainer.classList.add( "mini-calendar-day-container-today" );
						dayNumber.classList.add( "day-today" );
					};	

					if ( other ) dayNumber.style.color = "#bbb";
					dayContainer.appendChild( dayNumber );

				};

				createElement( tagName, className, innerText ) {

					var ele = document.createElement( tagName );

					if( className ) {
						ele.className = className;
					};

					if( innerText ) {
						ele.innerText = ele.textContent = innerText;
					};
					
					return ele;
				};

				monthsAsString ( monthIndex ) {
					return [
					'Gennaio',
					'Febbraio',
					'Marzo',
					'Aprile',
					'Maggio',
					'Giugno',
					'Luglio',
					'Agosto',
					'Settembre',
					'Ottobre',
					'Novembre',
					'Dicembre'
					][monthIndex]
				};

			};

			const cal = new calendar();
