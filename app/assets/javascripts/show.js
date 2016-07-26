$(function(){
  // These selectors are located in the show show page for a post //
  $('#remove-tag').hide();
  $('#create-tag').hide();
  attachListeners();
// This loads the posts for the index page //
  getAllPosts()

})

// returns the current url making it easier for ajax requests if its a show page specifically//
var path = window.location.pathname;
var postId;
var newPost;
var posts= [];
var myPosts=[];
var restPosts=[];




function attachListeners(){

  //////////////  Show Page Listeners ////////////////
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


///////Index page listeners////////

  $('#new-post-form').click(function(){
    $('#create-post').show();
    $('#new-post-form').hide();
  })

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
        reloadPost();
      });
      e.preventDefault()
    });


    };



/////////////  Show Page functions ///////////




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
    createTagObjects(response)
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


/////////////////////// INDEX.JS FILE ////////////////////////



function reloadPost(){
  $.getJSON(path).done(function(response){

    showPosts(response.posts)

    $('#create-post input[type=text]').val('');
    $('#create-post textarea').val('');
    $('#create-post').hide();
    // deleteTag()
    $('#new-post-form').show();
  });
}

var createPostObjects = function(response) {
  response.posts.forEach(function(post) {
    posts.push(new Post(post.id, post.name, post.user.id, post.current_user_id))
  })
  showMyPosts();
}

var Post = function(id, name, user_id, current_user_id) {
  this.id = id;
  this.name = name;
  this.user_id = user_id;
  this.current_user_id = current_user_id;
  this.my_post()
}

Post.prototype.my_post = function(){

  if(this.current_user_id == this.user_id) {
    myPosts.push(this);
  } else {
    restPosts.push(this);
  }

}

function showMyPosts(){
  var dom = "";
  myPosts.forEach(function(post) {
    var post_td =
    '<table>'+
    '<tr>'+
    '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
     post.name +'</td>'+
    //  console.log(post.id);
    '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show " + " "+' </td>' +



        '<td>'+  '<a href="/posts/'+post.id+'/edit " >' + " Edit" +' </td>'+
        '<td>'+  '<a data-method="delete" href="/posts/'+post.id+' " >' + " Destroy" +'</td>'+
        '<tr>' + '<table>';


    dom += (post_td);
  });
  $("#myposts").html(dom);

}

function getAllPosts(){
$.getJSON(path).done(function(response){
  showPosts(response.posts)
  createPostObjects(response)
});
}


var showPosts = function(posts) {
  var dom = "";
  posts.forEach(function(post) {
    dom += (showPost(post, post.current_user_id));
  });
  $("#showPosts").html(dom);
}

var showPost = function(post, current_user_id) {
  // return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
  var post_td =
  '<table>'+
  '<tr>'+
  '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
   post.name +'</td>'+
  //  console.log(post.id);
  '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show " + " "+' </td>';

  if (post.user.id == current_user_id) {
    post_td +=
      '<td>'+  '<a href="/posts/'+post.id+'/edit " >' + " Edit" +' </td>'+
      '<td>'+  '<a data-method="delete" href="/posts/'+post.id+' " >' + " Destroy" +'</td>';
  }

  post_td += '</tr>' + '</table>' + '<br>';

  return post_td;
}
