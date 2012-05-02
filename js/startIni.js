	var os = {

		initialize:function(){
			os.makeBar();	
			os.makeBG();
			os.bindEvents();
			os.resize();
		},

		makeBar:function(){
			var e = $('<div/>').css({
				'top':window.innerHeight - 40 +'px',
			    'position':'absolute'	
			}).attr({
				id:'startBar',
				class:'startBar'
			}).html('<span class="sprite startIco"></span>');
			$('body').append(e);

		},

		makeBG:function(){
			$("body").addClass("background");
			os.makeBasicDeskIcons();
		},

		makeBasicDeskIcons:function(){
			os.createIcon("trashCan.png","body",75,75,"trash");
		},

		bindEvents:function(){
			$(".startIco").click(function(){
				os.toggleStartMenu();
			});

			$("body").delegate(".closeWin", "click", function(){
				$(this).parents(".stdWindow").fadeOut("slow",function(){
					$(this).remove();
				});
			});

			$("body").delegate(".minimizeIcon", "click", function(){
				var topTo = window.innerHeight - 40;
				$(this).parents(".stdWindow").animate({
					'top':topTo +"px"
				},1000);
			});


		},

		resize : function(){
			window.onresize = function(){
				$("#startBar").css({
					'width':'100%',
					'top':window.innerHeight - 40 +'px'
				});

				var menuList = $("#menuListBox");
				var menuListH = $(menuList).height();
				console.log("menuListH");
				if($(menuList).size()!==0){
					$(menuList).css({
						'top':window.innerHeight - menuListH - 50+"px"
					})
				}
				
			}
		},

		createIcon:function(icon,addTo,width,height,label){
			var e = $("<div/>").addClass(
				"desktopIcon"
			).html(
				'<img src="images/'+icon+'" width="'+width+'" height="'+height+'"/><div>'+label+'</div>'
			).appendTo(
				addTo
			).css({
				'position':'absolute',
				'top':10,
				'left':10
			}).draggable({containment:"parent"}).click(
			function(){
				$(this).css("boder","1px solid #fff");
			}).dblclick(function(){
				os.makeWindow("trashWindow");
			});

		},

		makeWindow:function(id){
			if($("#"+id).size()===0){
				$("<div/>").addClass("stdWindow").attr('id',id).appendTo("body").html(os.makeWindowCnt()).draggable({
					containment:"parent"
				}).resizable({
					containment:"parent",
					minHeight: 150,
					minWidth: 200
				});		
			}
		
		},

		makeWindowCnt: function(){
			var el = $("<div/>").addClass("windowEvents").append('<span class="sprite closeWin"></span><span class="sprite minimizeIcon"></span>');
			return el;
		},

		toggleStartMenu:function(){
			if($("#menuListBox").size()===0){
				var stW = $("<div/>").addClass("startMenuList").attr('id','menuListBox').html(os.loadStartIniContent());
				$("body").append(stW);
				var eH = $("#menuListBox").height();
				eH = eH  + 50;
				$(".startMenuList").css({
				'top':window.innerHeight - eH + "px"	
				}).fadeIn("slow");
			}else{
				$("#menuListBox").fadeOut("slow",function(){
					$(this).remove();
				});
			}
			

		},

		loadStartIniContent:function(){
			//make ajax call and bring back data
			var e = $("<ul/>")
			for(var i=0,ii=4; i<ii; i++){
				var el = $("<li/>");
				var listIco = $("<span/>").addClass("sprite folderStIco");
				var listTxt = $("<span/>").text("list element "+i);
				$(el).append(listIco).append(listTxt);
				$(e).append(el);
			}
			return e;
		}

	};


	$(document).ready(function(){
		os.initialize();	
	});