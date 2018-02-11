window.fbAsyncInit = function() {
  FB.init({
    appId: "1530275277041978",
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: "v2.8" // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
    console.log(response);
  });
};
// Load the SDK asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function isLogin() {
  FB.login(
    function(response) {
      if (response.authResponse) {
        console.log('islogin connect',response);
        localStorage.setItem("fbtoken", response.authResponse.accessToken);
        window.location.href = window.location.href
      }else{
        console.log(response,'belum connect');
      }
    },
    { scope: "public_profile,email" }
  );
}
function logout() {
  FB.logout(function() {
    localStorage.clear();
    window.history.back
    window.location = "index.html";
  });
}

function formadd() {
  $("#formadd").show();
  $("#iconadd").hide();
}

function add() {
  axios.post("http://localhost:3000/api/todo",{
      content : $('#inputTodo').val()
  },{
    headers:{
      token:localStorage.getItem('token')
    }
  }).then(data=>{
    data=data.data.data
    $("#tableTask").append(`
    <tr>
          <td> ${data.createdAt}</td>
          <td>
          <span uk-icon="icon: check" onclick="success('${data._id}','${data.ceklist}')"></span>
          </td>
          <td> ${data.content}</td>
          <td>
              <span uk-icon="icon: trash" onclick="destroy('${data._id}')"></span>
          </td>
      </tr>
    `)
  }).catch(err=>{
    console.log(err);
  })
  $("#formadd").hide();
  $("#iconadd").show();
}
function destroy(id) {
  axios.delete(`http://localhost:3000/api/todo/${id}`,{
    headers:{
      token:localStorage.getItem('token')
    }
  }).then(data=>{
    console.log(data);
    dataTodo()
  }).catch(err=>{
    console.log(err);
  })
}
function success(id,ceklist) {
    axios.put(`http://localhost:3000/api/todo/${id}`,{
      ceklist: ceklist==0?1:0
    },{
      headers:{
        token:localStorage.getItem('token')
      }
    }).then(data=>{
      dataTodo()
    })
    .catch(err=>console.log(err))
}
function terbang() {
  dataLogin(cb=>{
    dataTodo()
  })
}

function dataLogin(cb) {
  axios
    .get("http://localhost:3000/api/auth", {
      headers: {
        fbtoken: localStorage.getItem("fbtoken")
      }
    })
    .then(data => {
      $("#name").html(`${data.data.name}`);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("image_url", data.data.image_url);
      $("#foto").html(`<img alt="foto" src="${localStorage.getItem('image_url')}" class="rounded-circle"/>`)
      $("#formadd").hide();
      console.log(data);
      cb(data)
    })
    .catch(err => cb(err));
}
function dataTodo() {
  console.log('dataTodo');
  
      axios
        .get("http://localhost:3000/api/todo", {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(datatodo => {
          data = datatodo.data.data;
          $("#tableTask").html('')
          data.map(e => {
            $("#tableTask").append(`
          <tr>
          <td> ${e.createdAt}</td>
          <td>
          <span uk-icon="icon: check" onclick="success('${e._id}','${e.ceklist}')"></span>
          </td>
          <td> ${(e.ceklist==0)?e.content:`<strike>${e.content}</strike>` }</td>
          <td>
              <span uk-icon="icon: trash" onclick="destroy('${e._id}')"></span>
          </td>
      </tr>
          `);
          })
          console.log(data);
        })
        .catch(err => console.log(err));
 
}
