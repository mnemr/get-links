/** Get Links
* Param1:DOM element
* Returns:Array
**/
function _getLinks(linkSection){
  var links = linkSection.children;
  var numberOfLinks = links.length || 0;
  var allLinks = [];

  if(numberOfLinks === 0){
    return [];
  }

  for(var i = 0; i < numberOfLinks; i++){
    allLinks.push(links[i].innerHTML);
  }

  return allLinks;
}

/* Split Links
*  Params1:String
*/
function _split(text){
  var inputText = text;
  var words = inputText.split('\n');
  var newLinks = [];
  for(var i=0; i < words.length; i++){
    var urlRegex = /(http?:\/\/[^\s]+)/g;
    if(urlRegex.test(words[i])){
      newLinks.push(words[i]);
    }
  }
  return newLinks;
}

/* Split Links
*  Params1:Array
*  Params2:Array
*  Returns: Array
*/
function _buildList(currentList, newArray){
  //Add check for unique array list
  return currentList.length === 0 ? _.uniq(newArray) : _.uniq(currentList.concat(newArray));
}

/* Build DOM
*  Param1:DOM ID
*/
function _buildDOM(mergedArray, element){
  var listHTML = '';
  var url = '';

  if(mergedArray.length === 0){
    return 'Nothing to add to the DOM';
  }

  for(var j = 0; j < mergedArray.length; j++){
    url = mergedArray[j];
    var href = url.indexOf('http://') === 0 ? url : 'http://'+url;
    listHTML += '<li><a href='+href+' target=_blank>' + mergedArray[j] + '</a></li>';
  }

  $(element).html(listHTML);
}


function parse(currentLinksDOM) {
  //var links = _getLinks(currentLinksDOM);
  var text = document.getElementById('inputText').value;
  var newLinks = _split(text);
  var mergedLinks = _buildList([], newLinks);
  //localStorage["links"] = JSON.stringify(mergedLinks);
  _buildDOM(mergedLinks, currentLinksDOM);
}

// function loadList(){
//   var cachedList = JSON.parse(localStorage.getItem("links"));
//   if(cachedList){
//     _buildDOM(cachedList, currentLinksDOM);
//   }
// }

$( document ).ready(function() {
  var parseButton = document.getElementById('parseButton');
  var currentLinksDOM = document.getElementById('links');
  // Event Listeners
  if(parseButton){
    parseButton.addEventListener('click', function(){
      parse(currentLinksDOM);
    });
  }
});
