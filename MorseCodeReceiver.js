/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *     You can call this function to let the app know that the 
 *     end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *     This will be a textarea element where you can display
 *     the recieved message for the user.
 * 
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *     This is a button element.  When clicked this should 
 *     cause your app to reset its state and begin recieving
 *     a new message.
 *
 */


// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE

var PrevIm= ''; ======
var mCode="";
var redCount=0;
var blueCount=0;
var output="";

var msgFieldRef= document.getElementById("messageField");
var morseCode = {
    "._" : "a",
    "_...":"b",
	"_._.":"c",
	"_.." : "d",
	"." : "e",
	".._." : "f",
	"__." : "g",
	"...." : "h",
	".." : "i",
	".___" : "j",
	"_._" : "k",
	"._.." : "l",
	"__" : "m",
	"_." : "n",
	"___" : "o",
	".__." : "p",
	"__._" : "q",
	"._." : "r",
	"..." : "s",
	"_" : "t",
	".._" : "u",
	"..._" : "v",
	".__" : "w",
	"_.._" : "x",
	"_.__" : "y",
	"__.." : "z",
	"_____" : "0",
	".____" : "1",
	"..___" : "2",
	"...__" : "3",
	"...._" : "4",
	"....." : "5",
	"_...." : "6",
	"__..." : "7",
	"___.." : "8",
	"____." : "9",
	"_.__." : "(",
    "_.__._": ")",
    "._.._.": "“",//has to be changed
    "_..._": "=",
    ".____.": "‘",//has to be changed
    "_.._.": "/",
    "._._.": "+",
    "___...": ":",
    "._._._": ".",
    "__..__": ",",
    "..__..": "?",
    "_...._": "-",
    ".__._.": "@",
    "..._.._": "$",
    "..__._":"_",
    "_._.__":"!",
    "._._": "\n", //new Line
	"..._._": "End Of transmission",
}





function updateText (string) 
{ msgFieldRef.innerText = string }



/*
 * This function is called once per unit of time with camera image data.
 * 
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *         Each pixel is representing by four consecutive integer values for 
 *         the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *         instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is 
 *         an 'on' (red) signal.
 */



function decodeCameraImage(data)
{
var numberOfReds = 0; 
var numberOfBlues = 0;
var i=0;
var imageColor;

	
while (i<data.length) 
{
	if (data[i] > 200 && data[i+1]<10 && data[i+2]<10 && data[i+3]>200)
    {
		numberOfReds++
	}
	else if (data[i]<10 && data[i+1]<10 && data[i+2]>200 && data[i+3]>200)
	{
		numberOfBlues++
	}
	i = i+4;

}
	if (numberOfReds>numberOfBlues) 
	{
		imageColor= true;
	}
		else if (numberOfBlues>numberOfReds)
	{
       imageColor= false;  
    }
	
			
if (PrevIm == '' && imageColor== true)
{ 
    PrevIm= "red";
    redCount++
}
	
   if (PrevIm == '' && imageColor== false)
{ 
    PrevIm= "blue";
   blueCount++
}
   
 if (PrevIm == "red" && imageColor == true)    
    {
        PrevIm= "red";
        redCount++; 
    }
 
  if (PrevIm=="red" && imageColor== false && redCount>=3)
	{
        mCode+= "_";
        redCount=0;
        blueCount++;
        PrevIm= "blue";
    }
if (PrevIm =="blue" && imageColor== true && blueCount<=3)
    {
		blueCount=0; 
        redCount++;
        PrevIm="red";
		;
		
		
    }
    if (PrevIm== "red" && imageColor==false && redCount<=2)
        {
            mCode+= ".";
            redCount=0;
            blueCount++
            PrevIm= "blue";
			
        }
        if (PrevIm=="blue" && imageColor==false)
            {
                blueCount++;
                PrevIm="blue";
				
            }
    if (PrevIm=="blue" && imageColor==true && blueCount>=3 && blueCount<=6)
        {
            blueCount=0;
            redCount++;
            output+= morseCode[mCode];
            mCode= "";
            PrevIm="red"
        }
	if (PrevIm=="blue" && imageColor==true && blueCount>=7)
	{ blueCount=0;
            redCount++;
	  PrevIm="red";
	 
	 if (mCode!== ""){
            output+= morseCode[mCode]+" ";
            mCode= "";}
	 
           else  {
			   output+="";
		   }
	}
	
	
	
	if (morseCode[mCode] === "End Of transmission") 
	{	
		messageFinished();
	}
	
	
	
	updateText(output);
		
    return imageColor;
}

document.getElementById('restartButton').onclick = function () 
{
	
	output = "";
	mCode= "";
	PrevIm= '';
	redCount =0;
	blueCount=0;
	updateText(output);
}
