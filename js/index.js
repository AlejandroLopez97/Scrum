var word = document.getElementById("input");
var html = "h";
searchInText(input,html);
function searchInText (word, html) {

    //---Eliminar los spans
    html = html.replace(/<span class="finded">(.*?)<\/span>/g, "$1");

    //---Crear la expresión regular que buscará la palabra
    var reg = new RegExp(word.replace(/[\[\]\(\)\{\}\.\-\?\*\+]/, "\\$&"), "gi");
    var htmlreg = /<\/?(?:a|b|br|em|font|img|p|span|strong)[^>]*?\/?>/g;

    //---Añadir los spans var array;
    var htmlarray;
    var len = 0;
    var sum = 0;
    var pad = 28 + word.length;

    while ((array = reg.exec(html)) != null) {

        htmlarray = htmlreg.exec(html);

        //---Verificar si la búsqueda coincide con una etiqueta html 
        if (htmlarray != null && htmlarray.index < array.index && htmlarray.index + htmlarray[0].length > array.index + word.length) { 
            reg.lastIndex = htmlarray.index + htmlarray[0].length; 
            continue;
        }

        len = array.index + word.length;
        html = html.slice(0, array.index) + "<span class='finded'>" + html.slice(array.index, len) + "</span>" + html.slice(len, html.length);
        reg.lastIndex += pad;

        if (htmlarray != null) htmlreg.lastIndex = reg.lastIndex;    
        sum++;

    }

    return { total: sum, html: html };

}
