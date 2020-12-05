$(() => {

  $('#auth-btn').on('click', () => {
    const access_token = $('#auth-val').val()
    // console.log(access_token);
    $('.login-container').remove()




    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(response) {
        $('.welcome').text(`Welcome ${response.display_name}!`)
        console.log(response);
      }
  });

      $('#search-btn').on('click', () => {
      const $search_val = $('#search-val').val()
      console.log($search_val);
      $('.artist-info').remove()
      $('<div>').addClass('artist-info').appendTo($('.interface'))
      $('.carosel-container').remove()
      $('<div>').addClass('carosel-container').appendTo('.interface')
      $('<div>').addClass('album-tracks').appendTo($('.interface'))
      $('.album-tracks').remove()

    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${$search_val}&type=artist` ,
      headers: {
        'Authorization': 'Bearer ' + access_token
        },
      }).then((data) => {
        const artistName = data.artists.items[0].name
        const artistId = data.artists.items[0].id
        const artistImage = data.artists.items[0].images[0].url

        $('<h1>').text(artistName).appendTo($('.artist-info'))
        $('<img>').attr('src', artistImage).appendTo($('.artist-info'))


        // console.log(artistId);
        // console.log(data.artists.items[0].name);
        // console.log(data);

        $.ajax({
          url:`https://api.spotify.com/v1/artists/${artistId}/albums` ,
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        }).then((data) => {
          console.log(data);
          for (let i=0; i<data.items.length; i++){
            const albumId = data.items[i].id
            const albumName = data.items[i].name
            const albumArt = $('<img>').attr('src', data.items[i].images[0].url)
            $('<h6>').text(albumName).appendTo($('.carosel-container')).append(albumArt)

            $.ajax({
              url:`https://api.spotify.com/v1/albums/${albumId}/tracks` ,
              headers: {
                'Authorization': 'Bearer ' + access_token
              }
            }).then((data) => {
              const $albumTracks = $('<div>').addClass('album-tracks')
              for (i=0; i<data.items.length; i++){
                const trackName = (data.items[i].name)
                $('<h1>').text(trackName).appendTo($albumTracks)
                $albumTracks.appendTo('body')
                // console.log(trackName);
              }
              // console.log(trackName);
              // console.log(' space');
            }), (error) => {
              console.log(error);
            }



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
