$(function(){
    start();
    });


function start() 
{
    getLogDataKeys();
    //Hier ggf. noch weitere Methoden die driekt gestartet werden müssen
}

//a function that retrieves a list of objects for owner logdata
function getLogDataKeys()
{
    $.getJSON("https://webtechlecture.appspot.com/cloudstore/listobjects?owner=travelmates", //mit ...listkeys... holt man nur die Keys nicht ganze Objekte
              
              function(data)//this function is called when the server answers its data
              {
                console.log(data)
                if (data.length>0)
                {
                    $.each(data,
                           function(index,logEntry){//this function is called for each single object in the array named "data" (listobjects and listkeays answer an array, while get does not!)
                                processLogEntry(logEntry);
                                
                            });
                }
                else{
                    console.log("Not registered yet.")
                }
              }
                
             ).done(function(){
                console.log("done")
                google.charts.setOnLoadCallback(drawStuff);
            });
}

function LogInRequest(Username,aPassword,counter)
		{
			$.getJSON("http://webtechlecture.appspot.com/cloudstore/get?owner=travelmates&key="+encodeURIComponent(Username),
					  function(response)
					  {
						console.log("answer from server:");
						console.log(response);
						if (response[password] == aPassword)
						{
                            //Valid = True; in der LogInUser. Vllt mit einem Key im JSON-File der überschrieben wird und mit Logout wieder False wird
							LogInUser(Username, True);
                        }
                        else
						{
                            console.log("Log-In Data False");
                            //counter als Key im JSON und dann bei erfolgreich den Counter wieder auf 0 setzen
                            counter ++;
						}
						
						});
		}

function Registrierung(Username, aPassword,vName,lName, Alter, Geschlecht, Sprachen)
    {
        //Das Password muss ein JSON Objekt werden damit ich es LogIn hinzufügen kann
        var LogInData = {"passwort":aPassword, "Valid":True, "Counter":0};
        //Sprachen muss eine Liste sein [Deutsch,Englisch]
        var PersoData = {"vName": vName, "lName":lName, "Geburtstag": Alter, "Sprachen": Sprachen, "Geschlecht":Geschlecht}
        var Freunde = {}
        $.getJSON("http://webtechlecture.appspot.com/cloudstore/add?owner=travelmates&key="+encodeURIComponent(Username)+"&LogIn="+encodeURIComponent(JSON.stringify(LogInData))+
                    "&pDaten="+encodeURIComponent(JSON.stringify(PersoData))+"&Freunde="+encodeURIComponent(JSON.stringify(Freunde)),
					  function(response)
					  {						
						console.log(response);
						});
    }


        	
