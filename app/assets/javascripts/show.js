$(function(){

  $('#remove-tag').hide();
  $('#create-tag').hide();
  attachListeners();
  indexListeners();

})

var path = window.location.pathname;
var postId;
var newPost;
// pathId = pathId[pathId.length -1]



function attachListeners(){
  $('#tag-listener').click(function(){
    getAllTags();
    $('#tag-listener').hide();
    $('#remove-tag').show();
    $('#create-tag').show();
  })



  $('#remove-tag').click(function(){

    $('#tags li').remove();
    $('#remove-tag').hide();
    $('#tag-listener').show();
    $('#create-tag').hide();
  })



    $('#create-tag').submit(function(e){
        console.log(" aint gonna work bitch ");
      $.ajax({
        url: path + "/create_tag",
        method: "POST",
        data: {
          name: $('#new-tag').val()
        }
      }).done(function(){
        appendTag()
      });
      e.preventDefault();
    });

    };

  // debugger;



  function appendTag(){
    $.getJSON(path).done(function(response) {
      // showTags(response.post.tags)
if ($('#new-tag').val() != '') {
      new_tag = showTag(response.post.tags[response.post.tags.length-1])
      $('#tags').append(new_tag)
      $('#new-tag').val('');
      deleteTag()
    }
    })
  }







var getAllTags = function() {
  $.getJSON(path).done(function(response) {
    showTags(response.post.tags)
    deleteTag()


  })
}

function deleteTag(){
$(".delete_class").click(function(e){

var id = $(this).attr('data-tag-id');
$('#listed-tag-'+id ).hide();

    $.ajax({
      url: path + '/delete_tag',
      method: "DELETE",
      data:{
        tag_id: $(this).attr("data-tag-id")
      }
    })
  })


}


var showTag = function(tag) {
  // return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
  var tag =
    ' <li id="listed-tag-'+tag.id+'" data-name=" ' + tag.name+ ' " data-tag-id="'+tag.id+'">' +
       tag.name +
      '<button class="delete_class" data-tag-id="'+tag.id+'">Remove</button>' +
    '</li>';

  return tag;
}


var showTags = function(tags) {
  var dom = "";
  tags.forEach(function(tag) {
    dom += (showTag(tag));
  });
  $("#tags").html(dom);
}


function postData(){
  return {"post":{"tags": newPost}};
}


/////////////////////// INDEX.JS FILE ////////////////////////


function indexListeners(){

  $('#create-post').hide();

  $('#create-post').submit(function(e){
    $.ajax({
      url: "/posts",
      method: "POST",
      data: {
        "post":{
          "name": $('#post-name').val(),
          "content": $('#post-content').val(),
          "tag": $('#tag-name').val()
        }
      }
    }).done(function(){
      appendPost()
    });
    e.preventDefault();
    console.log("prevent that default ");
  });

  $('#new-post-form').click(function(){
    $('#create-post').show();
    $('#new-post-form').hide();
  })

// $('#showPostsBttn').click(function(){
//   $('#showPostsBttn').hide()
//   getAllPosts();
//   $('.post-listener').click(function(){
//     debugger;
//   })
// })

getAllPosts()

}

function appendPost(){

  $.getJSON("/posts").done(function(response) {
    // showTags(response.post.tags)
    debugger;

    new_post = showPost(response.posts[response.posts.length-1])
    $('#showPosts').append(new_post)
    $('#create-post input[type=text]').val('');
    $('#create-post textarea').val('');
    $('#create-post').hide();
    // deleteTag()

  })
}

function getAllPosts(){
$.getJSON(path).done(function(response){
  showPosts(response.posts)
});
}


var showPosts = function(posts) {
  var dom = "";
  posts.forEach(function(post) {
    dom += (showPost(post));
  });
  $("#showPosts").html(dom);
}

var showPost = function(post) {
  // return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
  var post =
  '<tr>'+
  '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
   post.name +'</td>'+
  //  console.log(post.id);
  '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show " +' </td>'+
  '<td>'+  '<a href="/posts/'+post.id+'/edit " >' + " Edit" +' </td>'+
   '<td>'+  '<a data-method="delete" href="/posts/'+post.id+' " >' + " Destroy" +'</td>'+



  '</tr>' +

  '<br>';

  return post;
}



//
// ' <li id="listed-tag" data-name=" ' + post.name+ ' " data-tag-id=" ' + post.id + ' ">' +
//    post.name +
//   '<button class="delete_class" data-tag-id=" '+ post.id + ' ">Remove</button>' +
// '</li>';
