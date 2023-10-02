$(document).foundation();

$.ajax('https://localhost:7227/api/v1/Osoba',   // request url
    {
        success: function (data, status, xhr) {// success callback function
            //console.log(data);
            for(let i=0; i<data.length;i++){
                $('#podaci').append('<li>' + data[i].nadimak + '</li>');
            }
    }
});

$('#dodaj').click(function(){

    let osoba = { nadimak: $('#nadimak').val(), email: $('#email').val() };

    $.ajax('https://localhost:7227/api/v1/Osoba', {
        type: 'POST',  // http method
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(osoba),  // data to submit
        success: function (data, status, xhr) {
            $('#podaci').append('<li>' + $('#nadimak').val() + '</li>');
        },
        error: function (jqXhr, textStatus, errorMessage) {
                //alert(errorMessage);
                console.log(errorMessage);
        }
    });

    return false;

});