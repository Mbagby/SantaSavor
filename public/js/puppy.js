// $(function() {

//   function loadPuppies() {
//     $.getJSON("/puppies").done(function(data){
//     	data.puppies.forEach(function(puppy){
//     		$("body").append("<br ?>" +puppy.name);
//     		$("body").append("<br ?>" + '<img src="' + puppy.imageUrl+ '">');
//     	});
//     	console.log(data);
//     });
//   }
//   loadPuppies();

//   function puppyHtml(puppy) {
//     return '<div data-id="' + puppy._id + '"><p><a href="/puppies/' + puppy._id + '/">' + puppy.name + 
//            '</a></p><p><img src="' + puppy.imageUrl + '" alt="Dog Image" height=200 width=200></p>' +
//            '<p><a href="/puppies/' + puppy._id + '/edit">Edit a puppy</a></p></div>';
//   }


//   $('#newpuppylink').click(function(e) {
//     e.preventDefault();
//     var html = '<form id="newpuppyform" action="/puppies" method="POST">' +
//                '<div class="form-group">' + 
//                '<label for="name">Name: </label><input type="text" class="form-control" name="puppy[name]" id="name" autofocus>' +
//                '</div>' +
//                '<div class="form-group">' +
//                '<label for="url">Image URL: </label>' +
//                '<input type="text" class="form-control" name="puppy[imageUrl]" id="url">' +
//                '</div>' +
//                '<input type="submit" value="Add" class="btn btn-lg btn-success">' +
//                '</form>';

//     $('#logout').after(html);

//     $('#newpuppyform').submit(function(e) {
//       e.preventDefault();

//       var name = $('#name').val();
//       var url = $('#url').val();

//       var data = {puppy: {name: name, imageUrl: url}};

//       $.ajax({
//         type: 'POST',
//         url: '/puppies',
//         data: data,
//         dataType: 'json'
//       }).done(function(data) {
//         var html = puppyHtml(data);
//         $('body').append(html);
//         $('#newpuppyform').remove();

//       });
//     });
//   });


// });
