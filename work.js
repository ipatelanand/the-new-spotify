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
      $('#next-btn').remove()
      $('#back-btn').remove()

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



          const albumContainerArray = []
          for (let i=0; i<data.items.length; i++){
            const albumId = data.items[i].id
            const albumName = $('<h3>').text(data.items[i].name)
            const albumArtSrc =  data.items[i].images[0].url
            const albumContainer = $('<div>').addClass('album-Container')

            albumContainer.css('height', '640px')
            albumContainer.css('width', '640px')
            albumContainer.css('overflow', 'scroll')
            albumName.appendTo(albumContainer)
            albumContainer.css('background-image', `url("${albumArtSrc}")`)
            albumContainerArray.push(albumContainer)
            // albumContainer.appendTo($('.carosel-container'))






            $.ajax({
              url:`https://api.spotify.com/v1/albums/${albumId}/tracks` ,
              headers: {
                'Authorization': 'Bearer ' + access_token
              }
            }).then((data) => {

              const $albumTracks = $('<div>').addClass('album-tracks')
              for (i=0; i<data.items.length; i++){
                let iterator = 1+i
                const trackName = `${iterator}. ${(data.items[i].name)}`
                $('<h1>').text(trackName).appendTo($albumTracks)
                $albumTracks.appendTo(albumContainer)
              }


            }), (error) => {
              console.log(error);
            }



          }

          //end for for loop


          $('<button>').attr('id', 'back-btn').text('back').appendTo($('body'))
          let iteratorArray = 0
          albumContainerArray[0].appendTo($('.carosel-container'))
          $('#back-btn').on('click', () => {
            iteratorArray--
            if (iteratorArray < 0) {
              albumContainerArray[0].hide()
              iteratorArray =  albumContainerArray.length -1
              albumContainerArray[iteratorArray].appendTo($('.carosel-container')).show()
              // console.log(iteratorArray);
            } else {
              albumContainerArray[iteratorArray+1].hide()

              albumContainerArray[iteratorArray].appendTo($('.carosel-container')).show()
            }


          })


            $('<button>').attr('id', 'next-btn').text('next').appendTo($('body'))

            albumContainerArray[0].appendTo($('.carosel-container'))

            $('#next-btn').on('click', () => {

              if (iteratorArray !== albumContainerArray.length -1) {
                albumContainerArray[iteratorArray].hide()
                iteratorArray++
                albumContainerArray[iteratorArray].appendTo($('.carosel-container')).show()

              } else {
                albumContainerArray[iteratorArray].hide()
                iteratorArray =0
                albumContainerArray[iteratorArray+1].show()

              }

            })



          // (albumContainerArray[0]).appendTo($('body'))

        }), (error) => {
          console.log(error);
        }




      }), (error) => {
      console.log(error);
      }


      })



    })







})
