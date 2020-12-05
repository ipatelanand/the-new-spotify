$(() => {
  $('#auth-btn').on('click', () => {
    const access_token = $('#auth-val').val()
    console.log(access_token);


    $('#search-btn').on('click', () => {
    const $search_val = $('#search-val').val()
    console.log($search_val);

    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(response) {
        $('.welcome').text(`Welcome ${response.display_name}`)
        console.log(response);
      }
  });



    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${$search_val}&type=artist` ,
      headers: {
        'Authorization': 'Bearer ' + access_token
        },
      }).then((data) => {
        const artistName = data.artists.items[0].name
        const artistId = data.artists.items[0].id
        const artistImage = data.artists.items[0].images[0].url

        $('<h1>').text(artistName).appendTo($('body'))
        $('<img>').attr('src', artistImage).appendTo($('body'))

        console.log(artistId);
        console.log(data.artists.items[0].name);
        console.log(data);

        $.ajax({
          url:`https://api.spotify.com/v1/artists/${artistId}/albums` ,
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        }).then((data) => {
          console.log(data);
          for (let i=0; i<data.items.length; i++){
            const albumName = data.items[i].name
            const albumArt = $('<img>').attr('src', data.items[i].images[0].url)
            $('<h6>').text(albumName).appendTo($('body')).append(albumArt)
          }
        }), (error) => {
          console.log(error);
        }




      }), (error) => {
      console.log(error);
      }


      })



    })







})
