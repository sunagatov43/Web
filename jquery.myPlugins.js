(function( $ ){

	var score=0;
	var miss=0;
	var z=-1;
	var leftR="";
	var leftT="";
	var txtL="";
	var txtT="";
	var isSpawn=true;
	var playing=true;
	
   var methods = {
    init : function( options ) { 
		const delay = (ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
		
		var settings={
			'height': 30,
			'width': 30,
			'spawn': 10,
			'speed': 5000,
			'delay': 2000
		}
		
		console.log("init");
	  
		return this.each(function(){
			if (options){
				$.extend(settings, options);
			}
			
				
			levelSelect();
			interfaceGame();
			interfaceResult();
			
			$('.game').hide();
			$('.gen2').hide();
			startGame();
			function levelSelect(){
				$('body').append('<fieldset class="gen">'+
				'<legend align="center">Кубомёт</legend>'+
				'<p>Выберите уровень сложности</p>'+
				'<label><input type="radio" name="radio" value="1" checked> Кошмар </label>'+
				'<label><input type="radio" name="radio" value="2"> Выживание </label>'+
				'<label><input type="radio" name="radio" value="3"> Смертоносный </label>'+
				'<center><button id="start">Летс ГОУ</button></center>'+
				'</fieldset>');
			}
			
			function startGame(){
				$('#start').on('click', function(){	
				playing=true;
				
					$('.gen').hide();
					$('.game').show();
					$('.gen2').show();
					
					var pl=	$('.game').position().left;
					var pt=	$('.game').position().top;
					var ph=	$('.game').height();
					var pw=	$('.game').width();
					var pht=ph-pt;
					var pwl=pw+pl;
					
					if ( $('input[name="radio"]:checked').val()==1){
					settings.width=50;
					settings.height=50;
					settings.spawn=10;
					settings.speed=5000;
					settings.delay=2000;
					}else if( $('input[name="radio"]:checked').val()==2){
					settings.width=40;
					settings.height=40;
					settings.spawn=16;
					settings.speed=4500;
					settings.delay=1200;
					}else if( $('input[name="radio"]:checked').val()==3){
					settings.width=30;
					settings.height=30;
					settings.spawn=30;
					settings.speed=4000;
					settings.delay=700;
					}
					spawnBlock(settings.spawn, pht, pwl, pl);
					
					$('#clear').on('click', function(){	
						score=0;
						miss=0;
						$("#hunt").text("Уничтоженно: "+score);
						$("#miss").text("Проскачило: "+miss);
				
					});
					
					$('#ago').on('click', function(){
							if(isSpawn==false){
						spawnBlock(settings.spawn);
						//console.log("gospawn");
							}else{
							}
					});
					
					$('#edit').on('click', function(){
						playing=false;
						$(".gen").show();
						
						$('.game').hide();
						$('.gen2').hide();
						console.log(playing);
						
						//clearT();
						
					});
					
					
				});
			}
			
			function interfaceGame(){
				playing=true;
				$('body').append('<fieldset class="game" ><legend align="center"></legend></fieldset>')
			}
			function interfaceResult(){
				
					
					$('body').append('<fieldset class="gen2">'+
				'<legend align="center">Результат</legend>'+
				'<p id="hunt">Уничтоженно: 0</p> <p id="miss">Проскачило: 0</p> '+
				'<center><button id="clear">Сбросить счет</button>'+
				'<button id="ago">Ещё раз</button>'+
				'<button id="edit">Изменить сложность</button></center>'+
				'</fieldset>');
			}

			function spawnBlock(num_spawn, pht, pwl, pl){
				isSpawn=true;
				
				for (var i=0;i<num_spawn;i++){
					console.log("stip je");
					let sa=(function(i){
						setTimeout(function() { 
						
							$('.game').append("<div class=block id=b"+i+" ></div>");
							var rnd=Math.floor((Math.random() * 2) + 1);
							var Brnd=Math.floor((Math.random() * 350) + 40);
							if (rnd==1){
								
								$("#b"+i).offset({top: pht, left: pwl});
							}else{
								$("#b"+i).offset({top: pht, left: pl});	
							}
							$("#b"+i).width(settings.width);
							$("#b"+i).height(settings.height);
							//console.log(num_spawn)
							if(i==num_spawn-1){
								//console.log("endspawn")
								isSpawn=false;
							}
							
							goAnim("#b"+i, rnd, Brnd);
							destroyBlock("#b"+i);
						
						}, settings.delay * (i + 1)); 
					})(i); 
					
				
				}
				
					
				
				
									
			}
			
			function destroyBlock(thisBlock){
				
				$(thisBlock).on('click', function(){
					score++;
					$(thisBlock).stop();
					$(thisBlock).remove();
					$("#hunt").text("Уничтоженно: "+score);
					
				});
				
				
				
			}
			
			function goAnim(thisBlock, num_r, num_Br){
				
				txtT=(360+num_Br).toString();
					leftT="-="+txtT+"px";
				if(num_r==1){
					txtL=(1100+num_Br).toString();
					leftR="-="+txtL+"px";
				}else{
					txtL=(1100+num_Br).toString();
					leftR="+="+txtL+"px";
				}
				$( thisBlock ).animate({"left": leftR, "top": leftT}, {duration: settings.speed, easing: "linear", complete: function(){
					miss++;
					console.log(miss);
					$("#miss").text("Проскачило: "+miss);
					$( thisBlock ).remove();
					
					}
					}
				);
				
			}
		
		});
    },
	
	reposiotion: function(){
	
	},
	
    show : function( ) {
      console.log("show");
	  $('#clear').on('click', function(){
	console.log("ssa");
	
});
    },
    hide : function( ) {
       console.log("hide");
    },
    update : function( content ) {
       console.log("update");
    }
  };

  $.fn.myPlugin = function( method ) {
    
    // логика вызова метода
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    } 
  };

})( jQuery );

// вызывает метод init
$('body').myPlugin(); 


 
 

