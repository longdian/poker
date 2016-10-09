$(function(){

	function makePoker(){
		  var poker=[];
		   var kk={}
		   var color=["h","s","c","d"];
		   while(poker.length!==52){
		   	var c=Math.floor(Math.random()*4);
		   	var p=color[c]
			var n=Math.ceil(Math.random()*13);
			var v={
				color:p,
				number:n
			}
		    if(!kk[p+n]){
		      poker.push(v)
		      kk[p+n]=true;
		    }
		    } 
		    return poker;
	       }
  var poker=makePoker()	  

	function setpoker(poker){
		var biao={ 1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:"t",11:"j",12:"Q",13:"K"};
		        var index=0;
		        for(var i=0;i<7;i++){
		        	for(var j=0,v;j<i+1;j++){
		        		var poke=poker[index]
		        		index+=1;
				   		$("<div>")
				   		.addClass("pai")
						.css({'background-image':'url(./image/'+biao[poke.number]+''+poke.color+'.png)'})	
						.attr("data-number",poke.number)
						.attr("id",i+'_'+j)
						.attr("bb",index)
						.appendTo(".scene")
						.delay(index*30)
						.animate({
						 top:i*40,
					     left:j*130+(6-i)*65+55,
					     opacity:1
			         })
		        	}	
		        }

		        for(i=0;i<24;i++){
		        	var v=poker[index]
		        		index+=1;
				   		$("<div>")
				   		.addClass("pai liu")
						.css({'background-image':'url(./image/'+biao[v.number]+''+v.color+'.png)'})
						.attr("data-number",v.number)
						.attr("bb",index)
						.appendTo(".scene")
						.delay(index*50)
						.animate({
						 top:432,
					     left:240,
					     opacity:1
			         })
		        }
	          }
             // setpoker(poker)
var right=$('.move-right')
    right.on("click",function(){
    	var index=1;
        return function(){
        	index++;
      $('.liu')
      .last()
      .css({
      	zIndex:index,
      }).animate({
        left:650
      })
      .queue(function(){
      	$(this).removeClass('liu').addClass('left').dequeue();
      })
        }	
       }())	
   var left=$('.move-left')
   var number=0;
    left.on("click",function(){ 
        number+=1
			 if(number>3){
			    return
			 }	  
          return function(){
          	// 如果没牌
			if($('.liu').length){
			    return
			 }
			
			 // jquery中回调函数的this大部分情况下是指向集合中的一个DOM元素
			 $('.left').each(function(i,v){
			    $(this).css({zIndex:0})
			    // delay相当于一次setTimout
			    .delay(i*30)
			    .animate({left:240})
			    .queue(function(){
			 $(this).removeClass('left')
			    .addClass('liu')
			    .dequeue();
			      })
			})
    	} 		
         }())

  
    function getNumber(el){
     return parseInt($(el).attr('data-number'))
       }

    function isCanalick(el){
    	// 用id记录一些有意思的事情   4_5
	  	var x=parseInt($(el).attr("id").split('_')[0])  //4
	  	var y=parseInt($(el).attr("id").split('_')[1])  //5
	  	

	  	// var zuo=$('#'+(x+1)+'_'+y).length;
	  	// var zuo=$('#'+(x+1)+'_'+(y+1)).length;
	  	// return  zuo===0 && you===0

	  	// 如果x轴的上一行有  或者x上一行与y上一行 压住  返回false
	  	if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
		return false
	  }else{
		return true
	  }
       }
         var prev=null;
    $('.scene').on("click",".pai",function(){
	  	
		   // 如果有id 并且被压制 那么直接返回  
		    if($(this).attr("id")&&!isCanalick(this)){
		    	return;
		    }

// 要进行比较就必须需要得到上边number值同时用事件委派的方式将pai这副牌 拿到
            // 如果是13直接消除  函数返回
            // 第一张把这张存储
            // 第二张 上次存储和现在点的这个拿出来判断
		      var number=getNumber(this)
			  	if(number===13){
			  	$(this)
			  	.css("border","1px solid red")
			  	.animate({
			  		top:-100,
			  	}).queue(function(){
			  		// detach==remove
			  		$(this).detach().dequeue();
			  	})
			  	return
			  }
		    // $(this).css("border","1px solid blue")

		    if(prev){
		    	if(getNumber(prev)+getNumber(this)===13){
		    		prev.add(this)
		    		.animate({
		               top:-800,
		    		}).queue(function(){
		    			$(this).detach().dequeue();
		    		})
		    	}else{
		    		if(prev.attr("bb")==$(this).attr("bb")){
		    			prev.animate({
		    				top:'+=20'
		    			})
		    		}else{
		    		$(this).animate({
		    			top:'-=20'
		    		})
		    		.animate({
		    			top:'+=20'
		    		})
		    		prev.delay(400).animate({
		    			top:'+=20'
		    		})
		    		}
		    	}
		    	prev=null;
		    }else{
		    	 // 第一个非13
		    	prev=$(this)
		      prev.animate({
		      	top:'-=20'
		      })
		    	// console.log($(this))
		    }
         })
   //  var all=$('.all')
   //  all.on("mouseenter",function(){
   //  	all.css("display","block")
   // 	 $(this).find('.alls').stop();
   // 	 $(this).find('.alls').slideDown();
   //
   // })
   // all.on("mouseleave",function(){
   // 	 $(this).find('.alls').stop();
   // 	  $(this).find('.alls').slideUp();
   // })
   var one=$('.one')
    one.on("click",function(){
    	$('.pai').detach();
    	setpoker(makePoker());
    })
    var two=$('.two')
    two.on("click",function(){
    	$('.pai').detach();
    	setpoker(makePoker())
    })
    var three=$('.three')
    three.on("click",function(){
    	window.close();
    })
	
	var manual=$('.manual');
	var whiteBox=$('.white-box');
	manual.on("mousedown",false)
	manual.on("mousedown",function () {
		whiteBox.toggleClass("active")
	})
})