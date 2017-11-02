    var radios = document.formA.unitOfMeasure;
        for(var i = 0, max = radios.length; i < max; i++) {
          radios[i].onclick = function() {
            if (this.value=="metre"){
              result = prompt("How many metres is each item:","3");
            }else {
              result = "";
            }
          }
        }
    
    var inputs = $(':input').keyup(function (event) {
        if (event.keyCode == 13) {			
        event.preventDefault();
		var nextInput = inputs.get(inputs.index(this) + 1);
			if (nextInput) {
          		nextInput.focus();
       		}
        }
    });
    
    
      $('#qty').on('focus', function() {
        $('html,body').animate({
                scrollTop: 400,
                scrollLeft: 0
            }, 400, function(){
                $('html,body').clearQueue();
            });
      });
      
      $('#notes').on('focus', function() {
        $('html,body').animate({
                scrollTop: 450,
                scrollLeft: 0
            }, 400, function(){
                $('html,body').clearQueue();
            });
      });
      
    function validatorGS(){
      var code = "validatorGS";
      var stockCdSRC = $('#ptNum').val();
	  	var stockCd = stockCdSRC.replace(/-/g,"");
		stockCd = stockCd.replace(/ /g,"");
	    	stockCd = stockCd.toUpperCase();
      
      $.ajax({
        url:"https://script.google.com/macros/s/AKfycbwPdoySksRkZCnJUw2DrD0fZer5k43D-D_Sc90v6tvr1dgaITYZ/exec",data:
        {"code":code, "stockCd":stockCd}, 
        type:"GET",
        dataType:"json",
        }).done(function(res) {
          if (res==1){
			$('.modal-header').text('Duplicate Alert');
			$('.modal-body').text('This GS ACE code already exists in the database!');
            $('#alertModal').modal('show')
          }else{
            //alert(res);
          }
        })
          .fail(function(e) {
          alert("error:" + e)
        });
      }

    function validatorFS(){
      var code = "validatorFS";
      var stockCdSRC = $('#stockCd').val();
		var stockCd = stockCdSRC.replace(/-/g,"");
  		stockCd = stockCd.replace(/ /g,"");
	    	stockCd = stockCd.toUpperCase();
      
      $.ajax({
        url:"https://script.google.com/macros/s/AKfycbwPdoySksRkZCnJUw2DrD0fZer5k43D-D_Sc90v6tvr1dgaITYZ/exec",data:
        {"code":code, "stockCd":stockCd}, 
        type:"GET",
        dataType:"json",
        }).done(function(res) {
          if (res==1){
            //alert(res);
          }else{
			$('.modal-header').text('Duplicate Alert');
			$('.modal-body').text(res);
			$('#alertModal').modal('show')
            //alert(res);
          }
        })
          .fail(function(e) {
          alert("error:" + e)
        });
      }

     function postToAppsScript(){      
      var location =$('#location').val();
      var ptNum = $('#ptNum').val();
      var stockCd = $('#stockCd').val();
      var unitOfMeasure = $('input[name="unitOfMeasure"]:checked').val() + " " + result;
      var qty = $('#qty').val();
      var notes = $('#notes').val();
      
      $.ajax({
        url:"https://script.google.com/macros/s/AKfycbwPdoySksRkZCnJUw2DrD0fZer5k43D-D_Sc90v6tvr1dgaITYZ/exec",data:
        {"location":location,"ptNum":ptNum,"stockCd":stockCd,"unitOfMeasure":unitOfMeasure, "qty":qty,"notes":notes}, 
        type:"POST",dataType:"json",statusCode:
        {0:function(){
            $('.modal-header').text('Success');
			$('.modal-body').text("Stock record created!");
			$('#alertModal').modal('show')
			//alert("Stock Record Created!");
            $('input[name="unitOfMeasure"]:checked').prop('checked',false);
            $('input[type="text"], textarea').val('');
            $('input[name="qty"], textarea').val('');
              $('html,body').animate({
                  scrollTop: 0,
                  scrollLeft: 0
                }, 400, function(){
                $('html,body').clearQueue();
              });
            document.getElementById("location").focus();
          }
        }
      });
    }  
      
    function uncheckAll(){
        $('input[name="unitOfMeasure"]:checked').prop('checked',false);
        $('input[type="text"], textarea').val('');
        $('input[name="qty"], textarea').val('');
    }
