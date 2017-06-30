  var xhr = new XMLHttpRequest()
  xhr.open('GET','/API',false)
  xhr.onreadystatechange = function(){
     if(xhr.readyStage == 4){
        if(xhr.status == 200){
            console.log(xhr.responseText)
        }
     }
  }
  xhr.send(null)
