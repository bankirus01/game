var table= document.getElementById('game')
var log= document.getElementById('log')
var body= document.getElementById('body')

var create_random_number= function(max_number){
	return Math.floor(Math.random()*max_number)
}

var logger= {
	log_wrapper_element: null,
	log_array: [],
	emmit: function(emmit_text, log_wrapper_element){
		this['log_wrapper_element']= log_wrapper_element
		var text_element= document.createElement('p')
		text_element.innerText= emmit_text
		this['log_wrapper_element'].appendChild( text_element )
		this['log_array'].push( emmit_text )
	} 
}

var map= {
	table_DOM_element: null,
	map_array: null,
	width: null,
	height: null,
	create_GUI: function( width,height,table_DOM_element ){
		
		this['width']= width
		this['height']=height
		this['table_DOM_element']= table_DOM_element
		this[ 'map_array' ]= [  ]

		for( var height_count=0; height_count<this['height']; height_count++){
			var row= [  ]

			var table_row= document.createElement('tr')
			this['table_DOM_element'].appendChild( table_row )

			for( var width_count=0; width_count<this['width']; width_count++ ){
				var table_data= document.createElement('td')
				table_data.innerText= '.'
				table_row.appendChild( table_data )

				row.push( table_data )
			}
			this['map_array'].push(row)
		}
	}
}

var hero= {
	x: null,
	y: null,
	map_array: null,
	create: function( x,y,map_array ){
		this['map_array']= map_array
		this['x']= x
		this['y']= y

		this[ 'map_array' ][ this['y'] ][ this['x'] ].innerText= '@'
	},
	move: function( new_x, new_y ){
		this[ 'map_array' ][ this['y'] ][ this['x'] ].innerText= '.'

		this['x']= new_x
		this['y']= new_y

		this[ 'map_array' ][ this['y'] ][ this['x'] ].innerText= '@'
	},
	relocate: function( new_x,new_y ){
		if( this[ 'map_array' ][ new_y ] 
			&& this[ 'map_array' ][ new_y ][ new_x ] ) {
			if( this[ 'map_array' ][ new_y ][ new_x ].innerText == '.'){
				this['move'](new_x,new_y)
			} else {
				switch( this[ 'map_array' ][ new_y ][ new_x ].innerText ){
					case '#':
						
						console.log( this[ 'map_array' ][ new_y ][ new_x ].offsetLeft )
						console.log( this[ 'map_array' ][ new_y ][ new_x ].offsetTop )
						
						var chat_message= document.createElement('div')
						chat_message.setAttribute('class','chat_message')

						chat_message.style.top= this[ 'map_array' ][ new_y ][ new_x ].offsetTop-30+'px'
						chat_message.style.left= this[ 'map_array' ][ new_y ][ new_x ].offsetLeft-30+'px'

						body.appendChild(chat_message)
						logger['emmit']('Это стенка', log)
						break
					case '$':
						this[ 'map_array' ][ new_y ][ new_x ].innerText= '+'
						logger['emmit']('Отжал телефон', log)
						break
					case '+':
						logger['emmit']('О, мобила', log)
						this['move'](new_x,new_y)
						break
					default:
						console.log('whut is this?!')
				}
			}
		}
	}
}

var obstacle= {
	create: function(x,y,map_array){
		map_array[ y ][ x ].innerText= '#'	
	},
	create_random_walls: function(walls_number, map_array){
		for( var i=0; i<walls_number; i++){
			var rand_x= create_random_number(map['width'])
			var rand_y= create_random_number(map['height'])
			if(map['map_array'][rand_y][rand_x].innerText=='.'){
				this['create'](rand_x,rand_y,map_array)
			}
		}
	}
}

var enemy= {
	create: function(x,y,map_array){
		map_array[ y ][ x ].innerText= '$'
	},
	create_random_enemies: function(enemies_number, map_array){
		for( var i=0; i<enemies_number; i++){
			var rand_x= create_random_number(map['width'])
			var rand_y= create_random_number(map['height'])
			if(map['map_array'][rand_y][rand_x].innerText=='.'){
				this['create'](rand_x,rand_y,map_array)
			}
		}
	}
}

map['create_GUI']( 40,20,table )

hero['create']( 
	create_random_number(map['width']),
	create_random_number(map['height']),
	map['map_array'] )

obstacle['create_random_walls'](100, map['map_array'])

enemy['create_random_enemies'](10,map['map_array'])


document.addEventListener( 'keydown', function(event){
	var current_location= {
		x: hero['x'],
		y: hero['y']
	}
	switch( event['keyCode'] ){
		case( 38 ):
			event.preventDefault()
			hero['relocate']( current_location['x'], current_location['y']-1 )
			break
		case( 40 ):
			event.preventDefault()
			hero['relocate']( current_location['x'], current_location['y']+1 )
			break
		case( 37 ):
			event.preventDefault()
			hero['relocate']( current_location['x']-1, current_location['y'] )
			break
		case( 39 ):
			event.preventDefault()
			hero['relocate']( current_location['x']+1, current_location['y'] )
			break
	}
	
} )